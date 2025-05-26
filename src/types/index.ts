import { Recommendation } from '../data/recommendations';

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

export interface DiagnosisResult {
  scores: CategoryScore[];
  personalityType: string;
  topCategories: CategoryType[];
  recommendations: Recommendation[];
}

export interface ValueCriterion {
  category: CategoryType;
  categoryName: string;
  importance: 'high' | 'medium' | 'low';
  score: number;
  percentage: number;
  description: string;
  tradeoffs?: string[];
}

export interface EvaluationPrompt {
  valueCriteria: ValueCriterion[];
  prompt: string;
  generatedAt: Date;
  promptType: 'simple' | 'detailed';
}

export interface CategoryInfo {
  category: CategoryType;
  name: string;
  description: string;
  icon: string;
  keywords: string[];
  tradeoffPartners?: CategoryType[];
}
