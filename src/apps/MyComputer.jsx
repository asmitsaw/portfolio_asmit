/**
 * My Computer App
 * 
 * Windows 98 style file explorer showing drives and folders
 */

import React from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const MyComputer = ({ windowId = 'mycomputer' }) => {
  const { openWindow } = useWindowStore();
  const menuItems = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'];

  // Items to display
  const items = [
    {
      id: 'c-drive',
      label: '(C:)',
      sublabel: 'Local Disk',
      icon: 'hard-drive',
      // Open \"About Me\" (Resume) when double-clicked
      action: () => openWindow({ type: 'resume' }),
    },
    {
      id: 'd-drive',
      label: '(D:)',
      sublabel: 'Projects',
      icon: 'hard-drive',
      // Open Projects Explorer when double-clicked
      action: () => openWindow({ type: 'projects' }),
    },
    {
      id: 'floppy',
      label: '(A:)',
      sublabel: '3½ Floppy',
      icon: 'floppy',
      // Show insert disk dialog
      action: () => openWindow({ type: 'floppy' }),
    },

    {
      id: 'control',
      label: 'Control Panel',
      sublabel: '',
      icon: 'control',
      action: () => openWindow({ type: 'system' }),
    },

    {
      id: 'dialup',
      label: 'Networking',
      sublabel: '',
      icon: 'network',
      action: () => openWindow({ type: 'explorer' }),
    },
  ];

  // Icon component
  const ItemIcon = ({ type }) => {
    switch (type) {
      case 'hard-drive':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="8" width="28" height="16" fill="#C0C0C0" stroke="#000" strokeWidth="1" />
            <rect x="4" y="10" width="24" height="10" fill="#808080" />
            <rect x="6" y="12" width="8" height="6" fill="#00FF00" />
            <circle cx="24" cy="18" r="2" fill="#FF0000" />
          </svg>
        );
      case 'floppy':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="2" width="24" height="28" fill="#333" stroke="#000" strokeWidth="1" />
            <rect x="8" y="2" width="16" height="10" fill="#C0C0C0" />
            <rect x="10" y="4" width="8" height="6" fill="#808080" />
            <rect x="8" y="18" width="16" height="10" fill="#FFFFCC" />
          </svg>
        );
      case 'cd':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="10" width="28" height="12" fill="#E0E0E0" stroke="#000" strokeWidth="1" />
            <ellipse cx="16" cy="16" rx="10" ry="4" fill="#C0C0C0" />
            <ellipse cx="16" cy="16" rx="3" ry="1.5" fill="#FFF" />
            <rect x="24" y="12" width="4" height="2" fill="#00FF00" />
          </svg>
        );
      case 'control':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="2" y="2" width="28" height="28" fill="#C0C0C0" stroke="#000" strokeWidth="1" />
            <rect x="4" y="4" width="10" height="10" fill="#0000FF" />
            <rect x="18" y="4" width="10" height="10" fill="#FF0000" />
            <rect x="4" y="18" width="10" height="10" fill="#00FF00" />
            <rect x="18" y="18" width="10" height="10" fill="#FFFF00" />
          </svg>
        );
      case 'printer':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="6" y="2" width="20" height="8" fill="#FFFFCC" stroke="#000" strokeWidth="1" />
            <rect x="2" y="10" width="28" height="14" fill="#E0E0E0" stroke="#000" strokeWidth="1" />
            <rect x="6" y="24" width="20" height="6" fill="#FFF" stroke="#000" strokeWidth="1" />
            <circle cx="24" cy="14" r="2" fill="#00FF00" />
          </svg>
        );
      case 'network':
        return (
          <svg width="32" height="32" viewBox="0 0 32 32" style={{ imageRendering: 'pixelated' }}>
            <rect x="4" y="8" width="10" height="8" fill="#0000FF" stroke="#000" strokeWidth="1" />
            <rect x="18" y="8" width="10" height="8" fill="#0000FF" stroke="#000" strokeWidth="1" />
            <line x1="14" y1="12" x2="18" y2="12" stroke="#000" strokeWidth="2" />
            <rect x="11" y="20" width="10" height="8" fill="#008000" stroke="#000" strokeWidth="1" />
            <line x1="9" y1="16" x2="16" y2="20" stroke="#000" strokeWidth="1" />
            <line x1="23" y1="16" x2="16" y2="20" stroke="#000" strokeWidth="1" />
          </svg>
        );
      default:
        return (
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="4" y="4" width="24" height="24" fill="#C0C0C0" stroke="#000" />
          </svg>
        );
    }
  };

  return (
    <Window
      windowId={windowId}
      showMenuBar={true}
      menuItems={menuItems}
    >
      <div className="flex flex-col h-full">
        {/* Toolbar */}
        <div className="win98-toolbar">
          <button className="win98-toolbar-button" title="Back" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="10,3 4,8 10,13" fill="#808080" />
            </svg>
          </button>

          <button className="win98-toolbar-button" title="Forward" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="6,3 12,8 6,13" fill="#808080" />
            </svg>
          </button>

          <button className="win98-toolbar-button" title="Up">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="8,3 3,10 13,10" fill="#808080" />
            </svg>
          </button>

          <div className="win98-divider" />

          <button className="win98-toolbar-button" title="Cut">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M4,2 L8,8 L4,14 M12,2 L8,8 L12,14" fill="none" stroke="#000" strokeWidth="1.5" />
            </svg>
          </button>

          <button className="win98-toolbar-button" title="Copy">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="2" y="2" width="8" height="10" fill="#FFFFCC" stroke="#000" />
              <rect x="6" y="4" width="8" height="10" fill="#FFFFCC" stroke="#000" />
            </svg>
          </button>

          <button className="win98-toolbar-button" title="Paste">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="4" y="4" width="10" height="10" fill="#FFFFCC" stroke="#000" />
              <rect x="6" y="2" width="6" height="3" fill="#C0C0C0" stroke="#000" />
            </svg>
          </button>

          <div className="win98-divider" />

          <button className="win98-toolbar-button" title="Views">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <rect x="2" y="2" width="5" height="5" fill="#000" />
              <rect x="9" y="2" width="5" height="5" fill="#000" />
              <rect x="2" y="9" width="5" height="5" fill="#000" />
              <rect x="9" y="9" width="5" height="5" fill="#000" />
            </svg>
          </button>
        </div>

        {/* Address Bar */}
        <div
          className="flex items-center gap-2 px-2 py-1"
          style={{
            background: 'hsl(var(--win98-gray))',
            borderBottom: '1px solid hsl(var(--win98-dark-gray))',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Address</span>
          <div
            className="win98-input flex-1 flex items-center"
            style={{ height: '20px' }}
          >
            <span style={{ fontSize: '14px', marginRight: '4px' }}>🖥️</span>
            <span style={{ fontSize: '11px' }}>My Computer</span>
          </div>
        </div>

        {/* Content Area */}
        <div
          className="flex-1 overflow-auto p-2"
          style={{
            background: 'hsl(var(--win98-white))',
          }}
        >
          <div
            className="flex flex-wrap gap-4"
            style={{ alignContent: 'flex-start' }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center cursor-pointer p-1"
                style={{ width: '75px' }}
                onDoubleClick={() => item.action && item.action()}
              >
                <ItemIcon type={item.icon} />
                <div
                  className="text-center mt-1"
                  style={{ fontSize: '11px', lineHeight: '1.2' }}
                >
                  <div>{item.sublabel || item.label}</div>
                  {item.sublabel && (
                    <div style={{ color: '#666' }}>{item.label}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="win98-statusbar flex">
          <div className="win98-statusbar-panel flex-1">
            {items.length} object(s)
          </div>
          <div className="win98-statusbar-panel" style={{ width: '120px' }}>
            My Computer
          </div>
        </div>
      </div>
    </Window>
  );
};

export default MyComputer;
