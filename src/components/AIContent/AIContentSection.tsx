import { useState } from 'react';
import { AIGeneratedContent } from '../../types/ai';

interface Props {
  title: string;
  icon: string;
  content: AIGeneratedContent | null;
  isLoading: boolean;
  onGenerate: () => void;
}

export const AIContentSection = ({ title, icon, content, isLoading, onGenerate }: Props) => {
  const [expanded, setExpanded] = useState(true);

  if (isLoading) {
    return (
      <div className="ai-content-section border border-gray-200 rounded-lg p-4 mb-4">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <div className="text-sm text-gray-500">AIが分析中...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="ai-content-section border border-gray-200 rounded-lg p-4 mb-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl mr-2">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <button onClick={onGenerate} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
          生成する
        </button>
      </div>
    );
  }

  return (
    <div className="ai-content-section border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setExpanded(!expanded)} className="flex items-center flex-1 text-left">
          <span className="text-2xl mr-2">{icon}</span>
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="ml-2 text-gray-500">{expanded ? '▼' : '▶'}</span>
        </button>
        <button onClick={onGenerate} className="px-2 py-1 text-sm text-gray-600 hover:text-blue-600" title="再生成">
          🔄
        </button>
      </div>
      {expanded && (
        <div className="prose prose-sm max-w-none">
          {content.sections.map((s, i) => (
            <div key={i} className="mb-3">
              {s.title && <h4 className="font-medium text-gray-800 mb-1">{s.title}</h4>}
              <div className={s.type === 'highlight' ? 'bg-blue-50 p-2 rounded' : ''}>{s.content}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
