/**
 * Windows 98 Start Menu Component
 * 
 * Authentic Start Menu with exact Windows 98 structure and behavior
 * Opens above taskbar, aligned to bottom-left
 */

import React, { useEffect, useRef } from 'react';
import { useUIStore } from '../store/uiStore';
import { useWindowStore } from '../store/windowStore';

const StartMenu = () => {
  const { 
    startOpen, 
    activeSubmenu, 
    closeStart, 
    setActiveSubmenu,
    openShutdownDialog,
    openRunDialog,
    openHelpDialog,
    logOff,
  } = useUIStore();
  
  const { openWindow } = useWindowStore();
  
  // Wrapper functions that open windows and close menu
  const handleOpenWindow = (windowId) => {
    openWindow(windowId);
    closeStart();
  };
  
  const handleOpenShutdown = () => {
    openShutdownDialog();
    openWindow('shutdown');
  };
  
  const handleOpenRun = () => {
    openRunDialog();
    openWindow('run');
  };
  
  const handleOpenHelp = () => {
    openHelpDialog();
    openWindow('help');
  };
  const menuRef = useRef(null);
  const submenuRefs = {
    programs: useRef(null),
    settings: useRef(null),
    find: useRef(null),
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!startOpen) return;
      
      // Check if click is in main menu
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      
      // Check if click is in any submenu
      const clickedInSubmenu = Object.values(submenuRefs).some(
        ref => ref.current && ref.current.contains(e.target)
      );
      
      // Check if click is in nested submenu
      const nestedSubmenu = document.querySelector('[data-nested-submenu]');
      const clickedInNestedSubmenu = nestedSubmenu && nestedSubmenu.contains(e.target);
      
      if (!clickedInSubmenu && !clickedInNestedSubmenu) {
        closeStart();
      }
    };

    if (startOpen) {
      // Use a small delay to allow menu to render
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [startOpen, closeStart]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && startOpen) {
        closeStart();
      }
    };

    if (startOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [startOpen, closeStart]);

  if (!startOpen) return null;

  const handleMenuItemClick = (action) => {
    if (action) {
      action();
    }
    closeStart();
  };

  const handleSubmenuHover = (submenu) => {
    setActiveSubmenu(submenu);
  };

  return (
    <>
      {/* Main Start Menu */}
      <div
        ref={menuRef}
        className="win98-start-menu"
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '2px',
          width: '228px', // 28px blue bar + 200px menu
          backgroundColor: '#C0C0C0',
          border: '2px solid',
          borderTopColor: '#FFFFFF',
          borderLeftColor: '#FFFFFF',
          borderRightColor: '#808080',
          borderBottomColor: '#808080',
          zIndex: 10000,
          fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
          fontSize: '11px',
          boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
          display: 'flex',
        }}
      >
        {/* Left Blue Bar with Windows 98 Text */}
        <div
          style={{
            width: '28px',
            background: 'linear-gradient(to top,rgb(179, 235, 255) 0%, #7EC8E3 20%, #000080 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px 0',
          }}
        >
          <div
            style={{
              color: '#000000',
              fontSize: '15px',
              fontWeight: 'bold',
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              transform: 'rotate(180deg)',
              letterSpacing: '1px',
            }}
          >
            Windows 98
          </div>
        </div>

        {/* Menu Items */}
        <div style={{ flex: 1 }}>
          {/* Programs */}
          <div data-menu-item>
            <MenuItem
              label="Programs"
              icon="programs"
              hasSubmenu
              onMouseEnter={() => handleSubmenuHover('programs')}
              onClick={() => handleSubmenuHover('programs')}
            />
          </div>

          {/* Documents */}
          <div data-menu-item>
            <MenuItem
              label="Documents"
              icon="folder"
              onClick={() => handleOpenWindow('resume')}
            />
          </div>

          {/* Settings */}
          <div data-menu-item>
            <MenuItem
              label="Settings"
              icon="settings"
              hasSubmenu
              onMouseEnter={() => handleSubmenuHover('settings')}
              onClick={() => handleSubmenuHover('settings')}
            />
          </div>

          {/* Find */}
          <div data-menu-item>
            <MenuItem
              label="Find"
              icon="find"
              hasSubmenu
              onMouseEnter={() => handleSubmenuHover('find')}
              onClick={() => handleSubmenuHover('find')}
            />
          </div>

          {/* Help */}
          <div data-menu-item>
            <MenuItem
              label="Help"
              icon="help"
              onClick={handleOpenHelp}
            />
          </div>

          {/* Run... */}
          <div data-menu-item>
            <MenuItem
              label="Run..."
              icon="run"
              onClick={handleOpenRun}
            />
          </div>

          {/* Divider */}
          <div
            style={{
              height: '2px',
              borderTop: '1px solid #808080',
              borderBottom: '1px solid #FFFFFF',
              margin: '2px 0',
            }}
          />

         

          {/* Shut Down... */}
          <div data-menu-item>
            <MenuItem
              label="Shut Down..."
              icon="shutdown"
              onClick={handleOpenShutdown}
            />
          </div>
        </div>
      </div>

      {/* Programs Submenu */}
      {activeSubmenu === 'programs' && (
        <Submenu
          ref={submenuRefs.programs}
          label="Programs"
          parentMenuRef={menuRef}
          itemIndex={0}
          items={[
            {
              label: 'Resume (WordPad)',
              action: () => handleOpenWindow('resume'),
            },
            {
              label: 'Internet Explorer',
              action: () => handleOpenWindow('explorer'),
            },
            {
              label: 'Command Prompt',
              action: () => handleOpenWindow('cmd'),
            },
            {
              label: 'Projects Explorer',
              action: () => handleOpenWindow('projects'),
            },
            {
              label: 'Accessories',
              hasSubmenu: true,
              submenuItems: [
                { label: 'Resume (WordPad)', action: () => handleOpenWindow('resume') },
                { label: 'Calculator', action: null }, // Visual only
              ],
            },
            {
              label: 'Internet',
              hasSubmenu: true,
              submenuItems: [
                { label: 'Internet Explorer', action: () => handleOpenWindow('explorer') },
              ],
            },
            {
              label: 'System Tools',
              hasSubmenu: true,
              submenuItems: [
                { label: 'Command Prompt', action: () => handleOpenWindow('cmd') },
                { label: 'System Properties', action: () => handleOpenWindow('system') },
              ],
            },
          ]}
          onItemClick={(action) => {
            if (action) {
              handleMenuItemClick(action);
            }
          }}
        />
      )}

      {/* Settings Submenu */}
      {activeSubmenu === 'settings' && (
        <Submenu
          ref={submenuRefs.settings}
          label="Settings"
          parentMenuRef={menuRef}
          itemIndex={2}
          items={[
            {
              label: 'Control Panel',
              action: () => handleOpenWindow('system'),
            },
          ]}
          onItemClick={(action) => {
            if (action) {
              action();
            }
            closeStart();
          }}
        />
      )}

      {/* Find Submenu */}
      {activeSubmenu === 'find' && (
        <Submenu
          ref={submenuRefs.find}
          label="Find"
          parentMenuRef={menuRef}
          itemIndex={3}
          items={[
            {
              label: 'Files or Folders...',
              action: () => {
                alert('Find functionality is not implemented in this portfolio.');
              },
            },
            {
              label: 'Computer...',
              action: () => {
                alert('Find Computer functionality is not implemented in this portfolio.');
              },
            },
          ]}
          onItemClick={(action) => {
            if (action) {
              handleMenuItemClick(action);
            }
          }}
        />
      )}
    </>
  );
};

// Menu Icon Component
const MenuIcon = ({ type }) => {
  const iconSize = 16;
  
  switch (type) {
    case 'programs':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <rect x="2" y="2" width="12" height="10" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
          <rect x="3" y="3" width="10" height="8" fill="#000080"/>
          <rect x="4" y="4" width="8" height="6" fill="#008080"/>
        </svg>
      );
    case 'folder':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <path d="M1,4 L1,3 L6,3 L7,4 Z" fill="#FFCC00" stroke="#000" strokeWidth="0.5"/>
          <rect x="1" y="4" width="14" height="10" fill="#FFCC00" stroke="#000" strokeWidth="0.5"/>
        </svg>
      );
    case 'settings':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <circle cx="8" cy="8" r="6" fill="#C0C0C0" stroke="#000" strokeWidth="1"/>
          <circle cx="8" cy="8" r="3" fill="#000080"/>
          <rect x="7" y="1" width="2" height="3" fill="#000"/>
          <rect x="7" y="12" width="2" height="3" fill="#000"/>
          <rect x="1" y="7" width="3" height="2" fill="#000"/>
          <rect x="12" y="7" width="3" height="2" fill="#000"/>
        </svg>
      );
    case 'find':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <circle cx="7" cy="7" r="4" fill="none" stroke="#000" strokeWidth="1.5"/>
          <line x1="10" y1="10" x2="14" y2="14" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'help':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <circle cx="8" cy="8" r="6" fill="#000080" stroke="#000" strokeWidth="1"/>
          <text x="8" y="11" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontFamily="Arial" fontWeight="bold">?</text>
        </svg>
      );
    case 'run':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <polygon points="4,2 4,14 12,8" fill="#000080" stroke="#000" strokeWidth="0.5"/>
        </svg>
      );
    case 'logoff':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <circle cx="6" cy="5" r="2.5" fill="#C0C0C0" stroke="#000" strokeWidth="0.5"/>
          <path d="M2,12 Q2,9 6,9 Q10,9 10,12" fill="none" stroke="#000" strokeWidth="1"/>
          <circle cx="12" cy="5" r="2.5" fill="#C0C0C0" stroke="#000" strokeWidth="0.5"/>
          <path d="M8,12 Q8,9 12,9 Q16,9 16,12" fill="none" stroke="#000" strokeWidth="1"/>
        </svg>
      );
    case 'shutdown':
      return (
        <svg width={iconSize} height={iconSize} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
          <circle cx="8" cy="8" r="5" fill="none" stroke="#000" strokeWidth="1.5"/>
          <line x1="8" y1="3" x2="8" y2="6" stroke="#000" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    default:
      return null;
  }
};

// Menu Item Component
const MenuItem = ({ label, icon, hasSubmenu = false, onClick, onMouseEnter }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        if (onMouseEnter) onMouseEnter();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{
        padding: '2px 4px',
        cursor: 'pointer',
        backgroundColor: isHovered ? '#000080' : 'transparent',
        color: isHovered ? '#FFFFFF' : '#000000',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', width: '16px', height: '16px' }}>
          <MenuIcon type={icon} />
        </span>
      )}
      <span style={{ flex: 1 }}>{label}</span>
      {hasSubmenu && (
        <span style={{ fontSize: '8px', marginLeft: '4px' }}>▶</span>
      )}
    </div>
  );
};

// Submenu Component
const Submenu = React.forwardRef(({ label, items, onItemClick, parentMenuRef, itemIndex }, ref) => {
  const [hoveredItem, setHoveredItem] = React.useState(null);
  const [openNestedSubmenu, setOpenNestedSubmenu] = React.useState(null);
  const [position, setPosition] = React.useState({ top: 0, left: 202 });
  const submenuRef = ref;

  // Calculate position based on parent menu item
  React.useEffect(() => {
    if (parentMenuRef?.current && itemIndex !== undefined) {
      const parentMenu = parentMenuRef.current;
      const menuItems = parentMenu.querySelectorAll('div[data-menu-item]');
      if (menuItems[itemIndex]) {
        const menuItem = menuItems[itemIndex];
        const rect = menuItem.getBoundingClientRect();
        const menuRect = parentMenu.getBoundingClientRect();
        
        // Position submenu to the right, aligned with the top of the menu item
        setPosition({
          top: rect.top,
          left: menuRect.right, // Flush with menu edge
        });
      }
    }
  }, [parentMenuRef, itemIndex]);

  return (
    <div
      ref={ref}
      className="win98-submenu"
      onMouseEnter={() => {
        // Keep submenu open when hovering
      }}
      style={{
        position: 'fixed',
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '200px',
        backgroundColor: '#C0C0C0',
        border: '2px solid',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        zIndex: 10001,
        fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
        fontSize: '11px',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          <div
            onMouseEnter={() => {
              setHoveredItem(index);
              if (item.hasSubmenu) {
                setOpenNestedSubmenu(index);
              } else {
                setOpenNestedSubmenu(null);
              }
            }}
            onMouseLeave={() => {
              setHoveredItem(null);
              setOpenNestedSubmenu(null);
            }}
            onClick={() => {
              if (item.action) {
                onItemClick(item.action);
              }
            }}
            style={{
              padding: '2px 4px',
              cursor: item.action ? 'pointer' : 'default',
              backgroundColor: hoveredItem === index ? '#000080' : 'transparent',
              color: hoveredItem === index ? '#FFFFFF' : '#000000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{item.label}</span>
            {item.hasSubmenu && (
              <span style={{ fontSize: '8px', marginLeft: '4px' }}>▶</span>
            )}
          </div>

          {/* Nested Submenu */}
          {item.hasSubmenu && openNestedSubmenu === index && (
            <NestedSubmenu
              parentSubmenuRef={submenuRef}
              itemIndex={index}
              submenuItems={item.submenuItems}
              onItemClick={onItemClick}
            />
          )}
        </div>
      ))}
    </div>
  );
});

Submenu.displayName = 'Submenu';

// Nested Submenu Component (third level)
const NestedSubmenu = ({ parentSubmenuRef, itemIndex, submenuItems, onItemClick }) => {
  const [nestedPosition, setNestedPosition] = React.useState({ top: 0, left: 0 });

  React.useEffect(() => {
    if (parentSubmenuRef?.current) {
      const parentSubmenu = parentSubmenuRef.current;
      const parentItems = parentSubmenu.querySelectorAll('div > div');
      if (parentItems[itemIndex]) {
        const parentItem = parentItems[itemIndex];
        const rect = parentItem.getBoundingClientRect();
        const submenuRect = parentSubmenu.getBoundingClientRect();
        
        // Position nested submenu to the right, aligned with the top of the parent item
        setNestedPosition({
          top: rect.top,
          left: submenuRect.right + 2, // 2px gap
        });
      }
    }
  }, [parentSubmenuRef, itemIndex]);

  return (
    <div
      data-nested-submenu
      onMouseEnter={() => {
        // Keep nested submenu open
      }}
      style={{
        position: 'fixed',
        top: `${nestedPosition.top}px`,
        left: `${nestedPosition.left}px`,
        width: '200px',
        backgroundColor: '#C0C0C0',
        border: '2px solid',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRightColor: '#808080',
        borderBottomColor: '#808080',
        zIndex: 10002,
        fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
        fontSize: '11px',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
      }}
    >
      {submenuItems.map((subItem, subIndex) => (
        <div
          key={subIndex}
          onClick={() => {
            if (subItem.action) {
              onItemClick(subItem.action);
            }
          }}
          style={{
            padding: '2px 4px',
            cursor: subItem.action ? 'pointer' : 'default',
            backgroundColor: 'transparent',
            color: '#000000',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000080';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#000000';
          }}
        >
          {subItem.label}
        </div>
      ))}
    </div>
  );
};

export default StartMenu;
