"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTest } from '../context/TestContext';
import { resultInterpretation, Dimension } from '../data/questions';

export default function ResultsPage() {
  const router = useRouter();
  const { answers, isCompleted, calculateResults, resetTest } = useTest();
  
  useEffect(() => {
    // 如果没有完成测试就直接访问结果页，重定向到测试页
    if (!isCompleted && answers.length < 90) {
      router.push('/test');
    }
  }, [isCompleted, answers.length, router]);

  const results = calculateResults();
  
  // 计算总分和阳性项目数
  const totalScore = Object.values(results).reduce((sum, score) => sum + score, 0);
  const positiveItems = answers.filter(a => a.score > 1).length;
  
  // 计算总均分(GSI)
  const gsi = (totalScore / 90).toFixed(2);
  
  // 计算阳性症状均分(PSDI)
  const psdi = positiveItems > 0 ? (totalScore / positiveItems).toFixed(2) : 0;
  
  // 计算阳性项目数(PST)
  const pst = positiveItems;

  const handleRetakeTest = () => {
    resetTest();
    router.push('/test');
  };

  // 根据分数判断程度
  const getDegree = (dimension: string, score: number) => {
    // 排除'其他'维度，因为resultInterpretation中没有这个键
    if (dimension === '其他') return '未分类';
    
    // 使用类型保护确保dimension是resultInterpretation的有效键
    const isValidDimension = (dim: string): dim is keyof typeof resultInterpretation => {
      return dim in resultInterpretation;
    };
    
    // 检查dimension是否为有效键
    if (!isValidDimension(dimension)) return '未知';
    
    const interpretation = resultInterpretation[dimension];
    
    if (score <= parseFloat(interpretation.normal.split('±')[0]) + 0.5) {
      return '正常';
    } else if (score <= parseFloat(interpretation.mild.split('-')[1])) {
      return '轻度';
    } else if (score <= parseFloat(interpretation.moderate.split('-')[1])) {
      return '中度';
    } else {
      return '重度';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">SCL-90 测试结果</h1>
      
      {isCompleted ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">总体指标</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">总均分(GSI)</p>
                <p className="text-2xl font-bold">{gsi}</p>
                <p className="text-xs text-gray-500">反映症状的广泛程度和严重程度</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">阳性症状均分(PSDI)</p>
                <p className="text-2xl font-bold">{psdi}</p>
                <p className="text-xs text-gray-500">反映症状的严重程度</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">阳性项目数(PST)</p>
                <p className="text-2xl font-bold">{pst}</p>
                <p className="text-xs text-gray-500">反映症状的广泛程度</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">各维度得分</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="py-2 px-4 text-left">维度</th>
                    <th className="py-2 px-4 text-left">得分</th>
                    <th className="py-2 px-4 text-left">程度</th>
                    <th className="py-2 px-4 text-left">正常参考值</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(results).map(([dimension, score]) => {
                    if (dimension === '其他') return null; // 不显示其他维度
                    
                    // 使用类型保护确保dimension是resultInterpretation的有效键
                    const isValidDimension = (dim: string): dim is keyof typeof resultInterpretation => {
                      return dim in resultInterpretation;
                    };
                    
                    if (!isValidDimension(dimension)) return null;
                    const interpretation = resultInterpretation[dimension];
                    if (!interpretation) return null;
                    
                    return (
                      <tr key={dimension} className="border-b">
                        <td className="py-2 px-4">{dimension}</td>
                        <td className="py-2 px-4">{score}</td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            getDegree(dimension, score as number) === '正常' ? 'bg-green-100 text-green-800' :
                            getDegree(dimension, score as number) === '轻度' ? 'bg-yellow-100 text-yellow-800' :
                            getDegree(dimension, score as number) === '中度' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {getDegree(dimension, score as number)}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-gray-500">{interpretation.normal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">维度解释</h2>
            <div className="space-y-4">
              {Object.entries(resultInterpretation).map(([dimension, info]) => {
                // 安全地断言维度类型
                const dim = dimension as keyof typeof resultInterpretation;
                if (dim === '其他' as Dimension) return null;
                return (
                  <div key={dimension} className="border-b pb-4">
                    <h3 className="font-medium text-lg mb-1">{dimension}</h3>
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-center mt-8">
            <button
              onClick={handleRetakeTest}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新测试
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl mb-4">您还没有完成测试</p>
          <button
            onClick={() => router.push('/test')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            去测试
          </button>
        </div>
      )}
    </div>
  );
}
