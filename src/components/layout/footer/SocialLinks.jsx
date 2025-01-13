import React from 'react';
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: <Github className="h-6 w-6" />, href: "#", label: "GitHub" },
  { icon: <Twitter className="h-6 w-6" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" }
];

export function SocialLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
    >
      <h4 className="text-xl font-semibold text-white mb-6">Follow Us</h4>
      <div className="flex gap-4">
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}