import { useState, useEffect } from 'react';
import { SwipeCard } from '../components/SwipeCard/SwipeCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { questions } from '../data/questions';
import { Answer } from '../types';
import { categories } from '../data/categories';
import { useNavigate, Link } from 'react-router-dom';
import { DiagnosisContext } from '../context/DiagnosisContext';

export const Diagnosis = (): JSX.Element => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showHint, setShowHint] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSwipe = (dir: 'left' | 'right'): void => {
    const q = questions[current];
    setAnswers([
      ...answers,
      {
        questionId: q.id,
        value: dir === 'right' ? 'yes' : 'no',
        timestamp: Date.now(),
      },
    ]);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      navigate('/results', {
        state: {
          answers: [
            ...answers,
            { questionId: q.id, value: dir === 'right' ? 'yes' : 'no', timestamp: Date.now() },
          ],
        },
      });
    }
  };

  const question = questions[current];
  return (
    <DiagnosisContext.Provider value={{ answers, setAnswers }}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/instructions" className="p-2 rounded-full hover:bg-white/50 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div className="text-center">
              <div className="text-sm font-medium text-gray-900">
                質問 {current + 1}/{questions.length}
              </div>
              <div className="text-xs text-gray-500">{categories[question.category]}</div>
            </div>
            <div className="p-2 rounded-full">
              <span className="w-5 h-5 text-gray-600">🔄</span>
            </div>
          </div>
          <ProgressBar current={current + 1} total={questions.length} />
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <div className="relative max-w-sm w-full h-[60vh]">
            {questions
              .slice(current, current + 3)
              .map((q, i) => ({ q, idx: i }))
              .reverse()
              .map(({ q, idx }) => (
                <SwipeCard
                  key={q.id}
                  content={q.content}
                  onSwipe={handleSwipe}
                  index={idx}
                  categoryLabel={categories[q.category]}
                />
              ))}
            {showHint && (
              <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-center px-4 animate-pulse">
                <div className="flex items-center gap-2 text-red-400">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl">👎</div>
                  <span className="text-sm font-medium">NO</span>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="text-sm font-medium">YES</span>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">👍</div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 pb-8">
          <div className="flex justify-center gap-6 mb-6">
            <button
              onClick={() => handleSwipe('left')}
              className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              👎
            </button>
            <button
              onClick={() => handleSwipe('right')}
              className="w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
            >
              👍
            </button>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-blue-700">
              <span className="text-sm">💡</span>
              <span className="text-sm font-medium">ヒント</span>
            </div>
            <p className="text-xs text-blue-600">深く考えすぎず、直感で答えることが大切です</p>
          </div>
        </div>
      </div>
    </DiagnosisContext.Provider>
  );
};
