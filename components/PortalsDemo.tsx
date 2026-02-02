'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';

// Modal using React Portal
function Modal({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Add ESC key listener
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

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <div 
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl"
        >
          ×
        </button>
        
        {children}
      </div>
    </div>,
    document.body
  );
}

// Notification using React Portal
function Notification({ message, type, onClose }: { 
  message: string; 
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!mounted) return null;

  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-rose-500',
    info: 'from-blue-500 to-cyan-500',
  };

  const icons = {
    success: '✓',
    error: '✗',
    info: 'ℹ',
  };

  return createPortal(
    <div className="fixed top-20 right-4 z-50 animate-fade-in-up">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]`}>
        <span className="text-2xl">{icons[type]}</span>
        <p className="flex-1">{message}</p>
        <button onClick={onClose} className="text-white/80 hover:text-white text-xl">
          ×
        </button>
      </div>
    </div>,
    document.body
  );
}

// Main component demonstrating Portals
export default function PortalsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({ message, type });
  };

  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
          React Portals
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Render children into a DOM node outside the parent component hierarchy
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Modal Demo */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Modal with Portal
              <IconTooltip 
                content="Render outside parent DOM hierarchy. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('portals')}
              />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Modal rendered outside parent component using createPortal
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
            >
              Open Modal
            </button>
          </div>

          {/* Notifications Demo */}
          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Notifications
              <IconTooltip content="Toast notifications use Portals to render at a fixed position on screen, independent of where they're triggered. They automatically disappear after a timeout and can stack gracefully." />
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Toast notifications using Portals
            </p>
            <div className="space-y-3">
              <button
                onClick={() => showNotification('Success! Action completed.', 'success')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Show Success
              </button>
              <button
                onClick={() => showNotification('Error! Something went wrong.', 'error')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Show Error
              </button>
              <button
                onClick={() => showNotification('Info: This is a message.', 'info')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Show Info
              </button>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Portal Benefits
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>Escape parent overflow/z-index constraints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>Perfect for modals, tooltips, and notifications</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>Maintains React event bubbling</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span>Clean component hierarchy</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
            🚀
          </div>
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
            React Portal Modal
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This modal is rendered outside the normal React tree using createPortal.
            It maintains event bubbling and context while being appended to document.body!
          </p>
          <div className="space-y-2 text-sm text-left bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <p className="font-mono text-xs text-gray-700 dark:text-gray-300">
              createPortal(children, domNode)
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
              <li>Renders outside parent DOM hierarchy</li>
              <li>Maintains React component tree</li>
              <li>Event bubbling still works</li>
            </ul>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
          >
            Close Modal
          </button>
        </div>
      </Modal>

      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </section>
  );
}
