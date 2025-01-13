import React from 'react';
import { motion } from 'framer-motion';
import { NavLink } from './NavLink';

export function MobileMenu({ isOpen, links }) {
  if (!isOpen) return null;

  return (
    <motion.div 
      className="md:hidden mt-3 border-t border-gray-200 pt-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex flex-col space-y-1">
        {links.map(({ to, label, active }) => (
          <NavLink key={to} to={to} active={active}>
            {label}
          </NavLink>
        ))}
      </div>
    </motion.div>
  );
}