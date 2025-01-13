import React from 'react';
import { motion } from 'framer-motion';

export function NavbarContainer({ children, hidden }) {
  return (
    <motion.nav
      variants={{
        visible: { x: 0 },
        hidden: { x: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-4 left-4 z-50"
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg px-4 py-2">
        {children}
      </div>
    </motion.nav>
  );
}