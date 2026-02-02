'use client';

import React from 'react';

export default function LazyLoadedComponent() {
  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg animate-fade-in">
      <h4 className="font-bold mb-2">🎉 Lazy Loaded Component</h4>
      <p className="mb-2">This component was loaded asynchronously using React.lazy()</p>
      <div className="text-sm bg-white/20 p-2 rounded mt-2">
        <p className="font-semibold">✅ Successfully loaded from separate chunk!</p>
        <p className="text-xs mt-1">Check Network tab in DevTools - you'll see a new JS chunk loaded when you clicked the button.</p>
      </div>
    </div>
  );
}
