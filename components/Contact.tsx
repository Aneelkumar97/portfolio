'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus('sent');
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => {
      setStatus('idle');
    }, 1500);
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/g-aneel-kumar', color: 'hover:text-blue-600' },
    { name: 'Email', icon: '📧', url: 'mailto:aneel.geek@gmail.com', color: 'hover:text-red-600' },
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/Aneelkumar97', color: 'hover:text-gray-900 dark:hover:text-white' },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          Let's Connect
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Have a project in mind? Let's build something amazing together!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send a Message (Coming Soon)</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent dark:bg-gray-700 dark:text-white transition resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={status !== 'idle'}
                className={`w-full px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  status === 'idle'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:scale-105 cursor-pointer'
                    : status === 'sending'
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 cursor-pointer'
                }`}
              >
                {status === 'idle' ? 'Send Message' : status === 'sending' ? 'Sending...' : '✓ Sent!'}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Social Links */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Connect With Me</h3>
              
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target={"_blank"}
                    className={`flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-all hover:scale-105 hover:shadow-md ${link.color}`}
                  >
                    <span className="text-3xl">{link.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <span>Based in Hyderabad, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💼</span>
                  <span>Currently at DAZN (dä-zōn)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⏰</span>
                  <span>Response time: Within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  <span>7+ years of experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
