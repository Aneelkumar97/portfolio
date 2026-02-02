'use client';

import React, { useState, useRef, ReactNode } from 'react';
import { useOnClickOutside } from '@/hooks/useCustomHooks';
import ConceptModal from '@/components/ConceptModal';

export interface ConceptDetails {
  title: string;
  brief: string;
  implementation: string;
  codeExample: string;
  useCases?: string[];
  benefits?: string[];
  relatedConcepts?: string[];
}

interface TooltipProps {
  content: string | ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  conceptDetails?: ConceptDetails;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top',
  className = '',
  conceptDetails
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(tooltipRef as React.RefObject<HTMLDivElement>, () => setIsVisible(false));

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 dark:border-t-gray-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 dark:border-b-gray-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 dark:border-l-gray-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 dark:border-r-gray-700',
  };

  return (
    <div 
      ref={tooltipRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}
      
      {isVisible && (
        <div 
          className={`absolute z-50 ${positionClasses[position]} animate-fade-in`}
          style={{ minWidth: '280px', maxWidth: '400px' }}
        >
          <div className="bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg px-4 py-3 shadow-2xl border border-gray-700 dark:border-gray-600">
            {typeof content === 'string' ? (
              <p className="leading-relaxed">{content}</p>
            ) : (
              content
            )}
            
            {/* Show Learn More button if conceptDetails provided */}
            {conceptDetails && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                  setIsVisible(false);
                }}
                className="mt-3 w-full px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors font-medium"
              >
                📖 View Full Details & Code
              </button>
            )}
          </div>
          {/* Arrow */}
          <div 
            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
          />
        </div>
      )}

      {/* Concept Modal */}
      {conceptDetails && (
        <ConceptModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          details={conceptDetails}
        />
      )}
    </div>
  );
}

// Inline tooltip for wrapping text
export function InlineTooltip({ 
  content, 
  children, 
  highlight = true 
}: { 
  content: string | ReactNode; 
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <Tooltip content={content}>
      <span className={`
        cursor-help inline-flex items-center gap-1
        ${highlight ? 'border-b-2 border-dotted border-purple-400 dark:border-purple-500' : ''}
      `}>
        {children}
        <span className="text-xs opacity-60">ℹ️</span>
      </span>
    </Tooltip>
  );
}

// Icon tooltip for hover info with optional concept details
export function IconTooltip({ 
  content, 
  conceptDetails 
}: { 
  content: string | ReactNode;
  conceptDetails?: ConceptDetails;
}) {
  return (
    <Tooltip content={content} position="top" conceptDetails={conceptDetails}>
      <button 
        className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-xs font-bold"
        aria-label="More information"
      >
        ?
      </button>
    </Tooltip>
  );
}
