/**
 * Windows 98 Desktop Portfolio
 *
 * Main application entry point
 * Orchestrates boot screen, desktop, taskbar, and window rendering
 */

import React, { useState, useEffect } from 'react';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import { useWindowStore } from './store/windowStore';

// Import app components
import Resume from './apps/Resume';
import InternetExplorer from './apps/InternetExplorer';
import CommandPrompt from './apps/CommandPrompt';
import ContactDialog from './apps/ContactDialog';
import SystemProperties from './apps/SystemProperties';
import MyComputer from './apps/MyComputer';
import ProjectsExplorer from './apps/ProjectsExplorer';
import FloppyDialog from './apps/FloppyDialog';
import ShutdownDialog from './apps/ShutdownDialog';
import RunDialog from './apps/RunDialog';
import HelpDialog from './apps/HelpDialog';
import Notepad from './apps/Notepad';
import Calculator from './apps/Calculator';
import StartMenu from './components/StartMenu';
import ShutdownScreen from './components/ShutdownScreen';
import { useUIStore } from './store/uiStore';

// Window component mapping
const WINDOW_COMPONENTS = {
  resume: Resume,
  explorer: InternetExplorer,
  cmd: CommandPrompt,
  contact: ContactDialog,
  system: SystemProperties,
  mycomputer: MyComputer,
  projects: ProjectsExplorer,
  floppy: FloppyDialog,
  shutdown: ShutdownDialog,
  run: RunDialog,
  help: HelpDialog,
  notepad: Notepad,
  calculator: Calculator,
};

function App() {
  const [isBooting, setIsBooting] = useState(true);
  const { openWindows } = useWindowStore();

  // Handle boot complete
  const handleBootComplete = () => {
    setIsBooting(false);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Alt+F4 to close active window
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        const { closeActiveWindow } = useWindowStore.getState();
        closeActiveWindow();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Show boot screen
  if (isBooting) {
    return <BootScreen onBootComplete={handleBootComplete} />;
  }

  // Render desktop with windows
  return (
    <div
      className="h-screen w-screen overflow-hidden no-select"
      style={{
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
        fontSize: '11px',
      }}
    >
      <Desktop>
        {/* Render all open windows */}
        {Object.keys(openWindows).map((windowId) => {
          const win = openWindows[windowId];
          const type = win?.type || windowId;
          const WindowComponent = WINDOW_COMPONENTS[type];
          if (!WindowComponent) return null;
          return (
            <WindowComponent
              key={windowId}
              windowId={windowId}
              windowProps={win?.props}
            />
          );
        })}
      </Desktop>

      <Taskbar />
      <StartMenu />
      <ShutdownScreen />
    </div>
  );
}

export default App;

