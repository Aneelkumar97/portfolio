import Link from 'next/link';
import DemoFooter from '@/components/DemoFooter';

export const metadata = {
  title: 'Learn with Me: React & JavaScript concepts with interactive live demos',
  description: 'Explore interactive demonstrations of React Hooks, Patterns, and JavaScript concepts with detailed explanations and code examples.',
};

export default function DemosPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              React & JS concepts with interactive demos
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Explore React Hooks, Patterns, and JavaScript concepts through hands-on demonstrations. 
              Click the ❓ icons for detailed explanations and code examples.
            </p>
          </div>
        </section>

        {/* Demo Categories */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* React Demos Card */}
              <Link href="/learn-with-aneel/react" className="group">
                <div className="h-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-3xl">
                      ⚛️
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      React Concepts
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                    Explore React Hooks, Advanced Patterns, Error Boundaries, Portals, and modern React features.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">✓</span> React Hooks (useState, useEffect, useContext, etc.)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">✓</span> Advanced Patterns (useTransition, Suspense, Error Boundaries)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">✓</span> React Patterns (HOCs, Render Props, Composition)
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-blue-500">✓</span> Portals & Advanced Rendering
                    </li>
                  </ul>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    View React Concepts
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>

              {/* JavaScript Demos Card */}
              <Link href="/learn-with-aneel/javascript" className="group">
                <div className="h-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-yellow-500 dark:hover:border-yellow-400">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center text-3xl">
                      🚀
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition">
                      JavaScript Concepts
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                    Deep dive into core JavaScript concepts including Closures, Promises, Event Loop, and more.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500">✓</span> Closures & Scope
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500">✓</span> Promises & Async/Await
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500">✓</span> Event Loop & Call Stack
                    </li>
                    <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <span className="text-yellow-500">✓</span> Prototypes & Inheritance
                    </li>
                  </ul>
                  <div className="flex items-center text-yellow-600 dark:text-yellow-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    View JavaScript Concepts
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <DemoFooter />
    </main>
  );
}
