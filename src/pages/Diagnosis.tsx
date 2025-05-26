import { useState } from 'react';
import { SwipeCard } from '../components/SwipeCard/SwipeCard';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';
import { questions } from '../data/questions';
import { Answer } from '../types';
import { Layout } from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { DiagnosisContext } from '../context/DiagnosisContext';

export const Diagnosis = (): JSX.Element => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

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

  return (
    <DiagnosisContext.Provider value={{ answers, setAnswers }}>
      <Layout>
        <ProgressBar current={current} total={questions.length} />
        <div className="mt-8 relative h-[70vh] max-h-[500px] w-[90%] max-w-md mx-auto">
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
              />
            ))}
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          左右にスワイプして回答してください
        </div>
      </Layout>
    </DiagnosisContext.Provider>
  );
};
