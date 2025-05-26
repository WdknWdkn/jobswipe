import { motion, useAnimation } from 'framer-motion';

interface Props {
  content: string;
  onSwipe: (direction: 'left' | 'right') => void;
}

export const SwipeCard = ({ content, onSwipe }: Props): JSX.Element => {
  const controls = useAnimation();

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }): void => {
    const { x } = info.offset;
    if (x > 100) {
      void controls.start({ x: 300, opacity: 0 }).then(() => {
        onSwipe('right');
        controls.set({ x: 0, opacity: 1 });
      });
    } else if (x < -100) {
      void controls.start({ x: -300, opacity: 0 }).then(() => {
        onSwipe('left');
        controls.set({ x: 0, opacity: 1 });
      });
    } else {
      void controls.start({ x: 0 });
    }
  };

  return (
    <motion.div
      drag="x"
      onDragEnd={handleDragEnd}
      animate={controls}
      className="bg-white p-4 rounded shadow-md touch-pan-y select-none"
    >
      {content}
    </motion.div>
  );
};
