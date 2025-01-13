import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedTestimonial({ name, role, image, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100,
      }}
      className="group relative overflow-hidden rounded-xl bg-gray-900"
    >
      <div className="relative aspect-square">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <motion.div
        initial={{ y: "100%" }}
        whileHover={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="absolute bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm p-6 translate-y-[70%] group-hover:translate-y-0 transition-transform duration-500"
      >
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <p className="text-purple-400 mb-4">{role}</p>
        <p className="text-gray-400">
          Appassionato di innovazione e tecnologia, contribuisce alla crescita del team con esperienza e visione.
        </p>
      </motion.div>
    </motion.div>
  );
}