'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useCustomHooks';
import { IconTooltip } from './Tooltip';

interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'react' | 'javascript' | 'tools';
}

const skills: Skill[] = [
  { name: 'React.js', level: 95, category: 'react' },
  { name: 'Next.js', level: 92, category: 'react' },
  { name: 'TypeScript', level: 90, category: 'javascript' },
  { name: 'JavaScript ES6+', level: 95, category: 'javascript' },
  { name: 'Redux/Context API', level: 88, category: 'react' },
  { name: 'React Hooks', level: 95, category: 'react' },
  { name: 'CSS3/Tailwind', level: 90, category: 'frontend' },
  { name: 'Webpack/Vite', level: 85, category: 'tools' },
  { name: 'Git/GitHub', level: 92, category: 'tools' },
  { name: 'Testing (Jest/RTL)', level: 87, category: 'tools' },
];

export default function HeroSection() {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('all');
  const heroRef = useRef<HTMLDivElement>(null);
  const { isIntersecting, hasIntersected } = useIntersectionObserver(heroRef, {
    threshold: 0.1,
  });

  const filteredSkills = activeSkillCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeSkillCategory);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden transition-opacity duration-1000 ${
        hasIntersected ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Main heading with gradient text */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
              Aneel Kumar
            </span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-4 animate-fade-in-up animation-delay-200">
            Senior Frontend Engineer
          </p>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 animate-fade-in-up animation-delay-300">
            7+ Years of React & JavaScript Expertise
          </p>

          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-400">
            Passionate about building scalable, performant, and beautiful web applications.
            Specializing in React, TypeScript, and modern JavaScript ecosystems with a focus on
            delivering exceptional user experiences and maintainable code.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in-up animation-delay-600">
            <a
              href="/career"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
            >
              View Experience
            </a>
            <a
              href="#projects"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border-2 border-gray-300 dark:border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border-2 border-gray-300 dark:border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in-up animation-delay-800">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Technical Proficiency
          </h2>

          {/* Skill category filter */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {['all', 'react', 'javascript', 'frontend', 'tools'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveSkillCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                  activeSkillCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {filteredSkills.map((skill, index) => (
              <SkillBar key={skill.name} skill={skill} delay={index * 100} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <StatCard number="7+" label="Years Experience" delay={0} />
          <StatCard number="22%" label="CSAT Improvement" delay={200} />
          <StatCard number="40%" label="Faster Delivery" delay={400} />
          <StatCard number="99.9%" label="Availability SLA" delay={600} />
        </div>
      </div>
    </section>
  );
}

// Skill Bar Component with animation
function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  useEffect(() => {
    if (hasIntersected) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [hasIntersected, skill.level, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.name}
        </span>
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {skill.level}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out group-hover:from-purple-500 group-hover:to-pink-500"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
}

// Stat Card Component
function StatCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 ${
        hasIntersected ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
        {number}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </div>
  );
}
