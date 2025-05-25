import { Answer, DiagnosisResult, CategoryType } from '../types';
import { calculateCategoryScores } from './scoring';
import { recommendations } from '../data/recommendations';

const personalityMap: Record<CategoryType, string> = {
  salary: '報酬重視タイプ',
  growth: '成長志向タイプ',
  worklife: 'バランス重視タイプ',
  social: '社会貢献タイプ',
  stability: '安定志向タイプ',
  challenge: '挑戦者タイプ',
  relationship: 'チームワーカータイプ',
  culture: '理念共感タイプ',
  location: '場所重視タイプ',
  skill: '専門追求タイプ',
};

export const calculateScores = (answers: Answer[]): DiagnosisResult => {
  const scores = calculateCategoryScores(answers);
  const sorted = [...scores].sort((a, b) => b.percentage - a.percentage);
  const topCategories = sorted.slice(0, 3).map((s) => s.category);
  const personalityType = personalityMap[sorted[0].category];
  const recs = topCategories.flatMap((c) => recommendations[c]);
  return {
    scores,
    personalityType,
    topCategories,
    recommendations: recs,
  };
};
