import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureBlock({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -10 }}
      className="relative group"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
      <div className="relative bg-gray-900 rounded-lg p-8">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 mb-6 group-hover:bg-purple-500/20 transition-colors">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}