import ReactHooksDemo from '@/components/ReactHooksDemo';
import ReactAdvancedPatterns from '@/components/ReactAdvancedPatterns';
import ReactPatterns from '@/components/ReactPatterns';
import PortalsDemo from '@/components/PortalsDemo';
import ReactVirtualizationDemo from '@/components/ReactVirtualizationDemo';
import Link from 'next/link';

export const metadata = {
  title: 'React Demos | Interactive Hooks & Patterns',
  description: 'Explore interactive demonstrations of React Hooks, Advanced Patterns, Error Boundaries, and more.',
};

export default function ReactDemosPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <Link 
                href="/learn-with-aneel" 
                className="inline-flex items-center text-white/80 hover:text-white transition text-sm"
              >
                ← Back to All Demos
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                React Demos
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Explore React Hooks, Advanced Patterns, and modern React features through hands-on demonstrations. 
                Click the ❓ icons for detailed explanations and code examples.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Sections */}
        <ReactHooksDemo />
        <ReactAdvancedPatterns />
        <ReactPatterns />
        <PortalsDemo />
        <ReactVirtualizationDemo />
      </div>
    </main>
  );
}
