import { CategoryScore, Answer } from './index';

export type AIContentType =
  | 'detailed_analysis'
  | 'smart_recommendations'
  | 'company_criteria'
  | 'career_roadmap';

export interface ContentSection {
  title: string;
  content: string;
  type: 'text' | 'list' | 'highlight';
  priority: number;
}

export interface AIGeneratedContent {
  id: string;
  type: AIContentType;
  content: string;
  metadata: {
    confidence: number;
    generatedAt: number;
    tokensUsed: number;
    model: string;
  };
  sections: ContentSection[];
}

export interface AIAnalysisRequest {
  scores: CategoryScore[];
  personalityType: string;
  topCategories: string[];
  userAnswers: Answer[];
  contentTypes: AIContentType[];
}
