export type CategoryType =
  | 'salary'
  | 'growth'
  | 'worklife'
  | 'social'
  | 'stability'
  | 'challenge'
  | 'relationship'
  | 'culture'
  | 'location'
  | 'skill';

export interface Question {
  id: string;
  content: string;
  category: CategoryType;
  weight: number; // 1-3
}

export interface Answer {
  questionId: string;
  value: 'yes' | 'no';
  timestamp: number;
}

export interface CategoryScore {
  category: CategoryType;
  score: number;
  percentage: number;
}

export interface Recommendation {
  industry: string;
  pros: string[];
  cons: string[];
  requiredTradeoffs: string[];
}

export interface DiagnosisResult {
  scores: CategoryScore[];
  personalityType: string;
  topCategories: CategoryType[];
  recommendations: Recommendation[];
}
