import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

export default function ProjectCard({
  title,
  description,
  image,
  tags,
  demoUrl,
  repoUrl,
  index,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 border border-gray-800 hover:border-purple-500/50 shadow-lg hover:shadow-purple-500/10 flex flex-col h-full"
    >
      <div className="relative h-48 sm:h-56">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
      </div>
      
      <div className="relative flex-1 p-6">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
            {title}
          </h3>
          
          <p className="text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 text-xs bg-purple-500/10 text-purple-300 rounded-full border border-purple-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-4 mt-6">
          <a
            href={demoUrl}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group/link text-sm"
          >
            <ExternalLink className="h-4 w-4 transition-transform group-hover/link:scale-110" />
            <span className="font-medium">Demo</span>
          </a>
          <a
            href={repoUrl}
            className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors group/link text-sm"
          >
            <Github className="h-4 w-4 transition-transform group-hover/link:scale-110" />
            <span className="font-medium">Repo</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}