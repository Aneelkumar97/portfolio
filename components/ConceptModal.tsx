'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ConceptDetails } from './Tooltip';

interface ConceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  details: ConceptDetails;
}

export default function ConceptModal({ isOpen, onClose, details }: ConceptModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex items-center justify-between border-b border-white/20 z-10">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">📚</span>
            {details.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Brief Overview */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              <span>💡</span> Overview
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {details.brief}
            </p>
          </section>

          {/* Implementation in Current Example */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
              <span>🔧</span> Implementation in This Example
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {details.implementation}
            </p>
          </section>

          {/* Code Example */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
              <span>💻</span> Code Example
            </h3>
            <div className="relative">
              <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg overflow-x-auto border border-gray-700">
                <code className="text-sm leading-relaxed">{details.codeExample}</code>
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(details.codeExample);
                }}
                className="absolute top-2 right-2 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors"
              >
                📋 Copy
              </button>
            </div>
          </section>

          {/* Use Cases */}
          {details.useCases && details.useCases.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <span>🎯</span> Common Use Cases
              </h3>
              <ul className="space-y-2">
                {details.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-purple-500">▸</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Benefits */}
          {details.benefits && details.benefits.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <span>✨</span> Key Benefits
              </h3>
              <ul className="space-y-2">
                {details.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-green-500">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related Concepts */}
          {details.relatedConcepts && details.relatedConcepts.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
                <span>🔗</span> Related Concepts
              </h3>
              <div className="flex flex-wrap gap-2">
                {details.relatedConcepts.map((concept, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
          >
            Got it! 👍
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
