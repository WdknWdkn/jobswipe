import { Answer, CategoryScore, Question } from '../types';
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

  return Object.entries(initial).map(([category, { score, total }]) => ({
    category: category as Question['category'],
    score,
    percentage: total ? Math.round((score / total) * 100) : 0,
  }));
};
