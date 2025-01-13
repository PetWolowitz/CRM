import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactInfo = [
  { icon: <Mail className="h-5 w-5" />, text: "hello@company.com" },
  { icon: <Phone className="h-5 w-5" />, text: "+1 (555) 123-4567" },
  { icon: <MapPin className="h-5 w-5" />, text: "San Francisco, CA" }
];

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
    >
      <h4 className="text-xl font-semibold text-white mb-6">Contact</h4>
      <ul className="space-y-4">
        {contactInfo.map((item, index) => (
          <li key={index} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}