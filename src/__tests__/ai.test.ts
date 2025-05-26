import { renderHook, act } from '@testing-library/react';
import { useAIGeneration } from '../hooks/useAIGeneration';

const answers = [];

test('useAIGeneration initializes', () => {
  const { result } = renderHook(() => useAIGeneration(answers));
  expect(result.current.aiContent.detailed_analysis).toBeNull();
});
