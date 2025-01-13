import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PricingCard({ name, price, description, features, popular, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`relative p-8 rounded-xl ${
        popular ? 'bg-purple-900/20' : 'bg-gray-900'
      } border ${
        popular ? 'border-purple-500' : 'border-gray-800'
      } hover:border-purple-500/50 transition-all`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 text-sm rounded-bl-lg rounded-tr-xl">
          Popular
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">€{price}</span>
        <span className="text-gray-400">/mese</span>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center text-gray-300">
            <Check className="h-5 w-5 text-purple-500 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="w-full py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors">
        Inizia Ora
      </button>
    </motion.div>
  );
}