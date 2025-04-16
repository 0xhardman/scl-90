"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import QuestionItem from '../components/QuestionItem';
import ProgressBar from '../components/ProgressBar';
import { useTest } from '../context/TestContext';

export default function TestPage() {
  const router = useRouter();
  const { 
    currentPage, 
    totalPages, 
    answers, 
    nextPage, 
    prevPage, 
    getQuestionsForPage,
    completeTest
  } = useTest();

  const questions = getQuestionsForPage(currentPage);
  const currentPageAnswered = questions.every(q => answers.some(a => a.questionId === q.id));
  const allQuestionsAnswered = answers.length === 90;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      nextPage();
    } else if (allQuestionsAnswered) {
      completeTest();
      // 直接使用原始的答案数据传递到结果页面
      // 创建URL参数，将答案数据编码并传递
      const scoresArray = answers.map(a => a.score);
      const encodedScores = encodeURIComponent(JSON.stringify(scoresArray));
      
      // 跳转到结果页面并携带数据
      router.push(`/results?scores=${encodedScores}`);
    }
  };

  const handlePrevPage = () => {
    prevPage();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6 text-center">SCL-90 心理健康自评量表</h1>
      <p className="mb-6 text-gray-600 text-center">
        请根据您最近一周（包括今天）的实际感受，选择最符合您情况的选项。
      </p>
      
      <ProgressBar />
      
      <div className="mb-8">
        {questions.map(question => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      
      <div className="flex justify-between">
        {currentPage > 1 && (
          <button
            onClick={handlePrevPage}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            上一页
          </button>
        )}
        
        {currentPage < totalPages ? (
          <button
            onClick={handleNextPage}
            disabled={!currentPageAnswered}
            className={`ml-auto px-6 py-2 rounded-lg transition-colors ${
              currentPageAnswered
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-blue-300 text-white cursor-not-allowed'
            }`}
          >
            下一页
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            disabled={!allQuestionsAnswered}
            className={`ml-auto px-6 py-2 rounded-lg transition-colors ${
              allQuestionsAnswered
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-green-300 text-white cursor-not-allowed'
            }`}
          >
            查看结果
          </button>
        )}
      </div>
    </div>
  );
}
