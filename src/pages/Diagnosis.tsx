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
        <div className="mt-4 relative h-80">
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
      </Layout>
    </DiagnosisContext.Provider>
  );
};
