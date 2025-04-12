"use client";

import React, { useState, useEffect } from 'react';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import styles from './mdx.module.css';

type AIAnalysisProps = {
  results: Record<string, number>;
  gsi: string | number;
  psdi: string | number;
  pst: number;
};

export default function AIAnalysis({ results, gsi, psdi, pst }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // 从本地存储加载 API key
  useEffect(() => {
    const savedApiKey = localStorage.getItem('deepseek_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError('');
    setShowAnalysis(true);

    // 检查是否有 API key
    if (!apiKey) {
      setError('请先设置 DeepSeek API 密钥');
      setLoading(false);
      setShowSettings(true);
      return;
    }

    try {
      // 构建发送给 DeepSeek 的提示 - 与原后端代码保持一致
      const scores = { 
        gsi: typeof gsi === 'number' ? gsi : parseFloat(String(gsi)), 
        psdi: typeof psdi === 'number' ? psdi : parseFloat(String(psdi)), 
        pst: typeof pst === 'number' ? pst : parseFloat(String(pst)) 
      };
      
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
      // 直接在前端调用 DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
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

      if (!response.ok) {
        throw new Error(data.error?.message || '无法获取 AI 分析');
      }

      // 提取 AI 的回复 - 与原后端代码保持一致
      const aiAnalysis = data.choices?.[0]?.message?.content || '无法生成分析';
      console.log('AI 分析结果:', aiAnalysis);
      setAnalysis(aiAnalysis);
      const mdxSource = await serialize(aiAnalysis);
      setMdxSource(mdxSource);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '获取 AI 分析时出错';
      setError(errorMessage);
      console.error('AI 分析错误:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">AI 深度分析</h2>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          设置
        </button>
      </div>
      
      {showSettings && (
        <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-md font-medium mb-2">API 设置</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem('deepseek_api_key', e.target.value);
              }}
              placeholder="输入您的 DeepSeek API 密钥"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md mr-2 text-sm"
            />
            <a
              href="https://platform.deepseek.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm"
            >
              获取密钥
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-1">您的 API 密钥仅存储在您的浏览器中，不会发送到我们的服务器。</p>
        </div>
      )}
      
      {!showAnalysis ? (
        <div className="text-center py-4">
          <p className="text-gray-600 mb-4">
            获取由 DeepSeek AI 提供的专业心理健康分析和建议。
            <br />
            <span className="text-sm text-gray-500">注意：AI 分析仅供参考，不构成医疗诊断。</span>
          </p>
          <button
            onClick={fetchAnalysis}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            disabled={loading}
          >
            {loading ? '正在分析...' : '获取 AI 分析'}
          </button>
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p>AI 正在分析您的测试结果，请稍候...</p>
            </div>
          ) : error ? (
            <div className="text-center py-4">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchAnalysis}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                重试
              </button>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(analysis)
                      .then(() => alert('分析建议已复制到剪贴板'))
                      .catch(err => console.error('复制失败:', err));
                  }}
                  className="text-sm px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  复制分析建议
                </button>
              </div>
              
              <div className="max-w-none bg-white p-4 rounded-lg border border-gray-200">
                <div className={styles.mdxContent}>
                  {mdxSource ? (
                    <MDXRemote {...mdxSource} />
                  ) : (
                    <p>加载中...</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
