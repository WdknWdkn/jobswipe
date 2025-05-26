import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect, type SVGProps } from 'react';
import { calculateScores } from '../utils/diagnostics';
import { categories } from '../data/categories';
import type { Answer, DiagnosisResult } from '../types';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts';

// Icons
const ShareIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98" />
    <path d="M15.41 6.51l-6.82 3.98" />
  </svg>
);

const RotateCcwIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 4v6h6" />
    <path d="M3.51 9a9 9 0 1 0 .49-2" />
  </svg>
);

const DownloadIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const TrophyIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M17 4v4a5 5 0 0 1-5 5 5 5 0 0 1-5-5V4" />
    <path d="M3 4h18" />
  </svg>
);

const BuildingIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 21V3h18v18" />
    <path d="M9 21V9h6v12" />
    <path d="M9 3v3h6V3" />
  </svg>
);

interface PersonalityDetail {
  description: string;
  traits: string[];
  color: string;
}

const personalityDetails: Record<string, PersonalityDetail> = {
  '報酬重視タイプ': {
    description: '高い給与や待遇を最優先するタイプです。',
    traits: ['成果志向', '競争的', '数字に強い'],
    color: 'bg-yellow-500',
  },
  '成長志向タイプ': {
    description: '成長やキャリアアップを重視します。',
    traits: ['学習意欲', '行動力', '向上心'],
    color: 'bg-blue-500',
  },
  'バランス重視タイプ': {
    description: '仕事と私生活の調和を大切にします。',
    traits: ['計画的', '協調性', '安定志向'],
    color: 'bg-emerald-500',
  },
  '社会貢献タイプ': {
    description: '社会への良い影響を重視します。',
    traits: ['理想主義', '責任感', 'チームワーク'],
    color: 'bg-green-500',
  },
  '安定志向タイプ': {
    description: '長期的な安定を求めます。',
    traits: ['堅実', '慎重', '計画的'],
    color: 'bg-gray-500',
  },
  '挑戦者タイプ': {
    description: '変化やチャレンジを好みます。',
    traits: ['積極的', 'リーダーシップ', '創造性'],
    color: 'bg-red-500',
  },
  'チームワーカータイプ': {
    description: '人との協力を大切にします。',
    traits: ['協調性', 'コミュニケーション', 'サポート役'],
    color: 'bg-purple-500',
  },
  '理念共感タイプ': {
    description: '企業理念への共感を重視します。',
    traits: ['価値観重視', '共感力', '忠誠心'],
    color: 'bg-indigo-500',
  },
  '場所重視タイプ': {
    description: '勤務地や働き方の柔軟性を求めます。',
    traits: ['自由度', '効率性', '自律性'],
    color: 'bg-teal-500',
  },
  '専門追求タイプ': {
    description: '専門知識やスキルの向上を目指します。',
    traits: ['探究心', '継続力', '職人気質'],
    color: 'bg-pink-500',
  },
};

export const Results = (): JSX.Element => {
  const location = useLocation();
  const answers: Answer[] = location.state?.answers ?? [];
  const result: DiagnosisResult = calculateScores(answers);

  const [activeTab, setActiveTab] = useState<'overview' | 'recommendations'>('overview');
  const [animatedData, setAnimatedData] = useState<typeof fullData>([]);

  const fullData = result.scores.map((s) => ({
    category: categories[s.category],
    value: s.percentage,
    fullMark: 100,
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(fullData);
    }, 500);
    return () => clearTimeout(timer);
  }, [answers]);

  const personality = personalityDetails[result.personalityType] ?? {
    description: '',
    traits: [],
    color: 'bg-gray-400',
  };

  const OverviewTab = (): JSX.Element => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold mb-4 ${personality.color}`}> 
            <span className="text-lg">🌟</span>
            <span>{result.personalityType}</span>
          </div>
          <p className="text-gray-600 leading-relaxed">{personality.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {personality.traits.map((trait) => (
            <span key={trait} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
              {trait}
            </span>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">あなたの就活軸バランス</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={animatedData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: '#6b7280' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} tickCount={6} />
              <Radar name="スコア" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">あなたが重視する軸 TOP3</h3>
        <div className="space-y-3">
          {fullData
            .slice()
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((item, index) => (
              <div key={item.category} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}`}>{index + 1}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{item.category}</span>
                    <span className="text-blue-600 font-semibold">{item.value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${item.value}%` }} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const RecommendationsTab = (): JSX.Element => (
    <div className="space-y-6">
      {result.recommendations.map((rec) => (
        <div key={rec.industry} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <BuildingIcon className="w-5 h-5 text-blue-500" />
            {rec.industry}
          </h3>
          {rec.pros && (
            <ul className="list-disc list-inside text-sm text-gray-700 mb-2">
              {rec.pros.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          )}
          {rec.cons && (
            <ul className="list-disc list-inside text-sm text-gray-500">
              {rec.cons.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">診断結果</h1>
          <div className="flex gap-2">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <DownloadIcon className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <RotateCcwIcon className="w-5 h-5 text-gray-600" />
            </Link>
          </div>
        </div>
      </div>
      <div className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="flex gap-1">
          <button onClick={() => setActiveTab('overview')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${activeTab === 'overview' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}> 
            <TrophyIcon className="w-4 h-4" />
            <span>総合結果</span>
          </button>
          <button onClick={() => setActiveTab('recommendations')} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-sm transition-all ${activeTab === 'recommendations' ? 'bg-blue-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}>
            <BuildingIcon className="w-4 h-4" />
            <span>おすすめ</span>
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'recommendations' && <RecommendationsTab />}
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-sm border-t border-gray-200">
        <div className="flex gap-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
            <ShareIcon className="w-5 h-5" />
            <span>結果を共有</span>
          </button>
          <Link to="/" className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors flex items-center gap-2">
            <span>もう一度</span>
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="h-24" />
    </div>
  );
};

export default Results;
