import React from 'react';
import { motion } from 'framer-motion';

export function Newsletter() {
  return (
    <motion.div 
      className="col-span-1 lg:col-span-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">Stay Connected</h3>
      <p className="text-gray-400 mb-6 text-lg">
        Join our newsletter to stay up to date with the latest innovations and updates.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-gray-700 text-white focus:outline-none focus:border-purple-500"
        />
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
          Subscribe
        </button>
      </form>
    </motion.div>
  );
}