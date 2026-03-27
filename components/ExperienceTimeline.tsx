'use client';

import React, { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/useCustomHooks';

interface Experience {
  id: number;
  company: string;
  position: string;
  duration: string;
  location: string;
  type: 'full-time' | 'contract' | 'freelance';
  description: string;
  achievements: string[];
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: 5,
    company: 'Dazn',
    position: 'Senior Systems Analyst',
    duration: 'Feb 2026 - Present',
    location: 'Hyderabad, India',
    type: 'full-time',
    description: 'Building a fast-evolving global sports streaming platform',
    achievements: [
      'Led the design and development of responsive, high-performance frontend features using React, TypeScript, and MobX, improving load times and maintainability.',
      'Integrated Contentful CMS to enable dynamic content management and localization across multiple markets.'
    ],
    technologies: ['React.js', 'Redux', 'TypeScript', 'Mobx']
  },
  {
    id: 4,
    company: 'Swiggy',
    position: 'Senior Software Engineer (SDE - II)',
    duration: 'Dec 2024 - Feb 2026',
    location: 'Bangalore, India',
    type: 'full-time',
    description: 'Leading high-impact UI development and serving as primary on-call engineer, ensuring 99.9%+ availability SLAs while architecting scalable frontend solutions.',
    achievements: [
      'Delivered pixel-perfect UI features using Swiggy Design System, improving CSAT by 22% during chat feature rollout',
      'Served as primary on-call engineer (~1 week/month), maintaining 99.9%+ availability SLAs',
      'Architected modular, reusable frontend components enabling 40% faster feature delivery',
      'Optimized CI/CD pipelines reducing release cycles by 30% and production defects by 35%',
      'Monitored metrics using PromQL and Logman for proactive incident detection and mitigation'
    ],
    technologies: ['React.js', 'Redux', 'TypeScript', 'Cypress', 'Jest', 'AWS', 'Docker', 'PromQL', 'HAProxy']
  },
  {
    id: 3,
    company: 'Recro (Client - Swiggy)',
    position: 'Senior Software Engineer',
    duration: 'Aug 2021 - Dec 2024',
    location: 'Bangalore, India',
    type: 'full-time',
    description: 'Developed scalable full-stack solutions for Swiggy, managing application resources and implementing stakeholder-driven dashboards for operational excellence.',
    achievements: [
      'Built performance-optimized Web Apps for polygon management and advanced map visualizations',
      'Migrated CI/CD pipelines from Jenkins to AWS, accelerating deployment frequency',
      'Developed chat and customer agent applications improving communication workflows',
      'Integrated and migrated multiple microservices enhancing modularity and scalability',
      'Centralized critical event monitoring enabling proactive anomaly detection'
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'TypeScript', 'AWS', 'Docker', 'Logman', 'HAProxy']
  },
  {
    id: 2,
    company: 'Technovert Solutions (Clients - Railpros, ADP)',
    position: 'Software Engineer - M365',
    duration: 'Jan 2021 - Aug 2021',
    location: 'Hyderabad, India',
    type: 'full-time',
    description: 'Led requirement analysis and application architecture design using SharePoint Framework and React, delivering enterprise solutions for Fortune 500 clients.',
    achievements: [
      'Led requirement analysis and designed application architecture using SharePoint Framework',
      'Developed deployment strategies for SharePoint Apps ensuring smooth rollouts',
      'Created rich UI visual web parts for dashboards and form pages',
      'Enhanced user experience and operational efficiency through intuitive UI design',
      'Collaborated with stakeholders to ensure successful adoption and deployment'
    ],
    technologies: ['React.js', 'SharePoint Framework', 'TypeScript', 'Microsoft 365', 'Azure DevOps']
  },
  {
    id: 1,
    company: 'Technovert Solutions (Product - Saketa Intranet Suite)',
    position: 'Junior Software Engineer',
    duration: 'May 2018 - Jan 2021',
    location: 'Hyderabad, India',
    type: 'full-time',
    description: 'Developed responsive intranet solutions, integrated third-party services, and built secure authentication libraries for enterprise clients.',
    achievements: [
      'Developed responsive layout engine with interactive UI templates',
      'Built Search Service Center enhancing search performance and user discovery',
      'Integrated O365, Salesforce, Jira, and Asana data into SharePoint Online',
      'Contributed OAuth 2.0 and OAuth authentication libraries for secure API integrations',
      'Automated SharePoint builds using Azure DevOps pipelines improving deployment reliability'
    ],
    technologies: ['React.js', 'JavaScript', 'SharePoint', 'OAuth 2.0', 'Azure DevOps', 'REST APIs']
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Awards Section - Highlighted First */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 dark:from-yellow-400 dark:via-orange-400 dark:to-red-400">
              🏆 Awards & Recognition
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Recognized for excellence and outstanding contributions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <AwardCard 
              title="Swiggstar JAS'25 Team Winner"
              company="Swiggy"
              year="2025"
              icon="🏆"
              index={0}
            />
            <AwardCard 
              title="Swiggstar OND'24 Team Winner"
              company="Swiggy"
              year="2025"
              icon="🏆"
              index={1}
            />
            <AwardCard 
              title="Going the Extra Mile"
              company="Recro"
              year="2022"
              icon="⭐"
              index={2}
            />
          </div>
        </div>

        {/* Experience Timeline Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A journey of 7+ years building exceptional web experiences
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-20">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} isEven={index % 2 === 0} />
            ))}
          </div>
        </div>

        {/* Download Resume CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Want to know more?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Download my complete resume for detailed information
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer">
              📄 Download Resume (Coming soon)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ experience, index, isEven }: { experience: Experience; index: number; isEven: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={`md:flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
        {/* Content */}
        <div className={`md:w-1/2 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 group border-l-4 border-purple-500">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2 justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  experience.type === 'full-time' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : experience.type === 'contract'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                }`}>
                  {experience.type.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {experience.duration}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {experience.position}
              </h3>
              <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 mb-1">
                {experience.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                📍 {experience.location}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-left">
              {experience.description}
            </p>

            {/* Key Achievements */}
            <div className="mb-4 text-left">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <span>🎯</span> Key Achievements
              </h4>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-purple-500 mt-1 flex-shrink-0">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="text-left">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <span>🛠️</span> Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline dot */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-900 shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
        </div>

        {/* Spacer for the other side */}
        <div className="hidden md:block md:w-1/2"></div>
      </div>
    </div>
  );
}

// Award Card Component
function AwardCard({ title, company, year, icon, index }: { title: string; company: string; year: string; icon: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, { threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 border-yellow-400 dark:border-yellow-600 ${
        hasIntersected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="text-6xl mb-4 text-center">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
        {title}
      </h3>
      <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 text-center mb-1">
        {company}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {year}
      </p>
    </div>
  );
}
