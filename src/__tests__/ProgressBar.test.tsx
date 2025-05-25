import { render } from '@testing-library/react';
import { ProgressBar } from '../components/ProgressBar/ProgressBar';

test('renders progress bar', () => {
  const { container } = render(<ProgressBar current={1} total={2} />);
  expect(container.firstChild).toBeInTheDocument();
});
