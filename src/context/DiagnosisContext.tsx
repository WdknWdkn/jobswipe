import { createContext, useContext } from 'react';
import { Answer } from '../types';
import { AIGeneratedContent, AIContentType } from "../types/ai";

interface DiagnosisContextProps {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
  userName: string;
  userEmail: string;
  setUserInfo: (name: string, email: string) => void;
  aiContent: Record<AIContentType, AIGeneratedContent | null>;
  isGeneratingAI: Record<AIContentType, boolean>;
  aiError: string | null;
  generateAIContent: (type: AIContentType) => Promise<void>;
  regenerateAIContent: (type: AIContentType) => Promise<void>;
  clearAIError: () => void;
}

export const DiagnosisContext = createContext<DiagnosisContextProps | null>(null);

export const useDiagnosis = (): DiagnosisContextProps => {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error('DiagnosisContext not provided');
  return ctx;
};
