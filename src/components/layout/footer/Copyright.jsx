import React from 'react';
import { motion } from 'framer-motion';

export function Copyright() {
  return (
    <motion.div 
      className="mt-16 pt-8 border-t border-gray-800"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6 }}
    >
      <p className="text-center text-gray-400">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </motion.div>
  );
}