import { useState } from 'react';
import { DiagnosisResult, EvaluationPrompt } from '../../types';
import { generateEvaluationPrompt, generateSimplePrompt } from '../../utils/promptGenerator';
import { PromptDisplay } from '../PromptDisplay/PromptDisplay';

interface CompanyEvaluatorProps {
  result: DiagnosisResult;
}

export const CompanyEvaluator = ({ result }: CompanyEvaluatorProps): JSX.Element => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState<EvaluationPrompt | null>(null);
  const [promptType, setPromptType] = useState<'simple' | 'detailed'>('detailed');

  const handleGeneratePrompt = () => {
    const p = promptType === 'simple' ? generateSimplePrompt(result) : generateEvaluationPrompt(result);
    setGeneratedPrompt(p);
  };

  const handleReset = () => {
    setGeneratedPrompt(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-6 py-4 font-medium text-gray-900"
      >
        <span>企業評価プロンプト生成</span>
        <span className="text-sm">{isExpanded ? '▲' : '▼'}</span>
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4">
          {generatedPrompt ? (
            <PromptDisplay prompt={generatedPrompt} onReset={handleReset} />
          ) : (
            <>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    className="accent-blue-500"
                    value="detailed"
                    checked={promptType === 'detailed'}
                    onChange={() => setPromptType('detailed')}
                  />
                  詳細版
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    className="accent-blue-500"
                    value="simple"
                    checked={promptType === 'simple'}
                    onChange={() => setPromptType('simple')}
                  />
                  簡易版
                </label>
              </div>
              <button
                onClick={handleGeneratePrompt}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-2 px-4 rounded-lg shadow"
              >
                プロンプト生成
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
