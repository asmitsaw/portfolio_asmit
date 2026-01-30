/**
 * Windows 98 Window Component
 * 
 * Reusable window component with:
 * - Draggable title bar
 * - Resizable borders
 * - Minimize, maximize, close buttons
 * - Active/inactive states
 * - Proper z-index layering
 */

import React, { useCallback } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '../store/windowStore';

const Window = ({ 
  windowId, 
  children, 
  showMenuBar = false,
  menuItems = [],
  isDialog = false 
}) => {
  const { 
    openWindows, 
    activeWindow, 
    minimizedWindows,
    focusWindow, 
    closeWindow, 
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updateWindowPosition,
    updateWindowSize 
  } = useWindowStore();

  const windowData = openWindows[windowId];
  const isMinimized = minimizedWindows.has(windowId);
  const isActive = activeWindow === windowId;

  // Handle window drag end
  const handleDragStop = useCallback((e, d) => {
    updateWindowPosition(windowId, d.x, d.y);
  }, [windowId, updateWindowPosition]);

  // Handle window resize end
  const handleResizeStop = useCallback((e, direction, ref, delta, position) => {
    updateWindowSize(windowId, parseInt(ref.style.width), parseInt(ref.style.height));
    updateWindowPosition(windowId, position.x, position.y);
  }, [windowId, updateWindowSize, updateWindowPosition]);

  // Handle window click to focus
  const handleWindowClick = useCallback((e) => {
    e.stopPropagation();
    if (!isActive) {
      focusWindow(windowId);
    }
  }, [windowId, isActive, focusWindow]);

  // Don't render if window is not open or is minimized
  if (!windowData || isMinimized) {
    return null;
  }

  const isMaximized = !!windowData.isMaximized;

  return (
    <Rnd
      position={isMaximized ? { x: 0, y: 0 } : { x: windowData.x, y: windowData.y }}
      size={isMaximized ? { width: '100%', height: '100%' } : { width: windowData.width, height: windowData.height }}
      minWidth={windowData.minWidth}
      minHeight={windowData.minHeight}
      style={{ zIndex: windowData.zIndex }}
      bounds="parent"
      dragHandleClassName="window-title-bar"
      onDragStart={handleWindowClick}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onMouseDown={handleWindowClick}
      enableResizing={!isDialog && !isMaximized}
      disableDragging={isMaximized}
    >
      <div 
        className="flex flex-col h-full no-select"
        style={{
          background: 'hsl(var(--win98-gray))',
          border: '1px solid hsl(var(--win98-black))',
          boxShadow: 'inset 1px 1px 0 hsl(var(--win98-white)), inset -1px -1px 0 hsl(var(--win98-dark-gray))',
        }}
      >
        {/* Title Bar */}
        <div 
          className="window-title-bar flex items-center justify-between px-1 py-0.5"
          style={{
            background: isActive 
              ? 'linear-gradient(90deg, hsl(var(--win98-title-active)), hsl(180, 40%, 25%))' 
              : 'linear-gradient(90deg, hsl(var(--win98-title-inactive)), hsl(0, 0%, 65%))',
            height: '18px',
            cursor: 'default',
          }}
        >
          {/* Icon and Title */}
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <span className="text-xs" style={{ fontSize: '14px' }}>{windowData.icon}</span>
            <span 
              className="text-xs font-bold truncate"
              style={{ 
                color: 'hsl(var(--win98-title-text))',
                fontSize: '11px',
                textShadow: 'none',
              }}
            >
              {windowData.title}
            </span>
          </div>

          {/* Window Controls */}
          <div className="flex gap-0.5">
            {/* Minimize Button */}
            {!isDialog && (
              <button
                className="win98-title-button"
                onClick={(e) => {
                  e.stopPropagation();
                  minimizeWindow(windowId);
                }}
                title="Minimize"
              >
                <div 
                  style={{
                    width: '6px',
                    height: '2px',
                    background: 'hsl(var(--win98-black))',
                    marginTop: '4px',
                  }}
                />
              </button>
            )}

            {/* Maximize Button (visual only for dialogs) */}
            {!isDialog && (
              <button
                className="win98-title-button"
                title={isMaximized ? 'Restore' : 'Maximize'}
                onClick={(e) => {
                  e.stopPropagation();
                  if (isMaximized) {
                    restoreWindow(windowId);
                  } else {
                    maximizeWindow(windowId);
                  }
                }}
              >
                <div 
                  style={{
                    width: '8px',
                    height: '8px',
                    border: '1px solid hsl(var(--win98-black))',
                    borderTop: '2px solid hsl(var(--win98-black))',
                    boxSizing: 'border-box',
                  }}
                />
              </button>
            )}

            {/* Close Button */}
            <button
              className="win98-title-button"
              onClick={(e) => {
                e.stopPropagation();
                closeWindow(windowId);
              }}
              title="Close"
            >
              <span 
                style={{ 
                  fontSize: '10px', 
                  fontWeight: 'bold',
                  color: 'hsl(var(--win98-black))',
                  lineHeight: 1,
                }}
              >
                ×
              </span>
            </button>
          </div>
        </div>

        {/* Menu Bar (optional) */}
        {showMenuBar && menuItems.length > 0 && (
          <div className="win98-menubar">
            {menuItems.map((item, index) => (
              <div key={index} className="win98-menu-item">
                <span style={{ textDecoration: 'underline' }}>{item.charAt(0)}</span>
                {item.slice(1)}
              </div>
            ))}
          </div>
        )}

        {/* Window Content */}
        <div 
          className="flex-1 overflow-hidden"
          style={{
            borderTop: showMenuBar ? 'none' : '1px solid hsl(var(--win98-white))',
          }}
        >
          {children}
        </div>
      </div>
    </Rnd>
  );
};

export default Window;
