import { Code, Smartphone, Cloud, Database, Lock, Globe } from 'lucide-react';

export const services = [
  {
    icon: Code,
    name: 'Sviluppo Web',
    description: 'Siti web moderni e applicazioni web progressive'
  },
  {
    icon: Smartphone,
    name: 'App Mobile',
    description: 'Applicazioni native per iOS e Android'
  },
  {
    icon: Cloud,
    name: 'Cloud Solutions',
    description: 'Infrastrutture cloud scalabili e sicure'
  },
  {
    icon: Database,
    name: 'Database Management',
    description: 'Gestione e ottimizzazione database'
  },
  {
    icon: Lock,
    name: 'Cyber Security',
    description: 'Protezione e sicurezza dei dati'
  },
  {
    icon: Globe,
    name: 'SEO & Marketing',
    description: 'Ottimizzazione per i motori di ricerca'
  }
];

export const plans = [
  {
    name: 'Startup',
    price: '499',
    description: 'Perfetto per piccole imprese e startup',
    features: [
      'Sito Web Responsive',
      'Hosting Cloud',
      'SSL Gratuito',
      'Supporto Email',
      '3 Revisioni Gratuite'
    ]
  },
  {
    name: 'Business',
    price: '999',
    description: 'Ideale per aziende in crescita',
    features: [
      'Tutto del piano Startup',
      'E-commerce Integration',
      'CMS Personalizzato',
      'Supporto Premium 24/7',
      'SEO Optimization'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '2499',
    description: 'Soluzioni complete per grandi aziende',
    features: [
      'Tutto del piano Business',
      'App Mobile Native',
      'API Personalizzate',
      'Consulenza Dedicata',
      'Scalabilità Illimitata'
    ]
  }
];