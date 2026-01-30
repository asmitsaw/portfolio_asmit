/**
 * Command Prompt App
 * 
 * Authentic Windows 98 command prompt with:
 * - Black background, white text
 * - Blinking cursor
 * - Interactive commands
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const CommandPrompt = ({ windowId = 'cmd' }) => {
  const [history, setHistory] = useState([
    'Microsoft(R) Windows 98',
    '   (C)Copyright Microsoft Corp 1981-1998.',
    '',
    'C:\\WINDOWS>',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const { openWindow } = useWindowStore();

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input on container click
  const handleContainerClick = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Process commands
  const processCommand = useCallback((cmd) => {
    const command = cmd.trim().toLowerCase();
    const args = command.split(' ');
    const mainCmd = args[0];

    let output = [];

    switch (mainCmd) {
      case 'help':
        output = [
          '',
          'Available commands:',
          '',
          '  HELP       - Display this help message',
          '  ABOUT      - Display information about me',
          '  PROJECTS   - List my projects and open Projects Explorer',
          '  SKILLS     - Show my technical skills',
          '  RESUME     - Open my resume in WordPad',
          '  CONTACT    - Open contact dialog',
          '  SYSINFO    - Open System Properties',
          '  CLS        - Clear the screen',
          '  DIR        - List directory contents',
          '  VER        - Display Windows version',
          '  DATE       - Display current date',
          '  TIME       - Display current time',
          '  EXIT       - Close command prompt',
          '',
        ];
        break;

      case 'about':
        output = [
          '',
          '╔══════════════════════════════════════════════════════════╗',
          '║                    ABOUT ASMIT                           ║',
          '╠══════════════════════════════════════════════════════════╣',
          '║                                                          ║',
          '║  Name:       Asmit Saw                                   ║',
          '║  Role:       Full Stack Developer                        ║',
          '║  Location:   Planet Earth                                ║',
          '║  Passion:    Building beautiful web experiences          ║',
          '║                                                          ║',
          '║  I love creating pixel-perfect UIs and solving           ║',
          '║  complex technical challenges. When not coding,          ║',
          '║  you can find me exploring new technologies              ║',
          '║  or contributing to open source projects.                ║',
          '║                                                          ║',
          '╚══════════════════════════════════════════════════════════╝',
          '',
        ];
        break;

      case 'projects':
        output = [
          '',
          ' Volume in drive C is PORTFOLIO',
          ' Volume Serial Number is 1337-CAFE',
          '',
          ' Directory of C:\\PROJECTS',
          '',
          '10/15/2024  09:30 AM    <DIR>          .',
          '10/15/2024  09:30 AM    <DIR>          ..',
          '10/15/2024  09:30 AM    <DIR>          windows98-portfolio',
          '09/22/2024  02:15 PM    <DIR>          ecommerce-platform',
          '08/10/2024  11:45 AM    <DIR>          realtime-chat-app',
          '07/05/2024  04:20 PM    <DIR>          ai-image-generator',
          '06/18/2024  10:00 AM    <DIR>          task-management-api',
          '05/01/2024  03:30 PM    <DIR>          weather-dashboard',
          '               0 File(s)              0 bytes',
          '               8 Dir(s)   999,999,999 bytes free',
          '',
        ];
        // Open Projects Explorer window
        setTimeout(() => openWindow({ type: 'projects' }), 300);
        break;

      case 'skills':
        output = [
          '',
          '┌─────────────────────────────────────────────────────────┐',
          '│                   TECHNICAL SKILLS                      │',
          '├─────────────────────────────────────────────────────────┤',
          '│                                                         │',
          '│  Languages:   JavaScript ████████████░░ 90%            │',
          '│               TypeScript ████████████░░ 88%            │',
          '│               Python     ██████████░░░░ 80%            │',
          '│               Go         ████████░░░░░░ 65%            │',
          '│                                                         │',
          '│  Frontend:    React      ████████████░░ 95%            │',
          '│               Vue.js     ██████████░░░░ 80%            │',
          '│               CSS/SCSS   ████████████░░ 90%            │',
          '│               Three.js   ████████░░░░░░ 60%            │',
          '│                                                         │',
          '│  Backend:     Node.js    ████████████░░ 90%            │',
          '│               FastAPI    ██████████░░░░ 75%            │',
          '│               PostgreSQL ██████████░░░░ 80%            │',
          '│               MongoDB    ██████████░░░░ 78%            │',
          '│                                                         │',
          '└─────────────────────────────────────────────────────────┘',
          '',
        ];
        break;

      case 'resume':
        output = [
          '',
          'Opening Resume in WordPad...',
          '',
        ];
        // Open resume window
        setTimeout(() => openWindow({ type: 'resume' }), 300);
        break;

      case 'contact':
        output = [
          '',
          'Opening Contact dialog...',
          '',
        ];
        // Open contact window
        setTimeout(() => openWindow({ type: 'contact' }), 300);
        break;

      case 'cls':
        setHistory(['C:\\WINDOWS>']);
        return;

      case 'dir':
        output = [
          '',
          ' Volume in drive C is WINDOWS98',
          ' Volume Serial Number is 0420-1337',
          '',
          ' Directory of C:\\WINDOWS',
          '',
          '10/15/2024  09:00 AM    <DIR>          .',
          '10/15/2024  09:00 AM    <DIR>          ..',
          '10/15/2024  09:00 AM    <DIR>          Desktop',
          '10/15/2024  09:00 AM    <DIR>          System',
          '10/15/2024  09:00 AM    <DIR>          Program Files',
          '10/15/2024  09:00 AM    <DIR>          My Documents',
          '10/15/2024  09:00 AM            98,304 WIN.COM',
          '10/15/2024  09:00 AM         1,048,576 WIN98.SYS',
          '               2 File(s)      1,146,880 bytes',
          '               6 Dir(s)   999,999,999 bytes free',
          '',
        ];
        break;

      case 'ver':
        output = [
          '',
          'Microsoft Windows 98 [Version 4.10.1998]',
          '',
        ];
        break;

      case 'date':
        const date = new Date();
        output = [
          '',
          `The current date is: ${date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
          })}`,
          '',
        ];
        break;

      case 'time':
        const time = new Date();
        output = [
          '',
          `The current time is: ${time.toLocaleTimeString('en-US')}`,
          '',
        ];
        break;

      case 'sysinfo':
        output = [
          '',
          'Opening System Properties...',
          '',
        ];
        setTimeout(() => openWindow({ type: 'system' }), 300);
        break;

      case 'exit':
        const { closeWindow } = useWindowStore.getState();
        closeWindow(windowId);
        return;

      case '':
        output = [];
        break;

      default:
        output = [
          '',
          `'${cmd}' is not recognized as an internal or external command,`,
          'operable program or batch file.',
          '',
          'Type HELP for a list of available commands.',
          '',
        ];
    }

    setHistory(prev => [
      ...prev,
      cmd,
      ...output,
      'C:\\WINDOWS>',
    ]);
  }, [openWindow]);

  // Handle key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(currentInput);
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1
          ? historyIndex + 1
          : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = [
        'help',
        'about',
        'projects',
        'skills',
        'resume',
        'contact',
        'sysinfo',
        'cls',
        'dir',
        'ver',
        'date',
        'time',
        'exit',
      ];
      const trimmed = currentInput.trim().toLowerCase();
      if (!trimmed) return;
      const matches = commands.filter((cmd) => cmd.startsWith(trimmed));
      if (matches.length === 1) {
        setCurrentInput(matches[0].toUpperCase());
      } else if (matches.length > 1) {
        setHistory(prev => [
          ...prev,
          currentInput,
          matches.join('  '),
          'C:\\WINDOWS>',
        ]);
      }
    }
  }, [currentInput, commandHistory, historyIndex, processCommand]);

  return (
    <Window windowId={windowId}>
      <div
        ref={containerRef}
        className="h-full overflow-auto p-1 cursor-text"
        style={{
          background: '#000000',
          fontFamily: '"Courier New", Consolas, monospace',
          fontSize: '14px',
          lineHeight: '1.2',
        }}
        onClick={handleContainerClick}
      >
        {/* Command History */}
        <div style={{ color: '#C0C0C0' }}>
          {history.map((line, index) => (
            <div key={index} style={{ minHeight: '16px', whiteSpace: 'pre' }}>
              {line}
            </div>
          ))}
        </div>

        {/* Current Input Line */}
        <div className="flex" style={{ color: '#C0C0C0' }}>
          <span style={{ whiteSpace: 'pre' }}>{currentInput}</span>
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: '8px',
              height: '14px',
              background: '#C0C0C0',
              marginLeft: '1px',
            }}
          />
        </div>

        {/* Hidden input for capturing keyboard */}
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            position: 'absolute',
            opacity: 0,
            pointerEvents: 'none',
          }}
          autoFocus
        />
      </div>
    </Window>
  );
};

export default CommandPrompt;
