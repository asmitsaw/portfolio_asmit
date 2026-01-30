/**
 * Windows 98 Taskbar Component
 * 
 * Fixed bottom taskbar with:
 * - Start button (visual only)
 * - Open window buttons
 * - System tray with clock
 */

import React, { useState, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import { useUIStore } from '../store/uiStore';

// Windows Logo SVG
const WindowsLogo = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" style={{ imageRendering: 'pixelated' }}>
    <rect x="0" y="0" width="7" height="6" fill="#FF0000"/>
    <rect x="8" y="0" width="7" height="6" fill="#00FF00"/>
    <rect x="0" y="7" width="7" height="6" fill="#0000FF"/>
    <rect x="8" y="7" width="7" height="6" fill="#FFFF00"/>
  </svg>
);

// Quick Launch Icon (small square button with icon only)
const QuickLaunchIcon = ({ title, onClick, children }) => (
  <button
    className="win98-taskbar-button"
    title={title}
    onClick={onClick}
    style={{
      width: 26,
      minWidth: 26,
      padding: '2px',
      justifyContent: 'center',
    }}
  >
    {children}
  </button>
);

const Taskbar = () => {
  const { 
    openWindows, 
    activeWindow, 
    minimizedWindows,
    openWindow, 
    focusWindow 
  } = useWindowStore();
  
  const { toggleStart } = useUIStore();
  const [time, setTime] = useState('');

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      setTime(`${displayHours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle taskbar button click
  const handleTaskbarButtonClick = (windowId) => {
    if (minimizedWindows.has(windowId)) {
      // Restore minimized window
      openWindow(windowId);
    } else if (activeWindow === windowId) {
      // Minimize active window
      const { minimizeWindow } = useWindowStore.getState();
      minimizeWindow(windowId);
    } else {
      // Focus window
      focusWindow(windowId);
    }
  };

  // Get list of windows for taskbar
  const taskbarWindows = Object.values(openWindows);

  return (
    <div 
      className="win98-taskbar fixed bottom-0 left-0 right-0 no-select"
      style={{ zIndex: 9999 }}
    >
      {/* Start Button */}
      <button 
        className="win98-start-button relative"
        onClick={toggleStart}
      >
        <WindowsLogo />
        <span>Start</span>
      </button>

      {/* Divider */}
      <div className="win98-divider" />

     

      {/* Divider between quick launch and task buttons */}
      <div className="win98-divider" />

      {/* Taskbar Buttons */}
      <div className="flex-1 flex items-center gap-1 px-1 overflow-hidden">
        {taskbarWindows.map((window) => {
          const isActive = activeWindow === window.id && !minimizedWindows.has(window.id);
          
          return (
            <button
              key={window.id}
              className={`win98-taskbar-button ${isActive ? 'active' : ''}`}
              onClick={() => handleTaskbarButtonClick(window.id)}
            >
              <span style={{ fontSize: '12px' }}>{window.icon}</span>
              <span className="truncate">{window.title}</span>
            </button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="win98-system-tray">
        {/* Volume Icon (visual) */}
        <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated' }}>
          <polygon points="2,5 2,9 5,9 9,12 9,2 5,5" fill="#000"/>
          <path d="M10,4 Q12,7 10,10" fill="none" stroke="#000" strokeWidth="1"/>
        </svg>
        
        {/* Clock */}
        <span style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default Taskbar;
