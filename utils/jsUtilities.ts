// JavaScript Concepts Demonstration

// 1. Closures
export function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

// 2. Currying
export function curry<T>(fn: (...args: any[]) => T) {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(null, args);
    } else {
      return function (...args2: any[]) {
        return curried.apply(null, args.concat(args2));
      };
    }
  };
}

// Example curried function
export const add = curry((a: number, b: number, c: number) => a + b + c);

// 3. Memoization
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map();
  return ((...args: any[]) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// 4. Debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 5. Throttle
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// 6. Deep Clone using recursion
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any;
  if (obj instanceof Object) {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

// 7. Promise utilities
export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// 8. Async retry with exponential backoff
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (maxRetries <= 0) throw error;
    await new Promise(resolve => setTimeout(resolve, delay));
    return retryWithBackoff(fn, maxRetries - 1, delay * 2);
  }
}

// 9. Pipe and Compose
export function pipe<T>(...fns: Array<(arg: T) => T>) {
  return (value: T) => fns.reduce((acc, fn) => fn(acc), value);
}

export function compose<T>(...fns: Array<(arg: T) => T>) {
  return (value: T) => fns.reduceRight((acc, fn) => fn(acc), value);
}

// 10. Generator function example
export function* fibonacci(limit: number): Generator<number> {
  let [prev, curr] = [0, 1];
  let count = 0;
  while (count < limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
    count++;
  }
}

// 11. Iterator example
export function createRangeIterator(start: number, end: number, step: number = 1) {
  let current = start;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (current <= end) {
        const value = current;
        current += step;
        return { value, done: false };
      }
      return { value: undefined, done: true };
    },
  };
}

// 12. Proxy example - validation
export function createValidatedObject<T extends object>(target: T, validator: (key: string, value: any) => boolean) {
  return new Proxy(target, {
    set(obj, prop, value) {
      if (validator(prop as string, value)) {
        return Reflect.set(obj, prop, value);
      }
      throw new Error(`Invalid value for ${String(prop)}`);
    },
  });
}

// 13. WeakMap for private data
const privateData = new WeakMap();

export class PrivateDataExample {
  constructor(data: any) {
    privateData.set(this, { data });
  }

  getData() {
    return privateData.get(this)?.data;
  }
}

// 14. Design Pattern: Singleton
export class Singleton {
  private static instance: Singleton;
  private constructor() {}

  static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// 15. Design Pattern: Observer
export class Observable<T> {
  private observers: Array<(data: T) => void> = [];

  subscribe(fn: (data: T) => void) {
    this.observers.push(fn);
    return () => {
      this.observers = this.observers.filter(observer => observer !== fn);
    };
  }

  notify(data: T) {
    this.observers.forEach(observer => observer(data));
  }
}

// 16. Design Pattern: Factory
export interface Product {
  operation(): string;
}

export class ConcreteProductA implements Product {
  operation(): string {
    return 'Product A';
  }
}

export class ConcreteProductB implements Product {
  operation(): string {
    return 'Product B';
  }
}

export class Factory {
  static createProduct(type: 'A' | 'B'): Product {
    switch (type) {
      case 'A':
        return new ConcreteProductA();
      case 'B':
        return new ConcreteProductB();
      default:
        throw new Error('Invalid product type');
    }
  }
}

// 17. ES6+ Features demonstration
export const demonstrateES6 = () => {
  // Destructuring
  const obj = { a: 1, b: 2, c: 3 };
  const { a, ...rest } = obj;

  // Spread operator
  const arr1 = [1, 2, 3];
  const arr2 = [...arr1, 4, 5];

  // Template literals
  const name = 'Developer';
  const greeting = `Hello, ${name}!`;

  // Arrow functions
  const double = (x: number) => x * 2;

  // Default parameters
  const greet = (name: string = 'Guest') => `Hello, ${name}`;

  return { rest, arr2, greeting, doubled: double(5), greetResult: greet() };
};

// 18. Symbol usage
export const createUniqueKey = () => {
  const uniqueId = Symbol('id');
  return {
    [uniqueId]: 'unique-value',
    id: 'normal-id',
  };
};

// 19. Map and Set utilities
export class CollectionUtils {
  static mapExample() {
    const map = new Map<string, number>();
    map.set('one', 1);
    map.set('two', 2);
    return map;
  }

  static setExample() {
    const set = new Set<number>([1, 2, 3, 3, 4]);
    return set; // Will contain [1, 2, 3, 4]
  }
}

// 20. Async/Await with error handling
export async function fetchWithTimeout(url: string, timeout: number = 5000): Promise<any> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

// 21. Event Loop Demonstration with State Tracking
export interface EventLoopState {
  step: number;
  callStack: string[];
  microtaskQueue: string[];
  macrotaskQueue: string[];
  eventHandlerQueue: string[]; // Queue for DOM event handlers
  log: string;
  timestamp: number;
  highlightLines?: number[]; // Line numbers to highlight in code
  consoleOutput?: string[]; // Console outputs up to this point
}

export function demonstrateEventLoopWithState(): EventLoopState[] {
  const states: EventLoopState[] = [];
  let step = 0;
  const startTime = Date.now();
  
  // Track queues
  let callStack: string[] = [];
  let microtaskQueue: string[] = [];
  let macrotaskQueue: string[] = [];
  let eventHandlerQueue: string[] = []; // Queue for DOM event handlers
  let consoleOutput: string[] = [];

  const addState = (log: string) => {
    step++;
    states.push({
      step,
      callStack: [...callStack],
      microtaskQueue: [...microtaskQueue],
      macrotaskQueue: [...macrotaskQueue],
      eventHandlerQueue: [...eventHandlerQueue],
      log,
      timestamp: Date.now() - startTime,
      consoleOutput: [...consoleOutput],
    });
  };

  // Start
  callStack.push('main()');
  addState("Pushing 'main()' to Call Stack");

  // Synchronous code 1
  callStack.push("console.log('Start')");
  addState("Pushing \"console.log('Start')\" to Call Stack");
  consoleOutput.push('Start');
  addState("Executed \"console.log('Start')\"");
  callStack.pop();

  // Register button event listener - add to event handler queue
  callStack.push("button.addEventListener('click', handler)");
  addState("Pushing \"button.addEventListener('click', handler)\" to Call Stack");
  eventHandlerQueue.push('Click event handler (registered)');
  addState("Registering 'Click event handler' - ready to execute on click");
  callStack.pop();

  // setTimeout 0ms - add to macrotask queue
  callStack.push('setTimeout(cb1, 0)');
  addState("Pushing 'setTimeout(cb1, 0)' to Call Stack");
  macrotaskQueue.push('setTimeout callback 1');
  addState("Pushing 'setTimeout callback 1' from Call Stack to Macrotask Queue");
  callStack.pop();

  // setTimeout 10ms - add to macrotask queue
  callStack.push('setTimeout(cb2, 10)');
  addState("Pushing 'setTimeout(cb2, 10)' to Call Stack");
  macrotaskQueue.push('setTimeout callback 2 (10ms)');
  addState("Pushing 'setTimeout callback 2' from Call Stack to Macrotask Queue");
  callStack.pop();

  // Promise 1 - add to microtask queue
  callStack.push('Promise.resolve().then(cb1)');
  addState("Pushing 'Promise.resolve().then()' to Call Stack");
  microtaskQueue.push('Promise callback 1');
  addState("Pushing 'Promise callback 1' from Call Stack to Microtask Queue");
  callStack.pop();

  // queueMicrotask - add to microtask queue
  callStack.push('queueMicrotask(cb)');
  addState("Pushing 'queueMicrotask()' to Call Stack");
  microtaskQueue.push('queueMicrotask callback');
  addState("Pushing 'queueMicrotask callback' from Call Stack to Microtask Queue");
  callStack.pop();

  // Synchronous code 2
  callStack.push("console.log('Middle')");
  addState("Pushing \"console.log('Middle')\" to Call Stack");
  consoleOutput.push('Middle');
  addState("Executed \"console.log('Middle')\"");
  callStack.pop();

  // User clicks button - move event handler from registered to ready queue
  addState("🖱️ User clicks button - Event handler queued for execution");
  eventHandlerQueue[0] = 'Click event handler (ready)';
  addState("Click event handler moved to ready state in Event Handler Queue");

  // Promise 2 - add to microtask queue
  callStack.push('Promise.resolve().then(cb2)');
  addState("Pushing 'Promise.resolve().then(cb2)' to Call Stack");
  microtaskQueue.push('Promise callback 2');
  addState("Pushing 'Promise callback 2' from Call Stack to Microtask Queue");
  callStack.pop();

  // Synchronous code 3
  callStack.push("console.log('End')");
  addState("Pushing \"console.log('End')\" to Call Stack");
  consoleOutput.push('End');
  addState("Executed \"console.log('End')\"");
  callStack.pop();

  // Main function complete
  callStack.pop();
  addState("Main execution complete - Call Stack empty");

  // Event Loop: Process all microtasks
  addState("Event Loop: Processing Microtask Queue");
  
  while (microtaskQueue.length > 0) {
    const microtask = microtaskQueue.shift()!;
    callStack.push(microtask);
    addState(`Pushing '${microtask}' from Microtask Queue to Call Stack`);
    
    // Add console output based on which microtask is executing
    if (microtask === 'Promise callback 1') {
      consoleOutput.push('Promise 1');
    } else if (microtask === 'Chained Promise callback') {
      consoleOutput.push('Chained Promise');
    } else if (microtask === 'queueMicrotask callback') {
      consoleOutput.push('queueMicrotask');
    } else if (microtask === 'Promise callback 2') {
      consoleOutput.push('Promise 2');
    }
    
    addState(`Executed '${microtask}'`);
    callStack.pop();
    
    // Promise callback 1 creates chained promise
    if (microtask === 'Promise callback 1') {
      microtaskQueue.push('Chained Promise callback');
      addState("Pushing 'Chained Promise callback' from Call Stack to Microtask Queue");
    }
  }

  addState("Microtask Queue empty - checking Event Handler Queue");

  // Event Loop: Process event handlers (after microtasks, before macrotasks)
  while (eventHandlerQueue.length > 0) {
    const eventHandler = eventHandlerQueue.shift()!;
    if (eventHandler.includes('ready')) {
      addState("Event Loop: Processing Event Handler Queue");
      const handlerName = 'Click event handler';
      callStack.push(handlerName);
      addState(`Pushing '${handlerName}' from Event Handler Queue to Call Stack`);
      consoleOutput.push('Button clicked!');
      addState(`Executed '${handlerName}'`);
      callStack.pop();
    }
  }

  addState("Event Handler Queue empty - processing Macrotasks");

  // Event Loop: Process first macrotask
  if (macrotaskQueue.length > 0) {
    const macrotask = macrotaskQueue.shift()!;
    callStack.push(macrotask);
    addState(`Pushing '${macrotask}' from Macrotask Queue to Call Stack`);
    consoleOutput.push('setTimeout 1');
    addState(`Executed '${macrotask}'`);
    
    // Macrotask creates a microtask
    microtaskQueue.push('Promise inside setTimeout');
    addState("Pushing 'Promise inside setTimeout' from Call Stack to Microtask Queue");
    callStack.pop();
    
    // Process microtasks created by macrotask
    addState("Event Loop: Processing Microtask Queue (from macrotask)");
    while (microtaskQueue.length > 0) {
      const microtask = microtaskQueue.shift()!;
      callStack.push(microtask);
      addState(`Pushing '${microtask}' from Microtask Queue to Call Stack`);
      consoleOutput.push('Promise inside setTimeout');
      addState(`Executed '${microtask}'`);
      callStack.pop();
    }
  }

  // Process remaining macrotasks
  while (macrotaskQueue.length > 0) {
    addState("Event Loop: Processing next Macrotask");
    const macrotask = macrotaskQueue.shift()!;
    callStack.push(macrotask);
    addState(`Pushing '${macrotask}' from Macrotask Queue to Call Stack`);
    consoleOutput.push('setTimeout 2');
    addState(`Executed '${macrotask}'`);
    callStack.pop();
  }

  addState("Event Loop: All tasks complete");

  return states;
}

export interface EventLoopLog {
  order: number;
  type: 'callstack' | 'microtask' | 'macrotask';
  message: string;
  timestamp: number;
}

export function demonstrateEventLoop(callback: (log: EventLoopLog) => void): void {
  const logs: EventLoopLog[] = [];
  let order = 0;
  const startTime = Date.now();

  const addLog = (type: EventLoopLog['type'], message: string) => {
    order++;
    const log: EventLoopLog = {
      order,
      type,
      message,
      timestamp: Date.now() - startTime,
    };
    logs.push(log);
    callback(log);
  };

  // 1. Synchronous code (Call Stack)
  addLog('callstack', 'Start: Synchronous code execution');

  // 2. Macrotask - setTimeout (goes to Macrotask Queue)
  setTimeout(() => {
    addLog('macrotask', 'setTimeout 0ms - Macrotask Queue');
    
    // Microtask inside Macrotask
    Promise.resolve().then(() => {
      addLog('microtask', 'Promise inside setTimeout - Microtask');
    });
  }, 0);

  // 3. Macrotask with delay
  setTimeout(() => {
    addLog('macrotask', 'setTimeout 10ms - Macrotask Queue');
  }, 10);

  // 4. Microtask - Promise (goes to Microtask Queue)
  Promise.resolve().then(() => {
    addLog('microtask', 'Promise.resolve().then() - Microtask Queue');
    
    // Chained Promise (also Microtask)
    return Promise.resolve();
  }).then(() => {
    addLog('microtask', 'Chained Promise - Microtask Queue');
  });

  // 5. queueMicrotask API
  queueMicrotask(() => {
    addLog('microtask', 'queueMicrotask() - Microtask Queue');
  });

  // 6. More synchronous code
  addLog('callstack', 'Middle: More synchronous code');

  // 7. Another Promise
  Promise.resolve().then(() => {
    addLog('microtask', 'Another Promise - Microtask Queue');
  });

  // 8. Immediate macrotask
  setTimeout(() => {
    addLog('macrotask', 'Immediate setTimeout - Macrotask Queue');
  }, 0);

  // 9. Final synchronous code
  addLog('callstack', 'End: Final synchronous code');
}

export function demonstrateCallStack(): string[] {
  const callStack: string[] = [];

  function firstFunction() {
    callStack.push('1. firstFunction() - Added to Call Stack');
    secondFunction();
    callStack.push('5. firstFunction() - Resumed after secondFunction()');
  }

  function secondFunction() {
    callStack.push('2. secondFunction() - Added to Call Stack');
    thirdFunction();
    callStack.push('4. secondFunction() - Resumed after thirdFunction()');
  }

  function thirdFunction() {
    callStack.push('3. thirdFunction() - Executed and Removed');
  }

  callStack.push('0. Start - Global Execution Context');
  firstFunction();
  callStack.push('6. End - All functions completed');

  return callStack;
}

export async function demonstrateMicrotaskVsMacrotask(): Promise<string[]> {
  const executionOrder: string[] = [];

  executionOrder.push('1. Sync: Start');

  setTimeout(() => {
    executionOrder.push('5. Macrotask: setTimeout');
  }, 0);

  Promise.resolve().then(() => {
    executionOrder.push('3. Microtask: Promise 1');
  });

  queueMicrotask(() => {
    executionOrder.push('4. Microtask: queueMicrotask');
  });

  executionOrder.push('2. Sync: End');

  // Wait for all tasks to complete
  await new Promise(resolve => setTimeout(resolve, 50));

  return executionOrder;
}
