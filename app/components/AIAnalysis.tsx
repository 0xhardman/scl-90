"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

type AIAnalysisProps = {
  results: Record<string, number>;
  gsi: string | number;
  psdi: string | number;
  pst: number;
};

export default function AIAnalysis({ results, gsi, psdi, pst }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showAnalysis, setShowAnalysis] = useState<boolean>(false);

  const fetchAnalysis = async () => {
    setLoading(true);
    setError('');
    setShowAnalysis(true);

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          results,
          scores: { 
            gsi: typeof gsi === 'number' ? gsi : parseFloat(gsi), 
            psdi: typeof psdi === 'number' ? psdi : parseFloat(psdi), 
            pst: typeof pst === 'number' ? pst : parseFloat(String(pst)) 
          }
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || '无法获取 AI 分析');
      }

      setAnalysis(data.analysis);
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
      <h2 className="text-xl font-semibold mb-4">AI 深度分析</h2>
      
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
              
              <div className="prose prose-sm max-w-none bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-gray-700">
                  <ReactMarkdown>
                    {analysis}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
