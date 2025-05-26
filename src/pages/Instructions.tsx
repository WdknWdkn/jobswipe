import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { SVGProps } from 'react';

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 12H5" />
    <path d="M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRightIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const ChevronRightIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const PlayIcon = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

export const Instructions = (): JSX.Element => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      title: '質問が表示されます',
      description: 'あなたの価値観に関する質問が1つずつ表示されます',
    },
    {
      title: '直感でスワイプ',
      description: '同意するなら右に、そうでなければ左にスワイプ',
    },
    {
      title: '結果を確認',
      description: 'あなたの就活軸とパーソナリティタイプが分かります',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const SwipeDemo = (): JSX.Element => (
    <div className="relative w-full max-w-xs h-40 mx-auto mb-4">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg transform transition-all duration-500 ${
          isAnimating ? 'scale-95 opacity-80' : 'scale-100'
        }`}
      >
        <div className="p-6 text-white text-center h-full flex items-center justify-center">
          <p className="font-medium">サンプル質問</p>
        </div>
      </div>
      <div className="absolute -bottom-8 left-0 right-0 flex justify-between items-center px-4">
        <div className="flex items-center gap-2 text-red-500">
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="text-sm font-medium">NO</span>
        </div>
        <div className="flex items-center gap-2 text-green-500">
          <span className="text-sm font-medium">YES</span>
          <ArrowRightIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      <div className="px-6 py-4 flex items-center">
        <Link to="/" className="p-2 rounded-full hover:bg-white/50 transition-colors">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="flex-1 text-center text-lg font-semibold text-gray-900">診断のやり方</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-sm mx-auto text-center">
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'w-8 bg-blue-500' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="mb-6">
            <SwipeDemo />
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">{steps[currentStep].title}</h2>
            <p className="text-gray-600 text-sm leading-relaxed">{steps[currentStep].description}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-sm">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">30</span>
                </div>
                <span className="text-sm text-gray-700">約30問の質問</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <PlayIcon className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">直感的な操作</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">10</span>
                </div>
                <span className="text-sm text-gray-700">就活軸を分析</span>
              </div>
            </div>
          </div>

          <Link
            to="/diagnosis"
            className="group block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center gap-2">
              <span>診断スタート</span>
              <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="mt-4 text-xs text-gray-500">前の質問に戻ることも可能です</div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
