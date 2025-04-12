"use client";

import React from 'react';
import { Question, scoreOptions } from '../data/questions';
import { useTest } from '../context/TestContext';

type QuestionItemProps = {
  question: Question;
};

export default function QuestionItem({ question }: QuestionItemProps) {
  const { answers, addAnswer } = useTest();
  
  const currentAnswer = answers.find(a => a.questionId === question.id);
  const selectedScore = currentAnswer?.score || 0;

  const handleScoreChange = (score: number) => {
    addAnswer(question.id, score);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-start mb-3">
        <span className="text-lg font-medium mr-2">{question.id}.</span>
        <span className="text-lg">{question.text}</span>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {scoreOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleScoreChange(option.value)}
            className={`px-4 py-2 rounded-full border transition-colors ${selectedScore === option.value
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
