import { Link } from 'react-router-dom';
import type { SVGProps } from 'react';

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

const UsersIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ClockIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <polyline points="12 7 12 12 15 15" />
  </svg>
);

const TargetIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const SparklesIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2l1.09 3.26L16 6l-2.91 1.74L12 11l-1.09-3.26L8 6l2.91-0.74L12 2z" />
    <path d="M5 13l.55 1.64L7 16l-1.45.36L5 18l-.55-1.64L3 16l1.45-.36L5 13z" />
    <path d="M19 13l.55 1.64L21 16l-1.45.36L19 18l-.55-1.64L17 16l1.45-.36L19 13z" />
  </svg>
);

export const Landing = (): JSX.Element => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Job<span className="text-blue-600">Swipe</span>
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <SparklesIcon className="w-4 h-4 text-yellow-500" />
            <span>AIが分析する就活軸診断</span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            スワイプで見つける
            <br />
            あなたの理想の働き方
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tinderライクな直感的操作で、
            <br />
            本当に大切にしたい就活軸を発見
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <ClockIcon className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">3分</div>
            <div className="text-xs text-gray-600">で完了</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <TargetIcon className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">10軸</div>
            <div className="text-xs text-gray-600">を診断</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
            <UsersIcon className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">1万人</div>
            <div className="text-xs text-gray-600">が利用</div>
          </div>
        </div>

        <Link
          to="/instructions"
          className="group w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center gap-2">
            <span>無料で診断を始める</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <span>✓ ログイン不要</span>
          <span>✓ 個人情報なし</span>
          <span>✓ 完全無料</span>
        </div>
      </div>
    </div>

    <div className="text-center py-4 text-xs text-gray-400">
      Powered by AI • Made with ❤️ for job seekers
    </div>
  </div>
);

export default Landing;
