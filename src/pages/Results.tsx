import { useLocation, Link } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { ResultChart } from '../components/ResultChart/ResultChart';
import { ShareButton } from '../components/ShareButton/ShareButton';
import { calculateScores } from '../utils/diagnostics';
import { Answer, DiagnosisResult } from '../types';

export const Results = (): JSX.Element => {
  const location = useLocation();
  const answers: Answer[] = location.state?.answers ?? [];
  const result: DiagnosisResult = calculateScores(answers);

  const handleShare = (): void => {
    if (navigator.share) {
      navigator.share({
        title: 'JobSwipe 結果',
        text: `あなたのタイプ: ${result.personalityType}`,
      });
    }
  };

  return (
    <Layout>
      <h2 className="text-xl font-bold mb-4">診断結果</h2>
      <ResultChart scores={result.scores} />
      <p className="mt-4">あなたは「{result.personalityType}」です。</p>
      <ShareButton onShare={handleShare} />
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">
          戻る
        </Link>
      </div>
    </Layout>
  );
};
