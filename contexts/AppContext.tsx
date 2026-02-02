'use client';

import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

// Demonstrating useReducer with complex state management
interface AppState {
  selectedSection: string;
  isMenuOpen: boolean;
  notifications: Array<{ id: string; message: string; type: 'info' | 'success' | 'error' }>;
  userInteractions: number;
}

type AppAction =
  | { type: 'SET_SECTION'; payload: string }
  | { type: 'TOGGLE_MENU' }
  | { type: 'CLOSE_MENU' }
  | { type: 'ADD_NOTIFICATION'; payload: { message: string; type: 'info' | 'success' | 'error' } }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'INCREMENT_INTERACTION' };

const initialState: AppState = {
  selectedSection: 'home',
  isMenuOpen: false,
  notifications: [],
  userInteractions: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SECTION':
      return { ...state, selectedSection: action.payload };
    case 'TOGGLE_MENU':
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case 'CLOSE_MENU':
      return { ...state, isMenuOpen: false };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id: Date.now().toString(), ...action.payload },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case 'INCREMENT_INTERACTION':
      return { ...state, userInteractions: state.userInteractions + 1 };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
