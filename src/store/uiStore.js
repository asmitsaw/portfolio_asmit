/**
 * UI State Store (Zustand)
 * 
 * Manages Start Menu, shutdown, and other UI states
 */

import { create } from 'zustand';

export const useUIStore = create((set, get) => ({
  // Start Menu state
  startOpen: false,
  activeSubmenu: null,
  
  // Shutdown state
  shutdownDialogOpen: false,
  shuttingDown: false,
  
  // Run dialog state
  runDialogOpen: false,
  
  // Help dialog state
  helpDialogOpen: false,
  
  /**
   * Toggle Start Menu
   */
  toggleStart: () => {
    set((state) => ({ 
      startOpen: !state.startOpen,
      activeSubmenu: null, // Close any open submenu
    }));
  },
  
  /**
   * Close Start Menu
   */
  closeStart: () => {
    set({ 
      startOpen: false,
      activeSubmenu: null,
    });
  },
  
  /**
   * Set active submenu
   */
  setActiveSubmenu: (submenu) => {
    set({ activeSubmenu: submenu });
  },
  
  /**
   * Open shutdown dialog
   * Note: Caller should use windowStore.openWindow('shutdown') directly
   */
  openShutdownDialog: () => {
    set({ 
      startOpen: false,
      activeSubmenu: null,
    });
  },
  
  /**
   * Start shutdown process
   */
  startShutdown: () => {
    set({ 
      shuttingDown: true,
      shutdownDialogOpen: false,
    });
  },
  
  /**
   * Open Run dialog
   * Note: Caller should use windowStore.openWindow('run') directly
   */
  openRunDialog: () => {
    set({ 
      startOpen: false,
      activeSubmenu: null,
    });
  },
  
  /**
   * Open Help dialog
   * Note: Caller should use windowStore.openWindow('help') directly
   */
  openHelpDialog: () => {
    set({ 
      startOpen: false,
      activeSubmenu: null,
    });
  },
  
  /**
   * Log off user
   */
  logOff: () => {
    set({ 
      shuttingDown: true,
      startOpen: false,
      activeSubmenu: null,
    });
    // After showing shutdown screens, reload to boot screen
    setTimeout(() => {
      window.location.reload();
    }, 5000); // Give time for animation + final screen
  },
}));

export default useUIStore;
