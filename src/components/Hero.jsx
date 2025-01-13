import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Innovare. Creare. Trasformare.
          </span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
          Sperimenta il futuro dell'innovazione digitale con le nostre soluzioni all'avanguardia progettate per trasformare le tue idee in realtà.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/services"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-purple-600 text-white rounded-full font-semibold hover:bg-purple-700 transition-all flex items-center justify-center gap-2 group"
          >
            Inizia Ora
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-all backdrop-blur-sm"
          >
            Scopri di Più
          </Link>
        </div>
      </div>
    </div>
  );
}