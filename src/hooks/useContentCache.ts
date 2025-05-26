import { AIContentType, AIGeneratedContent, DiagnosisResult } from '../types/ai';

const KEY_PREFIX = 'aiContentCache';

export const useContentCache = () => {
  const buildKey = (type: AIContentType, result: DiagnosisResult) => {
    const raw = result.personalityType + JSON.stringify(result.scores.map((s) => s.percentage));
    // Encode using base64 safely even when raw contains multibyte characters
    const utf8 = encodeURIComponent(raw);
    return `${KEY_PREFIX}-${type}-${btoa(utf8)}`;
  };

  const get = (type: AIContentType, result: DiagnosisResult): AIGeneratedContent | null => {
    const key = buildKey(type, result);
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as AIGeneratedContent) : null;
  };

  const set = (type: AIContentType, result: DiagnosisResult, content: AIGeneratedContent) => {
    const key = buildKey(type, result);
    localStorage.setItem(key, JSON.stringify(content));
  };

  return { get, set };
};
