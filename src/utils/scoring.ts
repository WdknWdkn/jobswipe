import { Answer, CategoryScore, CategoryType } from '../types';
import { questions } from '../data/questions';

// トレードオフ関係を定義
const tradeoffPairs: Record<CategoryType, CategoryType[]> = {
  salary: ['worklife', 'social'],
  growth: ['stability', 'worklife'],
  worklife: ['salary', 'growth', 'challenge'],
  social: ['salary', 'stability'],
  stability: ['growth', 'challenge'],
  challenge: ['stability', 'worklife', 'relationship'],
  relationship: ['challenge', 'skill'],
  culture: ['salary', 'location'],
  location: ['growth', 'culture'],
  skill: ['relationship', 'growth'],
};

// トレードオフ係数（相反する価値を選んだ場合の調整値）
const tradeoffCoefficient = 0.15; // 15%の調整

export const calculateCategoryScores = (answers: Answer[]): CategoryScore[] => {
  const categoryTotals: Record<CategoryType, number> = {} as Record<CategoryType, number>;
  const categoryYesScores: Record<CategoryType, number> = {} as Record<CategoryType, number>;
  const categoryTradeoffPenalty: Record<CategoryType, number> = {} as Record<CategoryType, number>;

  // 初期化
  Object.keys(tradeoffPairs).forEach(category => {
    categoryTotals[category as CategoryType] = 0;
    categoryYesScores[category as CategoryType] = 0;
    categoryTradeoffPenalty[category as CategoryType] = 0;
  });

  // 基本スコア計算
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;

    const { category, weight } = question;
    categoryTotals[category] += weight;

    if (answer.value === 'yes') {
      categoryYesScores[category] += weight;
      
      // トレードオフペナルティ計算
      const tradeoffCategories = tradeoffPairs[category] || [];
      tradeoffCategories.forEach(tradeoffCategory => {
        categoryTradeoffPenalty[tradeoffCategory] += weight * tradeoffCoefficient;
      });
    }
  });

  // 最終スコア計算（ペナルティ適用）
  return Object.entries(categoryTotals).map(([category, total]) => {
    const yesScore = categoryYesScores[category as CategoryType];
    const penalty = categoryTradeoffPenalty[category as CategoryType];
    
    if (total === 0) {
      return {
        category: category as CategoryType,
        score: 0,
        percentage: 0,
      };
    }

    // 基本パーセンテージからペナルティを引く
    const basePercentage = (yesScore / total) * 100;
    const adjustedPercentage = Math.max(0, basePercentage - penalty);

    return {
      category: category as CategoryType,
      score: yesScore,
      percentage: Math.round(adjustedPercentage),
    };
  });
};

// トレードオフ分析結果を含む詳細情報
export interface TradeoffAnalysis {
  primaryValue: CategoryType;
  conflictingValues: CategoryType[];
  tradeoffScore: number; // トレードオフの強さ（0-100）
  balanceType: 'extreme' | 'moderate' | 'balanced';
}

export const analyzeTradeoffs = (scores: CategoryScore[]): TradeoffAnalysis => {
  const sortedScores = [...scores].sort((a, b) => b.percentage - a.percentage);
  const primaryValue = sortedScores[0].category;
  
  // 上位3つのカテゴリのスコア分散を計算
  const top3Scores = sortedScores.slice(0, 3).map(s => s.percentage);
  const scoreVariance = Math.max(...top3Scores) - Math.min(...top3Scores);
  
  const conflictingValues = tradeoffPairs[primaryValue] || [];
  const conflictScores = scores
    .filter(s => conflictingValues.includes(s.category))
    .map(s => s.percentage);
  
  const tradeoffScore = conflictScores.length > 0 
    ? Math.round(conflictScores.reduce((sum, score) => sum + score, 0) / conflictScores.length)
    : 0;

  let balanceType: 'extreme' | 'moderate' | 'balanced';
  if (scoreVariance > 40) {
    balanceType = 'extreme';
  } else if (scoreVariance > 20) {
    balanceType = 'moderate';
  } else {
    balanceType = 'balanced';
  }

  return {
    primaryValue,
    conflictingValues,
    tradeoffScore,
    balanceType,
  };
};
