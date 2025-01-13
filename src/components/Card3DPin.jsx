import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function Card3DPin({ icon, title, description }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  const brightness = useTransform(mouseYSpring, [-0.5, 0.5], [1.2, 0.8]);
  const scale = useSpring(1, { stiffness: 150, damping: 15 });

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
    scale.set(1.05);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        filter: `brightness(${brightness.get()})`,
      }}
      className="relative will-change-transform group"
    >
      <div className="absolute -inset-0.5 bg-purple-500/50 rounded-xl blur-lg opacity-25 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 group-hover:border-purple-500/50 transition-all duration-300">
        <motion.div
          style={{ transform: "translateZ(50px)" }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20"
        >
          {icon}
        </motion.div>
        <motion.h3 
          style={{ transform: "translateZ(30px)" }}
          className="text-base sm:text-lg font-semibold text-white mb-2 line-clamp-1"
        >
          {title}
        </motion.h3>
        <motion.p 
          style={{ transform: "translateZ(20px)" }}
          className="text-xs sm:text-sm text-gray-400 line-clamp-3"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}