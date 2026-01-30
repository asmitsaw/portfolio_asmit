/**
 * Resume App - WordPad Style
 * 
 * Displays resume PDF in a WordPad-like interface
 * with menu bar, toolbar, and PDF viewer
 */

import React from 'react';
import Window from '../components/Window';
import cvPdf from '../images/cv.pdf';

const Resume = ({ windowId = 'resume' }) => {
  const menuItems = ['File', 'Edit', 'View', 'Insert', 'Format', 'Help'];

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = cvPdf;
    link.download = 'Asmit_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          {/* Download Button */}
          <button
            className="win98-toolbar-button"
            title="Download Resume"
            onClick={handleDownload}
            style={{
              padding: '4px 12px',
              fontSize: '11px',
              fontWeight: 'bold'
            }}
          >
            💾 Download PDF
          </button>

          <div className="win98-divider" />

          {/* Print Button */}
          <button
            className="win98-toolbar-button"
            title="Print"
            onClick={() => window.print()}
          >
            🖨️
          </button>
        </div>

        {/* PDF Viewer */}
        <div
          className="flex-1 overflow-hidden"
          style={{
            background: 'hsl(var(--win98-gray))',
          }}
        >
          <iframe
            src={cvPdf}
            className="w-full h-full"
            style={{ border: 'none' }}
            title="Resume PDF"
          />
        </div>

        {/* Status Bar */}
        <div className="win98-statusbar flex">
          <div className="win98-statusbar-panel flex-1">
            📄 Resume.pdf - Ready
          </div>
          <div className="win98-statusbar-panel" style={{ width: '120px', textAlign: 'center' }}>
            PDF Document
          </div>
        </div>
      </div>
    </Window>
  );
};

export default Resume;
