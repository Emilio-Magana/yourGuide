import { motion, useScroll, useTransform } from "framer-motion";

function OpacityShift() {
  const { scrollY } = useScroll();

  // Fade from opacity 1 → 0 as scrollY goes 0 → 300
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      className="fixed left-0 top-0 flex h-64 w-full items-center justify-center bg-green-500"
      style={{ opacity }}
    >
      <h1 className="text-3xl text-white">I fade as you scroll</h1>
    </motion.div>
  );
}

export default OpacityShift;
