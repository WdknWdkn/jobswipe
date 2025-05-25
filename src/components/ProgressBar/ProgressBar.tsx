interface Props {
  current: number;
  total: number;
}

export const ProgressBar = ({ current, total }: Props): JSX.Element => {
  const percentage = Math.round((current / total) * 100);
  return (
    <div className="w-full bg-gray-200 h-2 rounded">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
