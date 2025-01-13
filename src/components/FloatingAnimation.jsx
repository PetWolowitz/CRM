import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingAnimation({
  children,
  delay = 0,
  duration = 3,
  yOffset = 15,
}) {
  return (
    <motion.div
      animate={{
        y: [-yOffset, yOffset],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}