/**
 * Windows 98 Notepad App
 * 
 * Simple Notepad window for notes and readme
 */

import React, { useState } from 'react';
import Window from '../components/Window';

const Notepad = () => {
  const [content, setContent] = useState(`About This OS

This is a Windows 98–style portfolio OS built entirely in the browser using React, Tailwind CSS, and Zustand.

How It Works:
• Click desktop icons to open applications
• Use the Start Menu to navigate
• Windows are draggable and resizable
• Alt+F4 closes active windows
• Double-click files in Projects Explorer

Built with:
• React (Vite)
• Tailwind CSS
• Zustand (State Management)
• react-rnd (Window Management)

This portfolio demonstrates:
• UI systems thinking
• State management
• Attention to detail
• Engineering maturity

Enjoy exploring!`);

  return (
    <Window windowId="notepad" showMenuBar={true} menuItems={[
      { label: 'File', items: ['New', 'Open...', 'Save', 'Save As...', '─', 'Page Setup...', 'Print...', '─', 'Exit'] },
      { label: 'Edit', items: ['Undo', '─', 'Cut', 'Copy', 'Paste', 'Delete', '─', 'Find...', 'Find Next', 'Replace...', 'Go To...', '─', 'Select All', 'Time/Date'] },
      { label: 'Search', items: ['Find...', 'Find Next'] },
      { label: 'Help', items: ['Help Topics', 'About Notepad'] },
    ]}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="win98-textarea w-full h-full resize-none p-2"
        style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          lineHeight: '1.4',
        }}
      />
    </Window>
  );
};

export default Notepad;
