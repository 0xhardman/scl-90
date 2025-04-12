"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Question, Dimension, questions, dimensionQuestionCounts } from '../data/questions';

type Answer = {
  questionId: number;
  score: number;
};

type TestContextType = {
  answers: Answer[];
  currentPage: number;
  isCompleted: boolean;
  addAnswer: (questionId: number, score: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  resetTest: () => void;
  completeTest: () => void;
  calculateResults: () => Record<Dimension, number>;
  getQuestionsForPage: (page: number) => Question[];
  totalPages: number;
};

const TestContext = createContext<TestContextType | undefined>(undefined);

export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
};

type TestProviderProps = {
  children: ReactNode;
};

// 每页显示的问题数量
const QUESTIONS_PER_PAGE = 10;

export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const addAnswer = (questionId: number, score: number) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      if (existingAnswerIndex !== -1) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, score };
        return newAnswers;
      } else {
        return [...prev, { questionId, score }];
      }
    });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const resetTest = () => {
    setAnswers([]);
    setCurrentPage(1);
    setIsCompleted(false);
  };

  const completeTest = () => {
    setIsCompleted(true);
  };

  const getQuestionsForPage = (page: number) => {
    const startIndex = (page - 1) * QUESTIONS_PER_PAGE;
    const endIndex = startIndex + QUESTIONS_PER_PAGE;
    return questions.slice(startIndex, endIndex);
  };

  const calculateResults = () => {
    // 初始化各维度的总分
    const dimensionScores = {
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
    } as Record<Dimension, number>;

    // 各维度的题目数量
    const dimensionCounts = { ...dimensionQuestionCounts };

    // 计算各维度的总分
    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        dimensionScores[question.dimension] += answer.score - 1; // 转换为0-4分制
      }
    });

    // 计算各维度的均分
    Object.keys(dimensionScores).forEach(dimension => {
      const dim = dimension as Dimension;
      if (dimensionCounts[dim] > 0) {
        dimensionScores[dim] = parseFloat((dimensionScores[dim] / dimensionCounts[dim]).toFixed(2));
      }
    });

    return dimensionScores;
  };

  return (
    <TestContext.Provider
      value={{
        answers,
        currentPage,
        isCompleted,
        addAnswer,
        nextPage,
        prevPage,
        resetTest,
        completeTest,
        calculateResults,
        getQuestionsForPage,
        totalPages,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};
