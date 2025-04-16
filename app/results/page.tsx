"use client";

import React, { useEffect, useState, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTest } from '../context/TestContext';
import { resultInterpretation, Dimension, questions, scoreOptions } from '../data/questions';
import AIAnalysis from '../components/AIAnalysis';

// 定义答案类型
type Answer = {
  questionId: number;
  score: number;
};

// 定义结果类型
type Results = {
  [key: string]: number;
};

// 包含使用useSearchParams的实际内容组件
function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { answers: contextAnswers, isCompleted, calculateResults, resetTest } = useTest();

  // 状态管理
  const [answers, setAnswers] = useState<Answer[]>(contextAnswers);
  const [results, setResults] = useState<Results>({});
  const [isUrlMode, setIsUrlMode] = useState(false);

  // 使用useCallback包裹计算函数，避免依赖项问题
  const calculateResultsFromAnswers = useCallback((answersList: Answer[]): Results => {
    const dimensionScores: Results = {
      "躯体化": 0,
      "强迫症状": 0,
      "人际关系敏感": 0,
      "抑郁": 0,
      "焦虑": 0,
      "敌对": 0,
      "恐怖": 0,
      "偏执": 0,
      "精神病性": 0,
      "其他": 0,
    };

    answersList.forEach((answer: Answer) => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        dimensionScores[question.dimension] += answer.score - 1;
      }
    });

    return dimensionScores;
  }, []);

  useEffect(() => {
    // 检查URL参数是否包含测试数据
    const testDataParam = searchParams.get('scores');

    if (testDataParam) {
      try {
        // 解析URL参数中的测试数据
        const decodedData = decodeURIComponent(testDataParam);
        const scoreArray = JSON.parse(decodedData);

        // 验证数据格式
        if (Array.isArray(scoreArray) && scoreArray.length > 0) {
          // 将简单数组转换为答案对象数组
          const formattedAnswers: Answer[] = scoreArray.map((score, index) => ({
            questionId: index + 1, // 问题ID从1开始
            score: Number(score)   // 确保分数是数字
          }));

          setAnswers(formattedAnswers);
          setIsUrlMode(true);

          // 手动计算结果
          const calculatedResults = calculateResultsFromAnswers(formattedAnswers);
          setResults(calculatedResults);
        }
      } catch (error) {
        console.error('Failed to parse test data from URL:', error);
      }
    } else {
      // 检查旧格式的testData参数（向后兼容）
      const oldFormatParam = searchParams.get('testData');
      if (oldFormatParam) {
        try {
          const decodedData = decodeURIComponent(oldFormatParam);
          const parsedAnswers = JSON.parse(decodedData);

          if (Array.isArray(parsedAnswers) && parsedAnswers.length > 0) {
            setAnswers(parsedAnswers);
            setIsUrlMode(true);

            const calculatedResults = calculateResultsFromAnswers(parsedAnswers);
            setResults(calculatedResults);
          }
        } catch (error) {
          console.error('Failed to parse old format test data from URL:', error);
        }
      } else {
        // 使用上下文中的数据
        setResults(calculateResults());
      }
    }
  }, [searchParams, calculateResults, calculateResultsFromAnswers]);

  // 计算总分和阳性项目数
  const totalScore: number = Object.values(results).reduce((sum: number, score) => sum + (Number(score) || 0), 0);
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

      {isCompleted || isUrlMode ? (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">总体指标</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">总均分(GSI)</p>
                <p className="text-2xl font-bold">{gsi.toString()}</p>
                <p className="text-xs text-gray-500">反映症状的广泛程度和严重程度</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">阳性症状均分(PSDI)</p>
                <p className="text-2xl font-bold">{psdi.toString()}</p>
                <p className="text-xs text-gray-500">反映症状的严重程度</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">阳性项目数(PST)</p>
                <p className="text-2xl font-bold">{pst.toString()}</p>
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
                          <span className={`px-2 py-1 rounded-full text-xs ${getDegree(dimension, score as number) === '正常' ? 'bg-green-100 text-green-800' :
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

                // 获取该维度的得分
                const score = results[dimension as keyof typeof results] as number;

                // 确定程度
                const degree = getDegree(dimension, score);

                // 根据程度选择相应的解读
                let interpretationText = '';
                if (degree === '正常') {
                  interpretationText = info.normalInterpretation;
                } else if (degree === '轻度') {
                  interpretationText = info.mildInterpretation;
                } else if (degree === '中度') {
                  interpretationText = info.moderateInterpretation;
                } else if (degree === '重度') {
                  interpretationText = info.severeInterpretation;
                }

                // 根据程度设置不同的颜色
                const degreeColorClass =
                  degree === '正常' ? 'bg-green-50 border-green-200' :
                    degree === '轻度' ? 'bg-yellow-50 border-yellow-200' :
                      degree === '中度' ? 'bg-orange-50 border-orange-200' :
                        'bg-red-50 border-red-200';

                return (
                  <div key={dimension} className={`border-b pb-4 ${degreeColorClass} p-4 rounded-lg`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-lg">{dimension}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${degree === '正常' ? 'bg-green-100 text-green-800' :
                          degree === '轻度' ? 'bg-yellow-100 text-yellow-800' :
                            degree === '中度' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                        }`}>
                        {degree}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{info.description}</p>
                    <div className="mt-3">
                      <h4 className="font-medium text-sm mb-1">个人解读：</h4>
                      <p className="text-gray-700 text-sm italic">{interpretationText || info.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 问题与选择展示 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">问题与选择详情</h2>
            
            {/* 维度选择器 */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {Object.keys(results).map((dimension) => (
                  <button
                    key={dimension}
                    onClick={() => {
                      // 创建一个新的DOM元素，用于滚动到相应的维度部分
                      const element = document.getElementById(`dimension-${dimension}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="px-3 py-1 text-sm bg-blue-50 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    {dimension}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 按维度分组显示问题 */}
            <div className="space-y-6">
              {Object.keys(results).map((dimension) => {
                // 筛选出属于该维度的问题和答案
                const dimensionAnswers = answers.filter(answer => {
                  const question = questions.find(q => q.id === answer.questionId);
                  return question && question.dimension === dimension;
                });
                
                if (dimensionAnswers.length === 0) return null;
                
                return (
                  <div key={dimension} id={`dimension-${dimension}`} className="border rounded-lg overflow-hidden">
                    <div 
                      className={`p-3 font-medium ${
                        getDegree(dimension, results[dimension] as number) === '正常' ? 'bg-green-50' :
                        getDegree(dimension, results[dimension] as number) === '轻度' ? 'bg-yellow-50' :
                        getDegree(dimension, results[dimension] as number) === '中度' ? 'bg-orange-50' :
                        'bg-red-50'
                      }`}
                    >
                      {dimension} - {dimensionAnswers.length}个问题 
                      <span className="text-sm ml-2">
                        (得分: {results[dimension]}, 
                        {getDegree(dimension, results[dimension] as number)})
                      </span>
                    </div>
                    
                    <div className="divide-y">
                      {dimensionAnswers.map((answer) => {
                        const question = questions.find(q => q.id === answer.questionId);
                        const selectedOption = answer.score > 0 ? 
                          scoreOptions.find((option: { value: number; label: string }) => option.value === answer.score) : null;
                        
                        if (!question) return null;
                        
                        return (
                          <div key={question.id} className="p-3 hover:bg-gray-50">
                            <div className="flex justify-between items-start">
                              <p className="text-gray-800">
                                <span className="font-medium">问题 {question.id}:</span> {question.text}
                              </p>
                              <span className={`ml-2 px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                                answer.score === 1 ? 'bg-green-100 text-green-800' :
                                answer.score === 2 ? 'bg-blue-100 text-blue-800' :
                                answer.score === 3 ? 'bg-yellow-100 text-yellow-800' :
                                answer.score === 4 ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {selectedOption?.label || '未选择'} ({answer.score})
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI 分析组件 */}
          <AIAnalysis results={results} gsi={gsi} psdi={psdi} pst={pst} />

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handleRetakeTest}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新测试
            </button>


            <button
              onClick={() => {
                // 生成简化的分数数组
                const scoresArray = answers.map(a => a.score);
                const scoresJson = JSON.stringify(scoresArray);
                const encodedData = encodeURIComponent(scoresJson);
                const shareUrl = `${window.location.origin}/results?scores=${encodedData}`;

                // 复制到剪贴板
                navigator.clipboard.writeText(shareUrl)
                  .then(() => alert('结果链接已复制到剪贴板'))
                  .catch(err => console.error('复制失败:', err));
              }}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              复制结果链接
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

// 使用Suspense包裹的外层组件
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">SCL-90 测试结果</h1>
      <div className="text-center py-12">
        <p className="text-xl mb-4">正在加载结果...</p>
      </div>
    </div>}>
      <ResultsContent />
    </Suspense>
  );
}
