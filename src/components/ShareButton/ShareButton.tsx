interface Props {
  onShare: () => void;
}

export const ShareButton = ({ onShare }: Props): JSX.Element => (
  <button onClick={onShare} className="px-4 py-2 bg-blue-500 text-white rounded">
    結果を共有
  </button>
);
