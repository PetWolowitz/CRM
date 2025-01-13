import React from 'react';
import { motion } from 'framer-motion';

export default function ServiceCard({ icon, name, description, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all group"
    >
      <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 text-purple-500 group-hover:bg-purple-500/20 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}