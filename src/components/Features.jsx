import React from 'react';
import { Zap, Shield, Rocket, Globe } from 'lucide-react';
import Card3DPin from './Card3DPin';
import { motion } from 'framer-motion';

const features = [
  {
    icon: <Zap className="h-6 w-6 text-purple-500" />,
    title: 'Velocità Fulminea',
    description: 'Performance ottimizzate che mantengono le tue applicazioni al massimo dell\'efficienza.'
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-500" />,
    title: 'Sicurezza Integrata',
    description: 'Funzionalità di sicurezza integrate per proteggere i tuoi dati e utenti.'
  },
  {
    icon: <Rocket className="h-6 w-6 text-purple-500" />,
    title: 'Scalabilità Semplice',
    description: 'Fai crescere la tua piattaforma senza preoccuparti dell\'infrastruttura.'
  },
  {
    icon: <Globe className="h-6 w-6 text-purple-500" />,
    title: 'Portata Globale',
    description: 'Distribuisci in tutto il mondo con la nostra architettura di rete distribuita.'
  }
];

export default function Features() {
  return (
    <div id="features" className="py-12 sm:py-16 md:py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 sm:mb-12">
            Funzionalità Innovative per lo Sviluppo Moderno
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card3DPin
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}