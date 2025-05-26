import { useState, useMemo } from 'react';
import { AIContentType, AIGeneratedContent, AIAnalysisRequest } from '../types/ai';
import { AIService } from '../services/aiService';
import { useContentCache } from './useContentCache';
import { calculateScores } from '../utils/diagnostics';
import { Answer } from '../types';

export const useAIGeneration = (answers: Answer[] | null) => {
  const [aiContent, setAIContent] = useState<Record<AIContentType, AIGeneratedContent | null>>({
    detailed_analysis: null,
    smart_recommendations: null,
    company_criteria: null,
    career_roadmap: null,
  });

  const [isGeneratingAI, setIsGeneratingAI] = useState<Record<AIContentType, boolean>>({
    detailed_analysis: false,
    smart_recommendations: false,
    company_criteria: false,
    career_roadmap: false,
  });

  const [aiError, setAIError] = useState<string | null>(null);
  const aiService = useMemo(() => new AIService(), []);
  const cache = useContentCache();

  const result = answers ? calculateScores(answers) : null;

  const generate = async (type: AIContentType) => {
    if (!result) return;
    if (isGeneratingAI[type]) return;

    const cached = cache.get(type, result);
    if (cached) {
      setAIContent(prev => ({ ...prev, [type]: cached }));
      return;
    }

    setIsGeneratingAI(prev => ({ ...prev, [type]: true }));
    setAIError(null);

    try {
      const req: AIAnalysisRequest = {
        scores: result.scores,
        personalityType: result.personalityType,
        topCategories: result.topCategories,
        userAnswers: answers || [],
        contentTypes: [type],
      };
      const content = await aiService.generateContent(req, type);
      setAIContent(prev => ({ ...prev, [type]: content }));
      cache.set(type, result, content);
    } catch (err) {
      setAIError(err instanceof Error ? err.message : 'AI Error');
    } finally {
      setIsGeneratingAI(prev => ({ ...prev, [type]: false }));
    }
  };

  return { aiContent, isGeneratingAI, aiError, generate };
};
