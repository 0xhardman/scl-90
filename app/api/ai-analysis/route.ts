import { NextRequest, NextResponse } from 'next/server';

// 这里需要替换为您的 DeepSeek API 密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: NextRequest) {
  try {
    const { results, scores } = await request.json();

    // 如果没有提供 API 密钥，返回错误
    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'DeepSeek API 密钥未配置' },
        { status: 500 }
      );
    }

    // 构建发送给 DeepSeek 的提示
    const prompt = `
你是一位专业的心理健康顾问，正在分析一位用户的 SCL-90 心理健康自评量表结果。
请根据以下测试结果，提供专业、有同理心且有帮助的分析和建议。

测试结果数据：
总均分(GSI): ${scores.gsi}
阳性症状均分(PSDI): ${scores.psdi}
阳性项目数(PST): ${scores.pst}

各维度得分：
${Object.entries(results)
  .filter(([dimension]) => dimension !== '其他')
  .map(([dimension, score]) => `- ${dimension}: ${score}`)
  .join('\n')}

请提供以下内容：
1. 整体心理健康状况分析
2. 需要关注的主要维度及其可能的影响
3. 改善建议和自我调节方法
4. 是否需要进一步的专业帮助（如有必要）

注意：请使用专业但平易近人的语言，避免过度医学化的术语，同时保持敏感和支持性的语调。强调这只是初步分析，不构成医疗诊断。
`;

    // 调用 DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    // 如果 API 调用失败
    if (!response.ok) {
      console.error('DeepSeek API 错误:', data);
      return NextResponse.json(
        { error: '无法获取 AI 分析', details: data },
        { status: response.status }
      );
    }

    // 提取 AI 的回复
    const aiAnalysis = data.choices?.[0]?.message?.content || '无法生成分析';

    return NextResponse.json({ analysis: aiAnalysis });
  } catch (error: unknown) {
    console.error('AI 分析处理错误:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { error: '处理请求时出错', details: errorMessage },
      { status: 500 }
    );
  }
}
