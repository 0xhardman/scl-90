"use client";

import React from 'react';
import { useTest } from '../context/TestContext';

export default function ProgressBar() {
  const { currentPage, totalPages, answers } = useTest();
  const progress = Math.round((answers.length / 90) * 100);
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-blue-700">
          进度: {progress}%
        </span>
        <span className="text-sm font-medium text-blue-700">
          页面: {currentPage}/{totalPages}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}
