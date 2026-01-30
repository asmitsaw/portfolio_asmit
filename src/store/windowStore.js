/**
 * Window Manager Store (Zustand)
 * 
 * Manages all window states including:
 * - Open/close windows
 * - Minimize/restore windows
 * - Focus and z-index management
 * - Window positions and sizes
 */

import { create } from 'zustand';

// Initial window configurations
const INITIAL_WINDOWS = {
  resume: {
    id: 'resume',
    title: 'Resume - WordPad',
    icon: '📝',
    defaultWidth: 650,
    defaultHeight: 500,
    defaultX: 150,
    defaultY: 80,
    minWidth: 400,
    minHeight: 300,
  },
  explorer: {
    id: 'explorer',
    title: 'Internet Explorer',
    icon: '🌐',
    defaultWidth: 700,
    defaultHeight: 500,
    defaultX: 200,
    defaultY: 100,
    minWidth: 400,
    minHeight: 300,
  },
  cmd: {
    id: 'cmd',
    title: 'Command Prompt',
    icon: '⬛',
    defaultWidth: 600,
    defaultHeight: 400,
    defaultX: 100,
    defaultY: 120,
    minWidth: 400,
    minHeight: 200,
  },
  contact: {
    id: 'contact',
    title: 'Send Message',
    icon: '✉️',
    defaultWidth: 380,
    defaultHeight: 320,
    defaultX: 300,
    defaultY: 150,
    minWidth: 350,
    minHeight: 280,
    isDialog: true,
  },
  system: {
    id: 'system',
    title: 'System Properties',
    icon: '💻',
    defaultWidth: 400,
    defaultHeight: 450,
    defaultX: 250,
    defaultY: 100,
    minWidth: 380,
    minHeight: 400,
  },
  mycomputer: {
    id: 'mycomputer',
    title: 'My Computer',
    icon: '🖥️',
    defaultWidth: 500,
    defaultHeight: 400,
    defaultX: 180,
    defaultY: 90,
    minWidth: 350,
    minHeight: 300,
  },
  projects: {
    id: 'projects',
    title: 'Projects (D:)',
    icon: '📁',
    defaultWidth: 640,
    defaultHeight: 480,
    defaultX: 220,
    defaultY: 110,
    minWidth: 420,
    minHeight: 320,
  },
  floppy: {
    id: 'floppy',
    title: '3½ Floppy (A:)',
    icon: '💾',
    defaultWidth: 360,
    defaultHeight: 220,
    defaultX: 260,
    defaultY: 160,
    minWidth: 320,
    minHeight: 200,
    isDialog: true,
  },
  shutdown: {
    id: 'shutdown',
    title: 'Shut Down Windows',
    icon: '⚠️',
    defaultWidth: 350,
    defaultHeight: 200,
    defaultX: 300,
    defaultY: 200,
    minWidth: 300,
    minHeight: 150,
    isDialog: true,
  },
  run: {
    id: 'run',
    title: 'Run',
    icon: '▶️',
    defaultWidth: 400,
    defaultHeight: 180,
    defaultX: 300,
    defaultY: 200,
    minWidth: 350,
    minHeight: 150,
    isDialog: true,
  },
  help: {
    id: 'help',
    title: 'Help',
    icon: '❓',
    defaultWidth: 400,
    defaultHeight: 250,
    defaultX: 300,
    defaultY: 200,
    minWidth: 350,
    minHeight: 200,
    isDialog: true,
  },
  notepad: {
    id: 'notepad',
    title: 'Untitled - Notepad',
    icon: '📝',
    defaultWidth: 500,
    defaultHeight: 400,
    defaultX: 200,
    defaultY: 100,
    minWidth: 300,
    minHeight: 200,
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: '🧮',
    defaultWidth: 240,
    defaultHeight: 280,
    defaultX: 300,
    defaultY: 150,
    minWidth: 240,
    minHeight: 280,
    isDialog: true,
  },
};

// Starting z-index for windows
let zIndexCounter = 100;
// Counter for dynamically created windows (multiple explorers, etc.)
let dynamicWindowCounter = 1;

export const useWindowStore = create((set, get) => ({
  // Map of open windows with their current state
  openWindows: {},

  // Currently active (focused) window ID
  activeWindow: null,

  // Windows minimized to taskbar
  minimizedWindows: new Set(),

  /**
   * Open a new window or restore if minimized
   */
  openWindow: (spec) => {
    const { openWindows, minimizedWindows } = get();

    // Allow calling openWindow('cmd') for backwards compatibility
    if (typeof spec === 'string') spec = { type: spec };

    const { type, id, props } = spec;
    if (!type) return;

    // If an explicit id is provided and window exists and is minimized, restore it
    const targetId = id || `${type}_${dynamicWindowCounter}`;

    if (minimizedWindows.has(targetId)) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.delete(targetId);
      zIndexCounter++;

      set({
        minimizedWindows: newMinimized,
        activeWindow: targetId,
        openWindows: {
          ...openWindows,
          [targetId]: {
            ...openWindows[targetId],
            zIndex: zIndexCounter,
          },
        },
      });
      return;
    }

    // If a window with this id is already open, just focus it
    if (openWindows[targetId]) {
      get().focusWindow(targetId);
      return;
    }

    // If type maps to an initial config, use it as base
    const baseConfig = INITIAL_WINDOWS[type] || {};

    // If no explicit id was provided, increment dynamic counter
    const finalId = id || `${type}_${dynamicWindowCounter++}`;

    zIndexCounter++;
    const newWindow = {
      ...baseConfig,
      id: finalId,
      type,
      title: props && props.title ? `${baseConfig.title || type} - ${props.title}` : baseConfig.title || (type.charAt(0).toUpperCase() + type.slice(1)),
      x: baseConfig.defaultX || 200,
      y: baseConfig.defaultY || 120,
      width: baseConfig.defaultWidth || 480,
      height: baseConfig.defaultHeight || 360,
      zIndex: zIndexCounter,
      props: props || {},
    };

    set({
      openWindows: {
        ...openWindows,
        [finalId]: newWindow,
      },
      activeWindow: finalId,
    });
  },

  /**
   * Close a window
   */
  closeWindow: (windowId) => {
    const { openWindows, minimizedWindows, activeWindow } = get();
    const newWindows = { ...openWindows };
    delete newWindows[windowId];

    const newMinimized = new Set(minimizedWindows);
    newMinimized.delete(windowId);

    // Find new active window (highest z-index)
    let newActive = null;
    let highestZ = 0;
    Object.values(newWindows).forEach((win) => {
      if (win.zIndex > highestZ && !newMinimized.has(win.id)) {
        highestZ = win.zIndex;
        newActive = win.id;
      }
    });

    set({
      openWindows: newWindows,
      minimizedWindows: newMinimized,
      activeWindow: activeWindow === windowId ? newActive : activeWindow,
    });
  },

  /**
   * Maximize a window (store previous bounds for restore)
   */
  maximizeWindow: (windowId) => {
    const { openWindows, minimizedWindows } = get();
    if (!openWindows[windowId] || minimizedWindows.has(windowId)) return;

    zIndexCounter++;

    const win = openWindows[windowId];
    const prevBounds = { x: win.x, y: win.y, width: win.width, height: win.height };

    set({
      activeWindow: windowId,
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...win,
          isMaximized: true,
          prevBounds,
          zIndex: zIndexCounter,
        },
      },
    });
  },

  /**
   * Restore a maximized window to its previous bounds
   */
  restoreWindow: (windowId) => {
    const { openWindows } = get();
    if (!openWindows[windowId]) return;

    const win = openWindows[windowId];
    if (!win.isMaximized || !win.prevBounds) return;

    const { x, y, width, height } = win.prevBounds;

    set({
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...win,
          isMaximized: false,
          prevBounds: undefined,
          x,
          y,
          width,
          height,
        },
      },
    });
  },

  /**
   * Minimize a window to taskbar
   */
  minimizeWindow: (windowId) => {
    const { minimizedWindows, openWindows, activeWindow } = get();

    if (!openWindows[windowId]) return;

    const newMinimized = new Set(minimizedWindows);
    newMinimized.add(windowId);

    // Find new active window
    let newActive = null;
    let highestZ = 0;
    Object.values(openWindows).forEach((win) => {
      if (win.id !== windowId && win.zIndex > highestZ && !newMinimized.has(win.id)) {
        highestZ = win.zIndex;
        newActive = win.id;
      }
    });

    set({
      minimizedWindows: newMinimized,
      activeWindow: activeWindow === windowId ? newActive : activeWindow,
    });
  },

  /**
   * Focus a window (bring to front)
   */
  focusWindow: (windowId) => {
    const { openWindows, minimizedWindows } = get();

    if (!openWindows[windowId] || minimizedWindows.has(windowId)) return;

    zIndexCounter++;

    set({
      activeWindow: windowId,
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...openWindows[windowId],
          zIndex: zIndexCounter,
        },
      },
    });
  },

  /**
   * Update window position
   */
  updateWindowPosition: (windowId, x, y) => {
    const { openWindows } = get();

    if (!openWindows[windowId]) return;

    set({
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...openWindows[windowId],
          x,
          y,
        },
      },
    });
  },

  /**
   * Update window size
   */
  updateWindowSize: (windowId, width, height) => {
    const { openWindows } = get();

    if (!openWindows[windowId]) return;

    set({
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...openWindows[windowId],
          width,
          height,
        },
      },
    });
  },

  /**
   * Update window props (for navigation, etc.)
   */
  updateWindowProps: (windowId, newProps) => {
    const { openWindows } = get();

    if (!openWindows[windowId]) return;

    const window = openWindows[windowId];
    const baseConfig = INITIAL_WINDOWS[window.type] || {};

    // Update title if a new title is provided
    const updatedTitle = newProps.title
      ? `${baseConfig.title || window.type} - ${newProps.title}`
      : window.title;

    set({
      openWindows: {
        ...openWindows,
        [windowId]: {
          ...openWindows[windowId],
          title: updatedTitle,
          props: {
            ...openWindows[windowId].props,
            ...newProps,
          },
        },
      },
    });
  },

  /**
   * Close active window (for Alt+F4)
   */
  closeActiveWindow: () => {
    const { activeWindow } = get();
    if (activeWindow) {
      get().closeWindow(activeWindow);
    }
  },

  /**
   * Get window config by ID
   */
  getWindowConfig: (windowId) => {
    return INITIAL_WINDOWS[windowId];
  },

  /**
   * Check if window is open (not minimized)
   */
  isWindowVisible: (windowId) => {
    const { openWindows, minimizedWindows } = get();
    return openWindows[windowId] && !minimizedWindows.has(windowId);
  },
}));

export default useWindowStore;
