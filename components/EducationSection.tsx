'use client';

import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useCustomHooks';

interface Education {
  id: number;
  degree: string;
  field: string;
  institution: string;
  location: string;
  duration: string;
}

const educationData: Education[] = [
  {
    id: 1,
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science Engineering',
    institution: "Vignan's Lara Institute of Technology and Sciences",
    location: 'Vadlamudi, Guntur, India',
    duration: '2014 - 2018'
  }
];

export default function EducationSection() {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        {/* Education */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Education
          </h2>
          
          {educationData.map((edu, index) => (
            <EducationCard key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ education, index }: { education: Education; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-700 border-l-4 border-purple-500 ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {education.degree}
          </h3>
          <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mb-2">
            {education.field}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
            {education.institution}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            📍 {education.location}
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:text-right">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {education.duration}
          </p>
        </div>
      </div>
    </div>
  );
}
