'use client';

import React, { useRef, useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useCustomHooks';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  concepts: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-featured shopping cart with payment integration, real-time inventory, and admin dashboard.',
    tech: ['React', 'Redux', 'Node.js', 'MongoDB'],
    concepts: ['Context API', 'Custom Hooks', 'Code Splitting', 'Performance Optimization'],
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Real-Time Chat Application',
    description: 'WebSocket-based chat with typing indicators, read receipts, and file sharing capabilities.',
    tech: ['React', 'Socket.io', 'TypeScript', 'Redis'],
    concepts: ['useReducer', 'WebSockets', 'Suspense', 'Error Boundaries'],
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Interactive data visualization with real-time updates and customizable widgets.',
    tech: ['Next.js', 'D3.js', 'GraphQL', 'PostgreSQL'],
    concepts: ['Server Components', 'SSR', 'useMemo', 'Custom Hooks'],
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 4,
    title: 'Task Management System',
    description: 'Collaborative project management with drag-and-drop, notifications, and time tracking.',
    tech: ['React', 'TypeScript', 'Firebase', 'Tailwind'],
    concepts: ['DnD', 'Compound Components', 'HOC', 'Render Props'],
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    id: 5,
    title: 'Video Streaming Platform',
    description: 'Netflix-like interface with adaptive streaming, recommendations, and watch history.',
    tech: ['React', 'Next.js', 'AWS', 'Redis'],
    concepts: ['Lazy Loading', 'Infinite Scroll', 'Video APIs', 'Caching'],
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    id: 6,
    title: 'Social Media Feed',
    description: 'Instagram-inspired feed with stories, likes, comments, and real-time updates.',
    tech: ['React', 'GraphQL', 'Apollo', 'Node.js'],
    concepts: ['Virtualization', 'Optimistic Updates', 'Image Optimization', 'Infinite Scroll'],
    gradient: 'from-yellow-500 to-orange-600',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600">
          Featured Projects
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          A selection of production-ready applications I've built and delivered
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(cardRef, { threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${
        hasIntersected ? 'animate-fade-in-up' : 'opacity-0'
      } ${isHovered ? 'scale-105' : ''}`}
    >
      {/* Gradient header */}
      <div className={`h-2 bg-gradient-to-r ${project.gradient}`}></div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
            Key Features
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.concepts.map((concept) => (
              <span
                key={concept}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors"
              >
                {concept}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`}></div>
    </div>
  );
}
