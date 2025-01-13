import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import { NavLink } from './NavLink';
import { NavbarContainer } from './NavbarContainer';

export function Navbar({ logo = <Rocket className="h-4 w-4 text-purple-600" />, title = "FuturoTech", links }) {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = links.map(link => ({
    ...link,
    active: location.pathname === link.to
  }));

  return (
    <NavbarContainer hidden={hidden}>
      <div className="flex items-center gap-4">
        <motion.div 
          className="flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-1.5">
            {logo}
            <span className="text-sm font-bold text-gray-900">
              {title}
            </span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-1">
          {navLinks.map(({ to, label, active }) => (
            <NavLink key={to} to={to} active={active}>
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </NavbarContainer>
  );
}