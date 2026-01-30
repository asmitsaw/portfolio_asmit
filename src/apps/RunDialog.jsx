/**
 * Windows 98 Run Dialog
 * 
 * Dialog for running commands/applications
 * Accepts: cmd, resume, iexplore, projects
 */

import React, { useState } from 'react';
import Window from '../components/Window';
import { useUIStore } from '../store/uiStore';
import { useWindowStore } from '../store/windowStore';

const RunDialog = ({ windowId = 'run' }) => {
  const [command, setCommand] = useState('');
  const { openWindow, closeWindow } = useWindowStore();

  const handleOK = () => {
    const cmd = command.trim().toLowerCase();

    // Map commands to window IDs
    const commandMap = {
      'cmd': 'cmd',
      'command': 'cmd',
      'command prompt': 'cmd',
      'resume': 'resume',
      'wordpad': 'resume',
      'iexplore': 'explorer',
      'internet explorer': 'explorer',
      'ie': 'explorer',
      'projects': 'projects',
      'projects explorer': 'projects',
      'explorer': 'projects',
      'links': 'projects',
      'links explorer': 'projects',
      'system': 'system',
      'system properties': 'system',
      'control panel': 'system',
      'mycomputer': 'mycomputer',
      'my computer': 'mycomputer',
      'contact': 'contact',
      'notepad': 'notepad',
      'calc': 'calculator',
      'calculator': 'calculator',
    };

    const windowType = commandMap[cmd];
    if (windowType) {
      openWindow({ type: windowType });
      closeWindow(windowId);
    } else {
      alert(`Cannot find '${command}'. Make sure you typed the name correctly, and then try again.`);
    }
  };

  const handleCancel = () => {
    closeWindow(windowId);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleOK();
    }
  };

  return (
    <Window windowId={windowId} isDialog={true}>
      <div
        className="h-full flex flex-col p-4"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Dialog Content */}
        <div className="mb-4">
          <label
            style={{
              display: 'block',
              fontSize: '11px',
              marginBottom: '8px',
            }}
          >
            Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.
          </label>

          <div className="flex items-center gap-2 mb-2">
            <label
              style={{
                fontSize: '11px',
                width: '60px',
                textAlign: 'right',
              }}
            >
              <span style={{ textDecoration: 'underline' }}>O</span>pen:
            </label>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="win98-input flex-1"
              style={{ height: '22px' }}
              autoFocus
              placeholder="cmd, resume, iexplore, links,projects..."
            />
          </div>
        </div>

        {/* Dialog Buttons */}
        <div className="flex justify-end gap-2 mt-auto">
          <button className="win98-button" onClick={handleOK}>
            OK
          </button>
          <button className="win98-button" onClick={handleCancel}>
            Cancel
          </button>
          <button className="win98-button" onClick={() => { }}>
            Browse...
          </button>
        </div>
      </div>
    </Window>
  );
};

export default RunDialog;
