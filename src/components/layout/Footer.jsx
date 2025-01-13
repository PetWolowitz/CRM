import React from 'react';
import { motion } from 'framer-motion';
import { ContactInfo } from './footer/ContactInfo';
import { Newsletter } from './footer/Newsletter';
import { SocialLinks } from './footer/SocialLinks';
import { Copyright } from './footer/Copyright';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <Newsletter />
          <ContactInfo />
          <SocialLinks />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}