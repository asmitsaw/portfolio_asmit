/**
 * Internet Explorer App
 * 
 * Fake IE browser displaying portfolio links
 * with classic toolbar and address bar
 */

import React, { useState, useEffect } from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';
import ExternalLinkDialog from './ExternalLinkDialog';

const InternetExplorer = ({ windowId, windowProps }) => {
  const [currentUrl, setCurrentUrl] = useState(windowProps?.url || 'http://localhost/portfolio');
  const [isLoading, setIsLoading] = useState(true);
  const [pendingExternalUrl, setPendingExternalUrl] = useState(null);
  const menuItems = ['File', 'Edit', 'View', 'Favorites', 'Tools', 'Help'];

  // Sync currentUrl with windowProps changes
  useEffect(() => {
    if (windowProps?.url) {
      setCurrentUrl(windowProps.url);
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 450);
      return () => clearTimeout(timer);
    }
  }, [windowProps?.url]);

  // Simulate loading on open
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timer);
  }, []);

  // Portfolio links
  const portfolioLinks = [
    {
      title: 'GitHub',
      url: 'https://github.com/asmitsaw',
      description: 'View my open source projects and contributions'
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/asmitsaw',
      description: 'Connect with me professionally'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/asmit_k._/',
      description: 'Follow me for tech updates and thoughts'
    },
    {
      title: 'Projects',
      url: 'https://github.com/asmitsaw?tab=repositories',
      description: 'Explore my open source projects and contributions'
    },
    {
      title: 'CodePen',
      url: 'https://codepen.io/hdamupuq-the-solid',
      description: 'Explore my frontend experiments and demos'
    },
  ];

  const { updateWindowProps } = useWindowStore();

  // Handle link click: show external link dialog
  const handleLinkClick = (url, title) => {
    // Check if it's an external URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
      setPendingExternalUrl(url);
    } else {
      // Internal navigation
      updateWindowProps(windowId, { url, title });
    }
  };

  // Handle external link confirmation
  const handleExternalConfirm = () => {
    if (pendingExternalUrl) {
      window.open(pendingExternalUrl, '_blank', 'noopener,noreferrer');
      setPendingExternalUrl(null);
    }
  };

  // Handle external link cancellation
  const handleExternalCancel = () => {
    setPendingExternalUrl(null);
  };

  return (
    <Window
      windowId={windowId || "explorer"}
      showMenuBar={true}
      menuItems={menuItems}
    >
      <div className="flex flex-col h-full">
        {/* Navigation Toolbar */}
        <div className="win98-toolbar">
          {/* Back Button */}
          <button className="win98-toolbar-button" title="Back" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="10,3 4,8 10,13" fill="#808080" />
            </svg>
          </button>

          {/* Forward Button */}
          <button className="win98-toolbar-button" title="Forward" disabled>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="6,3 12,8 6,13" fill="#808080" />
            </svg>
          </button>

          {/* Stop Button */}
          <button className="win98-toolbar-button" title="Stop">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <line x1="4" y1="4" x2="12" y2="12" stroke="#FF0000" strokeWidth="2" />
              <line x1="12" y1="4" x2="4" y2="12" stroke="#FF0000" strokeWidth="2" />
            </svg>
          </button>

          {/* Refresh Button */}
          <button className="win98-toolbar-button" title="Refresh">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M8,2 A6,6 0 1,1 2,8" fill="none" stroke="#008000" strokeWidth="2" />
              <polygon points="2,4 2,8 6,8" fill="#008000" />
            </svg>
          </button>

          {/* Home Button */}
          <button className="win98-toolbar-button" title="Home">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="8,2 2,8 4,8 4,14 7,14 7,10 9,10 9,14 12,14 12,8 14,8" fill="#000080" />
            </svg>
          </button>

          <div className="win98-divider" />

          {/* Search */}
          <button className="win98-toolbar-button" title="Search">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <circle cx="6" cy="6" r="4" fill="none" stroke="#000" strokeWidth="1.5" />
              <line x1="9" y1="9" x2="14" y2="14" stroke="#000" strokeWidth="2" />
            </svg>
          </button>

          {/* Favorites */}
          <button className="win98-toolbar-button" title="Favorites">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <polygon points="8,2 10,6 14,6 11,9 12,14 8,11 4,14 5,9 2,6 6,6" fill="#FFD700" stroke="#000" strokeWidth="0.5" />
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
            <svg width="16" height="16" viewBox="0 0 16 16" style={{ marginRight: '4px' }}>
              <rect x="2" y="2" width="12" height="12" fill="#FFFFCC" stroke="#000" strokeWidth="1" />
              <text x="5" y="11" fontSize="8" fill="#000">e</text>
            </svg>
            <span style={{ fontSize: '11px' }}>{currentUrl}</span>
          </div>
          <button className="win98-button" style={{ minWidth: '50px', padding: '2px 8px' }}>
            Go
          </button>
        </div>

        {/* Page Content */}
        <div
          className="flex-1 overflow-auto"
          style={{
            background: 'hsl(var(--win98-white))',
            fontFamily: '"Times New Roman", Georgia, serif',
            cursor: isLoading ? 'wait' : 'default',
          }}
        >
          {isLoading ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '8px',
                color: '#000080',
                fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
              }}
            >
              <span>Opening page...</span>
              <div className="win98-progress" style={{ width: '200px' }}>
                <div className="win98-progress-bar boot-progress-animation" />
              </div>
            </div>
          ) : (
            <div className="ie-page">
              {/* Page Title */}
              <h1 style={{
                fontSize: '24px',
                color: '#000080',
                marginBottom: '8px',
                fontFamily: 'Arial, sans-serif',
              }}>
                Asmit's Portfolio Links
              </h1>

              {/* Horizontal Rule */}
              <hr className="ie-rule" />

              {/* Welcome Text */}
              <p style={{
                fontSize: '14px',
                lineHeight: '1.6',
                marginBottom: '16px',
              }}>
                Welcome to my portfolio page! Below you'll find links to my various
                online profiles and projects. External links will open in your default browser.
              </p>


              {/* Visitor Counter (classic!) */}
              <div style={{ textAlign: 'center', margin: '16px 0' }}>
                <div className="visitor-counter">
                  You are visitor #{(() => {
                    const key = 'visitor_count';
                    const count = parseInt(localStorage.getItem(key) || '1337', 10) + 1;
                    localStorage.setItem(key, count.toString());
                    return count.toString().padStart(6, '0');
                  })()} since 2026
                </div>
              </div>

              {/* Horizontal Rule */}
              <hr className="ie-rule" />

              {/* Favorites Section */}


              {/* Links List */}
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                  fontSize: '18px',
                  color: '#800000',
                  marginBottom: '12px',
                  fontFamily: 'Arial, sans-serif',
                }}>
                  My Links:
                </h2>

                <ul style={{
                  listStyleType: 'disc',
                  marginLeft: '24px',
                  lineHeight: '2',
                }}>
                  {portfolioLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="win98-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(link.url, link.title);
                        }}
                        style={{
                          fontSize: '14px',
                          cursor: 'pointer',
                        }}
                      >
                        {link.title}
                      </a>
                      <span style={{
                        color: '#666',
                        fontSize: '12px',
                        marginLeft: '8px',
                      }}>
                        - {link.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Under Construction */}
              <div className="construction-box">
                <span style={{ fontSize: '24px' }}>🚧</span>
                <span style={{ fontFamily: 'Comic Sans MS, Arial, sans-serif' }}>
                  This page is under construction! More links coming soon...
                </span>
                <span style={{ fontSize: '24px' }}>🚧</span>
              </div>

              {/* Horizontal Rule before footer */}
              <hr className="ie-rule" />

              {/* Email Link */}
              <p style={{
                fontSize: '12px',
                textAlign: 'center',
                marginBottom: '16px',
              }}>
                Questions? Email me at:{' '}
                <a
                  href="mailto:asmit@example.com"
                  className="win98-link"
                  style={{ cursor: 'pointer' }}
                >
                  asmit@example.com
                </a>
              </p>

              {/* Best Viewed Badge */}
              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                fontSize: '10px',
                color: '#666',
              }}>
                <div style={{
                  display: 'inline-block',
                  border: '1px solid #999',
                  padding: '4px 8px',
                  background: '#F0F0F0',
                }}>
                  Best viewed with Internet Explorer 4.0+
                  <br />
                  Resolution: 800x600
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="win98-statusbar flex">
          <div className="win98-statusbar-panel flex-1 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="5" fill="#00FF00" />
            </svg>
            Done
          </div>
          <div className="win98-statusbar-panel" style={{ width: '120px' }}>
            Internet zone
          </div>
        </div>
      </div>

      {/* External Link Dialog */}
      {pendingExternalUrl && (
        <ExternalLinkDialog
          url={pendingExternalUrl}
          onConfirm={handleExternalConfirm}
          onCancel={handleExternalCancel}
        />
      )}
    </Window>
  );
};

export default InternetExplorer;
