/**
 * Windows 98 Shutdown Screen Component
 * 
 * Orchestrates shutdown animation and final screen
 */

import React, { useState, useEffect } from 'react';
import { useUIStore } from '../store/uiStore';
import ShutdownAnimation from './ShutdownAnimation';
import ShutdownFinalScreen from './ShutdownFinalScreen';

const ShutdownScreen = () => {
  const { shuttingDown } = useUIStore();
  const [showAnimation, setShowAnimation] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);

  useEffect(() => {
    if (shuttingDown) {
      // Show animation first
      setShowAnimation(true);
      
      // After 2 seconds, show final screen
      const timer = setTimeout(() => {
        setShowAnimation(false);
        setShowFinalScreen(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
      setShowFinalScreen(false);
    }
  }, [shuttingDown]);

  const handleRestart = () => {
    window.location.reload();
  };

  const handleHire = () => {
    // Open contact/linkedin in new tab
    window.open('https://www.linkedin.com/in/asmitsaw', '_blank');
  };

  if (!shuttingDown) return null;

  return (
    <>
      {showAnimation && <ShutdownAnimation />}
      {showFinalScreen && (
        <ShutdownFinalScreen
          onRestart={handleRestart}
          onHire={handleHire}
        />
      )}
    </>
  );
};

export default ShutdownScreen;
