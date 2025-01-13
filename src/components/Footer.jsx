import React from 'react';
import { Github, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const socialLinks = [
  { icon: <Github className="h-6 w-6" />, href: "#", label: "GitHub" },
  { icon: <Twitter className="h-6 w-6" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" }
];

const contactInfo = [
  { icon: <Mail className="h-5 w-5" />, text: "hello@company.com" },
  { icon: <Phone className="h-5 w-5" />, text: "+1 (555) 123-4567" },
  { icon: <MapPin className="h-5 w-5" />, text: "San Francisco, CA" }
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
        </div>

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
      </div>
    </footer>
  );
}