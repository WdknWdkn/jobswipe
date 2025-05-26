import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface Props {
  content: string;
  onSwipe: (direction: 'left' | 'right') => void;
  /**
   * 表示順位。0が最前面となる。
   */
  index?: number;
}

export const SwipeCard = ({ content, onSwipe, index = 0 }: Props): JSX.Element => {
  const controls = useAnimation();
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ): void => {
    const { x: offsetX } = info.offset;
    if (offsetX > 100) {
      void controls.start({ x: 500, opacity: 0 }).then(() => {
        onSwipe('right');
        controls.set({ x: 0, opacity: 1 });
      });
    } else if (offsetX < -100) {
      void controls.start({ x: -500, opacity: 0 }).then(() => {
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
      style={{ x, rotate, zIndex: 100 - index, scale: 1 - index * 0.05, top: index * 8 }}
      className="absolute w-full h-full bg-white rounded-xl shadow-xl flex items-center justify-center select-none touch-pan-y"
    >
      <motion.div
        className="absolute top-5 left-5 text-green-500 font-bold text-3xl"
        style={{ opacity: likeOpacity }}
      >
        YES
      </motion.div>
      <motion.div
        className="absolute top-5 right-5 text-red-500 font-bold text-3xl"
        style={{ opacity: nopeOpacity }}
      >
        NO
      </motion.div>
      <div className="px-8 text-center text-lg">{content}</div>
    </motion.div>
  );
};
