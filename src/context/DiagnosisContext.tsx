import { createContext, useContext } from 'react';
import { Answer } from '../types';

interface DiagnosisContextProps {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const DiagnosisContext = createContext<DiagnosisContextProps | null>(null);

export const useDiagnosis = (): DiagnosisContextProps => {
  const ctx = useContext(DiagnosisContext);
  if (!ctx) throw new Error('DiagnosisContext not provided');
  return ctx;
};
