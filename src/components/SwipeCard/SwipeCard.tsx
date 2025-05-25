import { useState } from 'react';
import { useGesture } from '@use-gesture/react';
import { animated, useSpring } from '@react-spring/web';

interface Props {
  content: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeCard = ({ content, onSwipe }: Props): JSX.Element => {
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const bind = useGesture({
    onDragEnd: ({ offset: [ox] }) => {
      if (ox > 100) onSwipe('right');
      else if (ox < -100) onSwipe('left');
      api.start({ x: 0 });
    },
    onDrag: ({ offset: [ox] }) => api.start({ x: ox }),
  });

  return (
    <animated.div
      {...bind()}
      className="bg-white p-4 rounded shadow-md touch-pan-y select-none"
      style={{ x }}
    >
      {content}
    </animated.div>
  );
};
