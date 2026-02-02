'use client';

declare module 'react-virtualized';


import React, { useState, useMemo, useEffect, useRef } from 'react';
import { List, Grid, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { IconTooltip } from './Tooltip';
import { getConceptDetails } from '@/utils/conceptDetails';
import 'react-virtualized/styles.css';

// Generate mock data
const generateItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    title: `Item ${i + 1}`,
    description: `This is a description for item ${i + 1}. Virtual scrolling makes it efficient to render thousands of items without performance issues.`,
    value: Math.floor(Math.random() * 1000),
    category: ['Tech', 'Design', 'Business', 'Science'][Math.floor(Math.random() * 4)],
  }));
};

export default function ReactVirtualizationDemo() {
  const [mounted, setMounted] = useState(false);
  const [listItemCount, setListItemCount] = useState(10000);
  const [gridItemCount, setGridItemCount] = useState(5000);
  const [showComparison, setShowComparison] = useState(true);
  const [listRenderedRows, setListRenderedRows] = useState(0);
  const [gridRenderedCells, setGridRenderedCells] = useState(0);
  const [comparisonRenderedRows, setComparisonRenderedRows] = useState(0);

  // Refs for DOM containers
  const listContainerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const comparisonContainerRef = useRef<HTMLDivElement>(null);

  // Prevent SSR hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Count actual DOM nodes
  useEffect(() => {
    if (!mounted) return;

    const countDOMNodes = () => {
      // Count list items using our data attribute
      if (listContainerRef.current) {
        const listRows = listContainerRef.current.querySelectorAll('[data-virtualized-item="list-row"]');
        setListRenderedRows(listRows.length);
      }

      // Count grid items using our data attribute
      if (gridContainerRef.current) {
        const gridCells = gridContainerRef.current.querySelectorAll('[data-virtualized-item="grid-cell"]');
        setGridRenderedCells(gridCells.length);
      }

      // Count comparison list items using our data attribute
      if (comparisonContainerRef.current) {
        const comparisonRows = comparisonContainerRef.current.querySelectorAll('[data-virtualized-item="comparison-row"]');
        setComparisonRenderedRows(comparisonRows.length);
      }
    };

    // Initial count
    countDOMNodes();

    // Set up interval to continuously count (updates as you scroll)
    const interval = setInterval(countDOMNodes, 100);

    return () => clearInterval(interval);
  }, [mounted]);

  // Generate items
  const listItems = useMemo(() => generateItems(listItemCount), [listItemCount]);
  const gridItems = useMemo(() => generateItems(gridItemCount), [gridItemCount]);

  // List row renderer
  const rowRenderer = ({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
    const item = listItems[index];
    return (
      <div 
        key={key} 
        style={style}
        data-virtualized-item="list-row"
        className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <div className="font-semibold text-gray-900 dark:text-white">
          {item.title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {item.description}
        </div>
        <div className="flex gap-3 mt-2 text-xs">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
            {item.category}
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            Value: {item.value}
          </span>
        </div>
      </div>
    );
  };

  // Grid cell renderer
  const cellRenderer = ({ columnIndex, key, rowIndex, style }: { columnIndex: number; key: string; rowIndex: number; style: React.CSSProperties }) => {
    const columns = 4;
    const index = rowIndex * columns + columnIndex;
    
    if (index >= gridItems.length) return null;
    
    const item = gridItems[index];
    
    return (
      <div
        key={key}
        data-virtualized-item="grid-cell"
        style={{
          ...style,
          padding: '8px',
        }}
      >
        <div className="h-full p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow hover:shadow-lg transition">
          <div className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
            {item.title}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {item.category}
          </div>
          <div className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            #{item.id}
          </div>
        </div>
      </div>
    );
  };

  // Non-virtualized list for comparison
  const NonVirtualizedList = () => {
    const smallList = useMemo(() => generateItems(100), []);
    
    return (
      <div className="overflow-auto border-2 border-red-300 dark:border-red-600 rounded-lg bg-white dark:bg-gray-800" style={{ height: '300px' }}>
        {smallList.map((item) => (
          <div key={item.id} className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <div className="font-semibold text-gray-900 dark:text-white">{item.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{item.description}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
            React Virtualization
            <IconTooltip 
              content="Virtualization renders only visible items, dramatically improving performance. Click to see implementation details."
              conceptDetails={getConceptDetails('virtualization')}
            />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Virtual scrolling renders only visible items using react-virtualized. 
            Handle lists with 10,000+ items smoothly by rendering just 10-15 DOM nodes.
          </p>
        </div>

        {/* Virtual List Demo */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            Virtual List
            <IconTooltip 
              content="List component renders only visible rows. Scroll through thousands of items with zero lag."
              conceptDetails={getConceptDetails('virtualList')}
            />
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Items: {listItemCount.toLocaleString()}
            </label>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={listItemCount}
              onChange={(e) => setListItemCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>⚡ Performance:</strong> Rendering <span className="text-green-600 dark:text-green-400 font-bold">{listRenderedRows}</span> DOM nodes out of {listItemCount.toLocaleString()} total items.
              {listRenderedRows > 0 && (
                <span className="ml-2">({((listRenderedRows / listItemCount) * 100).toFixed(2)}% in DOM)</span>
              )}
            </p>
          </div>

          <div ref={listContainerRef} className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900" style={{ minHeight: '400px' }}>
            {!mounted ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500 dark:text-gray-400">Loading virtualized list...</div>
              </div>
            ) : (
              <AutoSizer disableHeight>
                {({ width }: { width: number }) => (
                  <List
                    width={width}
                    height={400}
                    rowCount={listItems.length}
                    rowHeight={100}
                    rowRenderer={rowRenderer}
                    overscanRowCount={3}
                    className="focus:outline-none"
                  />
                )}
              </AutoSizer>
            )}
          </div>
        </div>

        {/* Virtual Grid Demo */}
        <div className="mb-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            Virtual Grid
            <IconTooltip 
              content="Grid component virtualizes in 2D. Perfect for image galleries and product catalogs."
              conceptDetails={getConceptDetails('virtualGrid')}
            />
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Total Items: {gridItemCount.toLocaleString()}
            </label>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={gridItemCount}
              onChange={(e) => setGridItemCount(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <strong>⚡ Performance:</strong> Rendering <span className="text-green-600 dark:text-green-400 font-bold">{gridRenderedCells}</span> DOM nodes out of {gridItemCount.toLocaleString()} total items.
              {gridRenderedCells > 0 && (
                <span className="ml-2">({((gridRenderedCells / gridItemCount) * 100).toFixed(2)}% in DOM)</span>
              )}
            </p>
          </div>

          <div ref={gridContainerRef} className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-900" style={{ minHeight: '400px' }}>
            {!mounted ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-gray-500 dark:text-gray-400">Loading virtualized grid...</div>
              </div>
            ) : (
              <AutoSizer disableHeight>
                {({ width }: { width: number }) => {
                  const columnCount = 4;
                  const columnWidth = width / columnCount;
                  const rowCount = Math.ceil(gridItems.length / columnCount);
                  
                  return (
                    <Grid
                      width={width}
                      height={400}
                      columnCount={columnCount}
                      columnWidth={columnWidth}
                      rowCount={rowCount}
                      rowHeight={120}
                      cellRenderer={cellRenderer}
                      overscanRowCount={2}
                      className="focus:outline-none"
                    />
                  );
                }}
              </AutoSizer>
            )}
          </div>
        </div>

        {/* Comparison Demo */}
        {showComparison && (
          <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Comparison: Non-Virtualized vs Virtualized
              </h3>
              <button
                onClick={() => setShowComparison(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Hide
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3">
                  ❌ Non-Virtualized (100 items)
                </h4>
                <NonVirtualizedList />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  All 100 DOM nodes rendered. With 10,000+ items, this would freeze the browser.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3">
                  ✅ Virtualized ({listItemCount.toLocaleString()} items)
                </h4>
                <div ref={comparisonContainerRef} className="border-2 border-green-300 dark:border-green-600 rounded-lg overflow-hidden" style={{ minHeight: '300px' }}>
                  {!mounted ? (
                    <div className="flex items-center justify-center h-72">
                      <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                    </div>
                  ) : (
                    <AutoSizer disableHeight>
                      {({ width }: { width: number }) => (
                        <List
                          width={width}
                          height={300}
                          rowCount={listItems.length}
                          rowHeight={80}
                          rowRenderer={({ index, key, style }: { index: number; key: string; style: React.CSSProperties }) => {
                            const item = listItems[index];
                            return (
                              <div key={key} style={style} data-virtualized-item="comparison-row" className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</div>
                              </div>
                            );
                          }}
                          overscanRowCount={2}
                        />
                      )}
                    </AutoSizer>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Only <span className="font-bold text-green-600 dark:text-green-400">{comparisonRenderedRows}</span> DOM nodes rendered. Handles thousands of items smoothly!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Benefits */}
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Key Benefits of Virtualization
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Performance:</strong> Render only visible items, reducing DOM nodes by 99%+
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💾</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Memory:</strong> Lower memory footprint - constant usage regardless of list size
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🚀</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Scalability:</strong> Handle 50,000+ items without lag or browser freezing
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">📱</span>
              <div>
                <strong className="text-gray-900 dark:text-white">Mobile-friendly:</strong> Smooth 60fps scrolling on mobile devices with limited resources
              </div>
            </li>
          </ul>

          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Using react-virtualized:
            </h4>
            <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
              <code>{`import { List, Grid, AutoSizer } from 'react-virtualized';

<AutoSizer>
  {({ width, height }) => (
    <List
      width={width}
      height={height}
      rowCount={10000}
      rowHeight={80}
      rowRenderer={rowRenderer}
    />
  )}
</AutoSizer>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
