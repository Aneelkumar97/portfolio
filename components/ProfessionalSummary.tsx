'use client';

import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useCustomHooks';

interface Highlight {
  icon: string;
  title: string;
  description: string;
}

const highlights: Highlight[] = [
  {
    icon: '🎯',
    title: 'Mission-Driven',
    description: 'Focused on delivering high-quality, scalable solutions that solve real business problems'
  },
  {
    icon: '🚀',
    title: 'Performance Optimizer',
    description: 'Expert in identifying bottlenecks and implementing solutions for optimal application performance'
  },
  {
    icon: '👥',
    title: 'Team Player',
    description: 'Strong collaborator with excellent communication skills, mentoring junior developers'
  },
  {
    icon: '📚',
    title: 'Continuous Learner',
    description: 'Always staying updated with latest frontend technologies and best practices'
  },
  {
    icon: '💡',
    title: 'Problem Solver',
    description: 'Analytical mindset with ability to break down complex problems into simple solutions'
  },
  {
    icon: '✨',
    title: 'Detail-Oriented',
    description: 'Meticulous attention to detail ensuring pixel-perfect implementations and clean code'
  }
];

interface Expertise {
  category: string;
  items: string[];
}

const expertise: Expertise[] = [
  {
    category: 'Frontend',
    items: ['React.js', 'Redux', 'JavaScript', 'TypeScript', 'HTML5', 'CSS', 'Cypress', 'Jest']
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'GO basics']
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'CI/CD Pipelines', 'Jenkins', 'Azure DevOps']
  },
  {
    category: 'Monitoring & Tools',
    items: ['PromQL', 'Logman', 'HAProxy', 'RCA', 'Performance Optimization']
  },
  {
    category: 'Architecture',
    items: ['Scalable Frontend', 'Microservices', 'Authentication', 'JWT', 'OAuth 2.0']
  },
  {
    category: 'Microsoft 365',
    items: ['SharePoint Framework', 'SPFx', 'Power Platform', 'Microsoft Graph API']
  }
];

export default function ProfessionalSummary() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Introduction */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-700 dark:text-gray-300">
            <p>
              Hi! I'm <span className="font-bold text-purple-600 dark:text-purple-400">Aneel Kumar</span>, a Senior Systems Analyst at DAZN (dä-zōn) with over 7+ years of experience crafting exceptional web experiences.
            </p>
            <p>
              I specialize in building scalable, performant React applications that delight users and drive business value. Currently, I'm delivering high-impact multi-market sign-up and sign-in journeys, ensuring a seamless experience across web platforms at DAZN.
            </p>
            {/* <p>
              From architecting modular frontend components that enabled 40% faster feature delivery to optimizing CI/CD pipelines reducing production defects by 35%, I've worked across the full spectrum of frontend and full-stack development. I'm equally comfortable building performance-optimized web apps as I am mentoring junior engineers and championing best practices.
            </p> */}
          </div>
        </div>

        {/* What Sets Me Apart */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            What Sets Me Apart
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <HighlightCard key={index} highlight={highlight} index={index} />
            ))}
          </div>
        </div>

        {/* Technical Expertise */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Technical Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertise.map((exp, index) => (
              <ExpertiseCard key={index} expertise={exp} index={index} />
            ))}
          </div>
        </div>

        {/* Professional Philosophy */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            My Professional Philosophy
          </h3>
          <div className="grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-300">
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>🎨</span> User-Centric Design
              </h4>
              <p>
                Every line of code I write is focused on delivering the best possible user experience. I believe that great frontend engineering is where functionality meets aesthetics.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>⚡</span> Performance First
              </h4>
              <p>
                Performance is not an afterthought—it's a core requirement. I optimize for speed, efficiency, and scalability from day one.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>🔧</span> Clean Code
              </h4>
              <p>
                I write maintainable, well-documented code that my future self and team members will thank me for. Code quality matters.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-3 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <span>🤝</span> Collaboration
              </h4>
              <p>
                Great products are built by great teams. I value open communication, knowledge sharing, and collective problem-solving.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            Let's build something amazing together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/career"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
            >
              View My Experience
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full font-semibold border-2 border-gray-300 dark:border-gray-600 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer inline-block"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HighlightCard({ highlight, index }: { highlight: Highlight; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-t-4 border-purple-500 ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="text-4xl mb-4">{highlight.icon}</div>
      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {highlight.title}
      </h4>
      <p className="text-gray-600 dark:text-gray-400">
        {highlight.description}
      </p>
    </div>
  );
}

function ExpertiseCard({ expertise, index }: { expertise: Expertise; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all duration-500 ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b-2 border-purple-500 pb-2">
        {expertise.category}
      </h4>
      <div className="flex flex-wrap gap-2">
        {expertise.items.map((item) => (
          <span
            key={item}
            className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
