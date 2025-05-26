interface Props {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: Props): JSX.Element => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
    </div>
  );
};
