/**
 * Windows 98 Shutdown Animation Component
 * 
 * Shows "Windows is shutting down..." with dither effect
 */

import React from 'react';

const ShutdownAnimation = () => {
  return (
    <div
      className="fixed inset-0 z-[99998]"
      style={{
        backgroundColor: '#008080',
      }}
    >
      {/* Dither Pattern Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: '#a0a0a0',
          backgroundImage: `
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000),
            linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)
          `,
          backgroundPosition: '0 0, 2px 2px',
          backgroundSize: '4px 4px',
          opacity: 0.6,
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-20 flex h-full items-center justify-center p-4">
        {/* Message Box */}
        <div
          className="max-w-[400px] w-full"
          style={{
            background: '#c0c0c0',
            boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff',
            padding: '2px',
          }}
        >
          <div
            style={{
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
            }}
          >
            <div className="flex flex-col items-center gap-4 py-6">
              {/* Computer Icon */}
              <div className="h-12 w-12 flex items-center justify-center">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ color: '#808080' }}
                >
                  <rect x="2" y="4" width="20" height="14" rx="1" fill="currentColor" />
                  <rect x="4" y="6" width="16" height="10" fill="#000080" />
                  <rect x="6" y="8" width="12" height="6" fill="#008080" />
                  <rect x="8" y="10" width="2" height="2" fill="#FFFF00" />
                  <rect x="11" y="10" width="2" height="2" fill="#00FF00" />
                  <rect x="9" y="20" width="6" height="2" fill="currentColor" />
                  <rect x="7" y="22" width="10" height="1" fill="currentColor" />
                </svg>
              </div>

              {/* Shutdown Message */}
              <p
                className="text-black text-lg font-bold leading-tight tracking-tight text-center"
                style={{
                  fontFamily: "'Courier New', monospace",
                }}
              >
                Windows is shutting down...
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Taskbar (Grayed Out) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 flex items-center px-1"
        style={{
          background: '#c0c0c0',
          borderTop: '2px solid #dfdfdf',
          filter: 'grayscale(100%) contrast(80%) brightness(90%)',
          zIndex: 20,
        }}
      >
        {/* Start Button */}
        <div
          className="flex items-center h-full px-2 m-1"
          style={{
            border: '2px solid',
            borderRightColor: '#808080',
            borderBottomColor: '#808080',
            borderTopColor: '#ffffff',
            borderLeftColor: '#ffffff',
            background: '#c0c0c0',
            opacity: 0.5,
          }}
        >
          <div className="flex items-center gap-1">
            <svg width="16" height="14" viewBox="0 0 16 14" style={{ imageRendering: 'pixelated' }}>
              <rect x="0" y="0" width="7" height="6" fill="#FF0000"/>
              <rect x="8" y="0" width="7" height="6" fill="#00FF00"/>
              <rect x="0" y="7" width="7" height="6" fill="#0000FF"/>
              <rect x="8" y="7" width="7" height="6" fill="#FFFF00"/>
            </svg>
            <span className="font-bold text-sm tracking-wide">Start</span>
          </div>
        </div>

        {/* System Tray */}
        <div
          className="ml-auto flex items-center gap-2 px-2 h-[28px]"
          style={{
            border: '2px solid',
            borderLeftColor: '#808080',
            borderTopColor: '#808080',
            borderRightColor: '#ffffff',
            borderBottomColor: '#ffffff',
            background: '#c0c0c0',
            opacity: 0.5,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" style={{ imageRendering: 'pixelated' }}>
            <polygon points="2,5 2,9 5,9 9,12 9,2 5,5" fill="#000"/>
            <path d="M10,4 Q12,7 10,10" fill="none" stroke="#000" strokeWidth="1"/>
          </svg>
          <span className="text-xs">4:20 PM</span>
        </div>
      </div>
    </div>
  );
};

export default ShutdownAnimation;
