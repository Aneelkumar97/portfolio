'use client';

import React, { useState, ReactNode, createContext, useContext, forwardRef, useImperativeHandle, useRef } from 'react';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';

// 1. Higher Order Component (HOC) Pattern
function withLogging<P extends object>(Component: React.ComponentType<P>) {
  return function WithLoggingComponent(props: P) {
    console.log('Props:', props);
    return <Component {...props} />;
  };
}

// 2. Render Props Pattern
interface MouseTrackerProps {
  render: (position: { x: number; y: number }) => ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center cursor-crosshair"
    >
      {render(position)}
    </div>
  );
}

// 3. Compound Components Pattern
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
} | null>(null);

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 border-b border-gray-300 dark:border-gray-600 mb-4">{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;

  return (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-4 py-2 font-medium transition-colors ${
        isActive
          ? 'text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');
  
  const { activeTab } = context;
  
  if (activeTab !== id) return null;
  
  return <div className="p-4 animate-fade-in">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

// 4. Controlled vs Uncontrolled Components
function ControlledInput() {
  const [value, setValue] = useState('');
  
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Controlled input"
        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Value: {value}</p>
    </div>
  );
}

function UncontrolledInput() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState('');
  
  const handleSubmit = () => {
    if (inputRef.current) {
      setDisplayValue(inputRef.current.value);
    }
  };
  
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        defaultValue=""
        placeholder="Uncontrolled input"
        className="w-full px-3 py-2 border rounded-lg mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full"
      >
        Get Value
      </button>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Value: {displayValue}</p>
    </div>
  );
}

// 5. forwardRef & useImperativeHandle
interface FancyInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string;
}

const FancyInput = forwardRef<FancyInputHandle, { placeholder?: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      setValue('');
    },
    getValue: () => {
      return value;
    },
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={props.placeholder}
      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    />
  );
});

FancyInput.displayName = 'FancyInput';

function ImperativeHandleDemo() {
  const fancyInputRef = useRef<FancyInputHandle>(null);

  return (
    <div>
      <FancyInput ref={fancyInputRef} placeholder="Imperative handle input" />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => fancyInputRef.current?.focus()}
          className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition"
        >
          Focus
        </button>
        <button
          onClick={() => fancyInputRef.current?.clear()}
          className="flex-1 px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition"
        >
          Clear
        </button>
        <button
          onClick={() => alert(fancyInputRef.current?.getValue())}
          className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
        >
          Get Value
        </button>
      </div>
    </div>
  );
}

// Simple component for HOC demo
function SimpleCard({ title, content }: { title: string; content: string }) {
  return (
    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
      <h4 className="font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{content}</p>
    </div>
  );
}

const LoggedCard = withLogging(SimpleCard);

export default function ReactPatterns() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4 pb-2 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
          React Design Patterns
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          HOC, Render Props, Compound Components & More
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HOC Pattern */}
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900 dark:to-orange-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Higher-Order Component (HOC)
              <IconTooltip 
                content="Function that enhances components. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('hoc')}
              />
            </h3>
            
            {/* Instructions Section */}
            <div className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                📚 How This Demo Works:
              </p>
              <ol className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
                <li>The <code className="px-1 py-0.5 bg-yellow-100 dark:bg-yellow-900 rounded">SimpleCard</code> component is a basic card display</li>
                <li>The <code className="px-1 py-0.5 bg-yellow-100 dark:bg-yellow-900 rounded">withLogging</code> HOC wraps it to add logging</li>
                <li><strong>Open your browser console</strong> (F12) to see the logs</li>
                <li>Every time the card receives props, they&apos;re logged automatically</li>
                <li>The original component is unchanged - functionality is added externally</li>
              </ol>
            </div>

            <div className="mb-3 p-2 bg-blue-100 dark:bg-blue-900 rounded text-xs text-blue-900 dark:text-blue-100">
              💡 <strong>Key Concept:</strong> HOC = Function that takes a component → returns an enhanced version
            </div>

            <LoggedCard title="Enhanced Card" content="This component is wrapped with withLogging HOC" />
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center italic">
              ⚠️ Check browser console to see the HOC logging props in action
            </p>
          </div>

          {/* Render Props Pattern */}
          <div className="p-6 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900 dark:to-teal-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Render Props Pattern
              <IconTooltip 
                content="Share code using function props. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('renderProps')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Share code using a prop that is a function. Move your mouse!
            </p>
            <MouseTracker
              render={({ x, y }) => (
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    🖱️ Mouse Position
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    X: {Math.round(x)}, Y: {Math.round(y)}
                  </p>
                </div>
              )}
            />
          </div>

          {/* Compound Components */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-xl shadow-lg lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Compound Components Pattern
              <IconTooltip 
                content="Components that work together sharing implicit state. Click to see implementation and code examples."
                conceptDetails={getConceptDetails('compoundComponents')}
              />
            </h3>
            
            {/* Instructions Section */}
            <div className="mb-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                📚 How This Demo Works:
              </p>
              <ol className="text-xs text-gray-700 dark:text-gray-300 space-y-1 list-decimal list-inside">
                <li><strong>Click any tab</strong> (&quot;React Hooks&quot;, &quot;Patterns&quot;, or &quot;Performance&quot;)</li>
                <li>Watch the content panel below change automatically</li>
                <li>Notice how <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">Tabs</code>, <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">Tabs.List</code>, <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">Tabs.Tab</code>, and <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">Tabs.Panel</code> work together</li>
                <li>They share state through Context - <strong>no props passed manually!</strong></li>
                <li>Like HTML&apos;s <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">&lt;select&gt;</code> and <code className="px-1 py-0.5 bg-purple-100 dark:bg-purple-900 rounded">&lt;option&gt;</code> tags</li>
              </ol>
            </div>

            <div className="mb-3 p-2 bg-blue-100 dark:bg-blue-900 rounded text-xs text-blue-900 dark:text-blue-100">
              💡 <strong>Key Concept:</strong> Components communicate implicitly via Context - flexible, intuitive API without prop drilling!
            </div>

            <Tabs defaultTab="tab1">
              <Tabs.List>
                <Tabs.Tab id="tab1">React Hooks</Tabs.Tab>
                <Tabs.Tab id="tab2">Patterns</Tabs.Tab>
                <Tabs.Tab id="tab3">Performance</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel id="tab1">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">React Hooks</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    useState, useEffect, useContext, useReducer, useMemo, useCallback, and more!
                  </p>
                </div>
              </Tabs.Panel>
              <Tabs.Panel id="tab2">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Design Patterns</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    HOC, Render Props, Compound Components, Provider Pattern, and more!
                  </p>
                </div>
              </Tabs.Panel>
              <Tabs.Panel id="tab3">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <h4 className="font-bold mb-2 text-gray-900 dark:text-white">Performance</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    React.memo, useMemo, useCallback, code splitting, lazy loading!
                  </p>
                </div>
              </Tabs.Panel>
            </Tabs>
            
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center italic">
              ✨ Real-world usage: Radix UI, Headless UI, React Aria all use this pattern!
            </p>
          </div>

          {/* Controlled Components */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900 dark:to-cyan-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Controlled Component
              <IconTooltip 
                content="Controlled components have their form data controlled by React state. Every change goes through state, giving you full control over the input value. Perfect for validation, formatting, or conditional logic."
                conceptDetails={getConceptDetails('controlledComponent')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Form data is handled by React state
            </p>
            <ControlledInput />
          </div>

          {/* Uncontrolled Components */}
          <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900 dark:to-pink-900 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              Uncontrolled Component
              <IconTooltip 
                content="Uncontrolled components store their data in the DOM itself, not React state. You access values using refs when needed. Simpler for basic forms but offers less control than controlled components."
                conceptDetails={getConceptDetails('uncontrolledComponent')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Form data is handled by the DOM using refs
            </p>
            <UncontrolledInput />
          </div>

          {/* forwardRef & useImperativeHandle */}
          <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900 rounded-xl shadow-lg lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center">
              forwardRef & useImperativeHandle
              <IconTooltip 
                content="forwardRef passes refs to child components. useImperativeHandle customizes the ref value exposed to parent, allowing you to expose specific methods while keeping internal state private. Great for reusable input libraries."
                conceptDetails={getConceptDetails('forwardRef')}
              />
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Customize the instance value exposed to parent components
            </p>
            <ImperativeHandleDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
