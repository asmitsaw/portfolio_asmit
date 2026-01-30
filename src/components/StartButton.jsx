/**
 * Windows 98 Start Button
 * 
 * Classic Start button that opens the start menu
 */

import { useUIStore } from '../store/uiStore';

const WindowsLogo = () => (
  <svg width="16" height="14" viewBox="0 0 16 14" style={{ imageRendering: 'pixelated' }}>
    <rect x="0" y="0" width="7" height="6" fill="#FF0000"/>
    <rect x="8" y="0" width="7" height="6" fill="#00FF00"/>
    <rect x="0" y="7" width="7" height="6" fill="#0000FF"/>
    <rect x="8" y="7" width="7" height="6" fill="#FFFF00"/>
  </svg>
);

export default function StartButton() {
  const { startOpen, toggleStart } = useUIStore();

  return (
    <button
      className={`win98-start-button relative ${startOpen ? 'active' : ''}`}
      onClick={toggleStart}
    >
      <WindowsLogo />
      <span>Start</span>
    </button>
  );
}
