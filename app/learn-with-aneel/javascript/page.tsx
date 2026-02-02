import JavaScriptConcepts from '@/components/JavaScriptConcepts';
import Link from 'next/link';

export const metadata = {
  title: 'JavaScript Demos | Interactive Concepts',
  description: 'Explore interactive demonstrations of JavaScript concepts including Closures, Promises, Event Loop, and more.',
};

export default function JavaScriptDemosPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="pt-20">
        {/* Page Header */}
        <section className="py-16 px-4 bg-gradient-to-br from-yellow-500 to-orange-600 text-white">
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
                JavaScript Demos
              </h1>
              <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto">
                Explore core JavaScript concepts through hands-on demonstrations. 
                Click the ❓ icons for detailed explanations and code examples.
              </p>
            </div>
          </div>
        </section>

        {/* Demo Sections */}
        <JavaScriptConcepts />
      </div>
    </main>
  );
}
