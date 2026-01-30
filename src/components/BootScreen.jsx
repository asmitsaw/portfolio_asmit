/**
 * Windows 98 Boot Screen Component
 * 
 * Shows authentic Windows 98 boot animation on initial load
 * Displays "Starting Windows 98..." with progress bar
 */

import React, { useState, useEffect } from 'react';
import win98Logo from '../images/ezgif.com-video-to-gif-converter.gif';
import startupSound from '../images/win95.mp3';

const BootScreen = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Play startup sound
    const audio = new Audio(startupSound);
    audio.volume = 0.7; // Set volume to 50%
    audio.play().catch(err => {
      // Browser might block autoplay, that's okay
      console.log('Audio autoplay prevented:', err);
    });

    // Show progress bar after a brief delay
    const progressTimer = setTimeout(() => {
      setShowProgress(true);
    }, 300);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    // Complete boot after animation
    const bootTimer = setTimeout(() => {
      onBootComplete();
    }, 1800);

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(bootTimer);
      clearInterval(progressInterval);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [onBootComplete]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center no-select"
      style={{ backgroundColor: '#000080' }}
    >
      {/* Windows 98 Logo Area */}
      <div className="flex flex-col items-center mb-16">
        {/* Windows 98 Logo */}
        <img
          src={win98Logo}
          alt="Microsoft Windows 98"
          className="mb-4"
          style={{
            width: 260,
            height: 'auto',
            imageRendering: 'pixelated',
          }}
        />

        {/* Windows 98 Text */}
        <div
          className="text-4xl font-bold tracking-wide"
          style={{
            color: '#FFFFFF',
            fontFamily: 'Arial, sans-serif',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          Microsoft<sup style={{ fontSize: '14px', verticalAlign: 'super' }}>®</sup> Windows 98
        </div>
      </div>

      {/* Starting Text */}
      <div
        className="text-lg mb-8"
        style={{
          color: '#FFFFFF',
          fontFamily: 'MS Sans Serif, Tahoma, sans-serif'
        }}
      >
        Starting Windows 98...
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <div className="w-64">
          <div
            className="h-4 border-2"
            style={{
              backgroundColor: '#000000',
              borderColor: '#808080 #FFFFFF #FFFFFF #808080'
            }}
          >
            <div
              className="h-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: 'repeating-linear-gradient(90deg, #000080, #000080 8px, #000000 8px, #000000 10px)'
              }}
            />
          </div>
        </div>
      )}

      {/* Microsoft Copyright */}
      <div
        className="absolute bottom-8 text-xs"
        style={{ color: '#808080' }}
      >
        Copyright © Microsoft Corporation 1981-1998
      </div>
    </div>
  );
};

export default BootScreen;
