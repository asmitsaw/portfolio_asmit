/**
 * Windows 98 Desktop Component
 * 
 * Main desktop area with:
 * - Classic teal background
 * - Desktop icons
 * - CRT effect overlay
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';
import wallpaper from '../images/wallpaper.png';
import propertiesIcon from '../images/system-settings-svgrepo-com (2).svg';

// Default desktop icon data (order chosen for better layout)
const DESKTOP_ICONS = [
  { id: 'mycomputer', label: 'My Computer', icon: 'mycomputer' },
  { id: 'contact', label: 'Contact', icon: 'mail' },
  { id: 'explorer', label: 'Links', icon: 'ie' },
  { id: 'resume', label: 'About Me', icon: 'notepad' },
  { id: 'cmd', label: 'Command Prompt', icon: 'cmd' },
  { id: 'properties', label: 'Properties', icon: 'properties' },
];

// SVG Icons for Windows 98 style
const IconSVG = ({ type }) => {
  switch (type) {
    case 'mycomputer':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Monitor */}
          <rect x="2" y="2" width="28" height="20" fill="#C0C0C0" stroke="#000" strokeWidth="1" />
          <rect x="4" y="4" width="24" height="14" fill="#000080" />
          <rect x="6" y="6" width="20" height="10" fill="#008080" />
          {/* Screen content */}
          <rect x="8" y="8" width="4" height="4" fill="#FFFF00" />
          <rect x="14" y="8" width="4" height="4" fill="#00FF00" />
          {/* Stand */}
          <rect x="12" y="22" width="8" height="2" fill="#808080" />
          <rect x="10" y="24" width="12" height="4" fill="#C0C0C0" stroke="#000" strokeWidth="1" />
          {/* Keyboard */}
          <rect x="4" y="28" width="24" height="3" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
        </svg>
      );

    case 'ie':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Globe */}
          <circle cx="16" cy="16" r="13" fill="#0066CC" stroke="#000" strokeWidth="1" />
          {/* Grid lines */}
          <ellipse cx="16" cy="16" rx="13" ry="5" fill="none" stroke="#87CEEB" strokeWidth="1" />
          <ellipse cx="16" cy="16" rx="5" ry="13" fill="none" stroke="#87CEEB" strokeWidth="1" />
          <line x1="3" y1="16" x2="29" y2="16" stroke="#87CEEB" strokeWidth="1" />
          <line x1="16" y1="3" x2="16" y2="29" stroke="#87CEEB" strokeWidth="1" />
          {/* E letter orbit */}
          <ellipse cx="16" cy="16" rx="14" ry="8" fill="none" stroke="#FFD700" strokeWidth="2" transform="rotate(-20 16 16)" />
          {/* E letter */}
          <text x="12" y="21" fill="#FFFFFF" fontSize="14" fontWeight="bold" fontFamily="Arial">e</text>
        </svg>
      );
    case 'recycle':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Bin body */}
          <path d="M6,8 L8,28 L24,28 L26,8 Z" fill="#C0C0C0" stroke="#000" strokeWidth="1" />
          {/* Bin lid */}
          <rect x="4" y="4" width="24" height="4" fill="#808080" stroke="#000" strokeWidth="1" />
          <rect x="12" y="2" width="8" height="2" fill="#808080" stroke="#000" strokeWidth="1" />
          {/* Recycle arrows */}
          <path d="M10,14 L14,18 L10,22" fill="none" stroke="#008000" strokeWidth="2" />
          <path d="M16,12 L20,16 L16,20" fill="none" stroke="#008000" strokeWidth="2" />
          <path d="M22,14 L18,18 L22,22" fill="none" stroke="#008000" strokeWidth="2" />
        </svg>
      );
    case 'properties':
      return (
        <img
          src={propertiesIcon}
          alt="Properties"
          width={40}
          height={40}
          style={{ imageRendering: 'pixelated', display: 'block' }}
        />
      );
    case 'notepad':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Document */}
          <rect x="4" y="2" width="22" height="28" fill="#FFFFFF" stroke="#000" strokeWidth="1" />
          {/* Blue header */}
          <rect x="4" y="2" width="22" height="6" fill="#000080" />
          {/* Lines */}
          <line x1="6" y1="12" x2="24" y2="12" stroke="#000" strokeWidth="1" />
          <line x1="6" y1="16" x2="24" y2="16" stroke="#000" strokeWidth="1" />
          <line x1="6" y1="20" x2="24" y2="20" stroke="#000" strokeWidth="1" />
          <line x1="6" y1="24" x2="18" y2="24" stroke="#000" strokeWidth="1" />
          {/* Pencil */}
          <rect x="22" y="18" width="8" height="3" fill="#FFFF00" stroke="#000" strokeWidth="1" transform="rotate(-45 26 20)" />
          <polygon points="20,28 22,24 24,26" fill="#FFD700" stroke="#000" strokeWidth="1" />
        </svg>
      );

    case 'cmd':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Window */}
          <rect x="2" y="2" width="28" height="28" fill="#000000" stroke="#C0C0C0" strokeWidth="2" />
          {/* Title bar */}
          <rect x="2" y="2" width="28" height="4" fill="#000080" />
          {/* Prompt text */}
          <text x="4" y="14" fill="#C0C0C0" fontSize="8" fontFamily="monospace">C:\&gt;_</text>
          <text x="4" y="22" fill="#C0C0C0" fontSize="8" fontFamily="monospace">dir</text>
        </svg>
      );
    case 'mail':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Envelope */}
          <rect x="2" y="6" width="28" height="20" fill="#FFFFCC" stroke="#000" strokeWidth="1" />
          {/* Flap */}
          <polygon points="2,6 16,16 30,6" fill="#FFFF99" stroke="#000" strokeWidth="1" />
          {/* Lines */}
          <line x1="6" y1="18" x2="14" y2="18" stroke="#0000FF" strokeWidth="1" />
          <line x1="6" y1="21" x2="12" y2="21" stroke="#0000FF" strokeWidth="1" />
        </svg>
      );
    case 'folder':
      return (
        <svg width="40" height="40" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
          {/* Folder tab */}
          <path d="M2,8 L2,6 L12,6 L14,8 Z" fill="#FFCC00" stroke="#000" strokeWidth="1" />
          {/* Folder body */}
          <rect x="2" y="8" width="28" height="20" fill="#FFCC00" stroke="#000" strokeWidth="1" />
          {/* Shadow */}
          <rect x="4" y="10" width="24" height="16" fill="#FFE066" />
        </svg>
      );
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 32 32">
          <rect x="4" y="4" width="24" height="24" fill="#C0C0C0" stroke="#000" />
        </svg>
      );
  }
};

const DesktopIcon = ({ icon, label, isSelected, onClick, onDoubleClick, draggable, onDragStart, onDragOver, onDrop, onDragEnd }) => {
  return (
    <div
      className={`win98-desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <div className="win98-desktop-icon-image">
        <IconSVG type={icon} />
      </div>
      <span className="win98-desktop-icon-label">{label}</span>
    </div>
  );
};

const Desktop = ({ children }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const { openWindow } = useWindowStore();

  // Icons state (persisted order)
  const [icons, setIcons] = useState(() => {
    try {
      const raw = localStorage.getItem('desktop_icons');
      if (raw) return JSON.parse(raw);
    } catch (e) {
      // ignore
    }
    return DESKTOP_ICONS;
  });

  const [draggedId, setDraggedId] = useState(null);

  // Handle icon click
  const handleIconClick = useCallback((iconId, e) => {
    e.stopPropagation();
    setSelectedIcon(iconId);
  }, []);

  // Drag handlers for rearranging icons
  const handleDragStart = useCallback((e, id) => {
    e.dataTransfer.effectAllowed = 'move';
    setDraggedId(id);
  }, []);

  const handleDragOverIcon = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDropOnIcon = useCallback((e, targetId) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    setIcons((prev) => {
      const newArr = [...prev];
      const from = newArr.findIndex((i) => i.id === draggedId);
      const to = newArr.findIndex((i) => i.id === targetId);
      if (from === -1 || to === -1) return prev;
      const [item] = newArr.splice(from, 1);
      newArr.splice(to, 0, item);
      try { localStorage.setItem('desktop_icons', JSON.stringify(newArr)); } catch (e) { }
      return newArr;
    });

    setDraggedId(null);
  }, [draggedId]);

  const handleDropOnContainer = useCallback((e) => {
    e.preventDefault();
    if (!draggedId) return;
    setIcons((prev) => {
      const newArr = prev.filter((i) => i.id !== draggedId);
      const moved = prev.find((i) => i.id === draggedId);
      if (moved) newArr.push(moved);
      try { localStorage.setItem('desktop_icons', JSON.stringify(newArr)); } catch (e) { }
      return newArr;
    });
    setDraggedId(null);
  }, [draggedId]);

  // Split into two columns filled top-to-bottom
  const mid = Math.ceil(icons.length / 1.5);
  const leftCol = icons.slice(0, mid);
  const rightCol = icons.slice(mid);

  // Handle icon double-click
  const handleIconDoubleClick = useCallback((iconId) => {
    // Map icon IDs to window IDs
    const windowMap = {
      mycomputer: 'mycomputer',
      explorer: 'explorer',

      properties: 'system',
      resume: 'resume',
      cmd: 'cmd',
      contact: 'contact',




    };

    const windowId = windowMap[iconId];
    if (windowId) {
      openWindow({ type: windowId });
    }
  }, [openWindow]);

  // Handle desktop click to deselect
  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
  }, []);

  // Handle keyboard shortcuts
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

  return (
    <div
      className="fixed inset-0 no-select"
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 2%',
        backgroundRepeat: 'no-repeat',
        paddingBottom: '30px', // Space for taskbar
      }}
      onClick={handleDesktopClick}
    >
      {/* CRT Scanline Effect (subtle) */}
      <div className="crt-effect" />

      {/* Desktop Icons (two columns filled top-to-bottom) */}
      <div
        className="absolute top-1 left-2 flex gap-6"
        style={{ zIndex: 1 }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnContainer}
      >
        <div className="flex flex-col gap-3">
          {leftCol.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              isSelected={selectedIcon === icon.id}
              onClick={(e) => handleIconClick(icon.id, e)}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, icon.id)}
              onDragOver={handleDragOverIcon}
              onDrop={(e) => handleDropOnIcon(e, icon.id)}
              onDragEnd={() => setDraggedId(null)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          {rightCol.map((icon) => (
            <DesktopIcon
              key={icon.id}
              icon={icon.icon}
              label={icon.label}
              isSelected={selectedIcon === icon.id}
              onClick={(e) => handleIconClick(icon.id, e)}
              onDoubleClick={() => handleIconDoubleClick(icon.id)}
              draggable
              onDragStart={(e) => handleDragStart(e, icon.id)}
              onDragOver={handleDragOverIcon}
              onDrop={(e) => handleDropOnIcon(e, icon.id)}
              onDragEnd={() => setDraggedId(null)}
            />
          ))}
        </div>
      </div>

      {/* Windows Container */}
      <div
        className="absolute inset-0"
        style={{
          bottom: '30px',
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Desktop;
