import { useState } from 'react';
import { EvaluationPrompt } from '../../types';

interface PromptDisplayProps {
  prompt: EvaluationPrompt;
  onReset: () => void;
}

export const PromptDisplay = ({ prompt, onReset }: PromptDisplayProps): JSX.Element => {
  const [text, setText] = useState(prompt.prompt);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'evaluation_prompt.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <textarea
        className="w-full h-64 p-3 border border-gray-300 rounded-lg text-sm"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ul className="text-xs text-gray-600 list-disc list-inside">
        {prompt.valueCriteria
          .filter((c) => c.importance !== 'low')
          .map((c) => (
            <li key={c.category}>
              {c.categoryName} - {c.importance === 'high' ? '最重要' : '重要'}
            </li>
          ))}
      </ul>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm"
        >
          {copied ? 'コピーしました' : 'コピー'}
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
        >
          ダウンロード
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm"
        >
          戻る
        </button>
      </div>
      <p className="text-xs text-gray-500">
        生成されたプロンプトをコピーして、ChatGPT などの AI に貼り付けてください。
      </p>
    </div>
  );
};
