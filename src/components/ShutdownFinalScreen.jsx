/**
 * Windows 98 Final Shutdown Screen
 * 
 * Shows "It is now safe to turn off your computer" with retro styling
 */

import React from 'react';

const ShutdownFinalScreen = ({ onRestart, onHire }) => {
  return (
    <div
      className="fixed inset-0 z-[99999] overflow-hidden"
      style={{
        backgroundColor: '#000000',
        fontFamily: "'Space Grotesk', 'Courier New', monospace",
      }}
    >
      {/* CRT Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          )`,
          backgroundSize: '100% 4px',
          zIndex: 10,
        }}
      />

      {/* Main Content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center p-4">
        <div className="flex flex-col max-w-[800px] w-full items-center justify-center space-y-12">
          {/* Headline Text */}
          <div className="flex flex-col items-center text-center space-y-2">
            <h1
              className="tracking-widest text-4xl md:text-5xl lg:text-6xl font-bold leading-tight px-4 pb-3 pt-6 uppercase select-none"
              style={{
                color: '#f2930d',
                textShadow: '0 0 5px #f2930d, 0 0 10px #f2930d',
              }}
            >
              It is now safe to turn off your computer.
            </h1>
            <p
              className="text-sm md:text-base font-mono tracking-widest"
              style={{
                color: 'rgba(242, 147, 13, 0.7)',
              }}
            >
              SYSTEM HALTED
            </p>
          </div>

          {/* Action Buttons Area */}
          <div className="flex flex-col sm:flex-row gap-6 mt-8 items-center justify-center">
            {/* Win98 Styled Button: Hire Asmit */}
            <button
              onClick={onHire}
              className="flex min-w-[140px] cursor-pointer items-center justify-center h-12 px-6 bg-[#c0c0c0] text-black text-base font-bold leading-normal active:bg-[#a0a0a0] transition-none border-2 border-[#dfdfdf]"
              style={{
                boxShadow: 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #808080, inset -2px -2px 0px 0px #ffffff';
                e.currentTarget.style.transform = 'translate(1px, 1px)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000';
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000';
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
                style={{ imageRendering: 'pixelated' }}
              >
                <rect x="3" y="7" width="18" height="12" rx="1" fill="#000" />
                <rect x="5" y="9" width="14" height="8" fill="#fff" />
                <rect x="7" y="11" width="10" height="1" fill="#000" />
                <rect x="7" y="13" width="8" height="1" fill="#000" />
                <rect x="7" y="15" width="10" height="1" fill="#000" />
              </svg>
              <span className="truncate">Hire Asmit</span>
            </button>

            {/* Win98 Styled Button: Restart System */}
            <button
              onClick={onRestart}
              className="flex min-w-[140px] cursor-pointer items-center justify-center h-12 px-6 bg-[#c0c0c0] text-black text-base font-bold leading-normal active:bg-[#a0a0a0] transition-none border-2 border-[#dfdfdf]"
              style={{
                boxShadow: 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000',
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #808080, inset -2px -2px 0px 0px #ffffff';
                e.currentTarget.style.transform = 'translate(1px, 1px)';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000';
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'inset 2px 2px 0px 0px #ffffff, inset -2px -2px 0px 0px #808080, 2px 2px 0px 0px #000000';
                e.currentTarget.style.transform = 'translate(0, 0)';
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
                style={{ imageRendering: 'pixelated' }}
              >
                <path
                  d="M12 4 L12 2 M12 22 L12 20 M20 12 L22 12 M2 12 L4 12 M17.66 6.34 L19.07 4.93 M4.93 19.07 L6.34 17.66 M17.66 17.66 L19.07 19.07 M4.93 4.93 L6.34 6.34"
                  stroke="#000"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="12" r="3" fill="none" stroke="#000" strokeWidth="2" />
              </svg>
              <span className="truncate">Restart System</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer decoration */}
      <div
        className="absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10"
        style={{
          opacity: 0.2,
        }}
      >
        <span
          className="font-bold text-xl"
          style={{
            color: '#ffffff',
            letterSpacing: '0.5em',
          }}
        >
          ASMIT-VISION
        </span>
      </div>
    </div>
  );
};

export default ShutdownFinalScreen;
