import { Answer, CategoryScore, Question, CategoryType } from '../types';
import { questions } from '../data/questions';

export const calculateCategoryScores = (answers: Answer[]): CategoryScore[] => {
  const initial: Record<string, { score: number; total: number }> = {};

  questions.forEach((q) => {
    initial[q.category] = { score: 0, total: 0 };
  });

  answers.forEach((a) => {
    const q = questions.find((question) => question.id === a.questionId);
    if (q) {
      initial[q.category].total += q.weight;
      if (a.value === 'yes') initial[q.category].score += q.weight;
    }
  });

  const base = Object.entries(initial).reduce<Record<CategoryType, CategoryScore>>((acc, [category, { score, total }]) => {
    const pct = total ? Math.round((score / total) * 100) : 0;
    acc[category as CategoryType] = { category: category as CategoryType, score, percentage: pct };
    return acc;
  }, {} as Record<CategoryType, CategoryScore>);

  const tradeOffPairs: Array<[CategoryType, CategoryType]> = [
    ['salary', 'worklife'],
    ['challenge', 'stability'],
    ['growth', 'worklife'],
    ['social', 'salary'],
    ['skill', 'growth'],
  ];

  tradeOffPairs.forEach(([a, b]) => {
    const scoreA = base[a].percentage;
    const scoreB = base[b].percentage;
    if (scoreA > 50) {
      base[b].percentage = Math.max(0, base[b].percentage - (scoreA - 50));
    }
    if (scoreB > 50) {
      base[a].percentage = Math.max(0, base[a].percentage - (scoreB - 50));
    }
  });

  return Object.values(base);
};
