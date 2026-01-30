/**
 * Windows 98 Shutdown Dialog
 * 
 * Dialog asking what the user wants to do:
 * - Shut down
 * - Restart
 * - Log off
 */

import React, { useState } from 'react';
import Window from '../components/Window';
import { useUIStore } from '../store/uiStore';
import { useWindowStore } from '../store/windowStore';

const ShutdownDialog = ({ windowId = 'shutdown' }) => {
  const [selectedOption, setSelectedOption] = useState('shutdown');
  const { startShutdown, logOff } = useUIStore();
  const { closeWindow } = useWindowStore();

  const handleOK = () => {
    if (selectedOption === 'shutdown') {
      startShutdown();
    } else if (selectedOption === 'restart') {
      // Reload page after shutdown screens
      setTimeout(() => {
        window.location.reload();
      }, 5000); // Give time for animation + final screen
      startShutdown();
    } else if (selectedOption === 'logoff') {
      logOff();
    }
  };

  const handleCancel = () => {
    closeWindow(windowId);
  };

  return (
    <Window windowId={windowId} isDialog={true}>
      <div
        className="h-full flex flex-col p-4"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Dialog Icon and Text */}
        <div className="flex items-start gap-3 mb-4">
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#FFFF00',
              border: '2px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
            }}
          >
            ⚠
          </div>
          <div>
            <p style={{ fontSize: '11px', marginBottom: '12px' }}>
              What do you want the computer to do?
            </p>

            {/* Radio Options */}
            <div className="space-y-2">
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                <input
                  type="radio"
                  name="shutdownOption"
                  value="shutdown"
                  checked={selectedOption === 'shutdown'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>Shut down</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                <input
                  type="radio"
                  name="shutdownOption"
                  value="restart"
                  checked={selectedOption === 'restart'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>Restart</span>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                <input
                  type="radio"
                  name="shutdownOption"
                  value="logoff"
                  checked={selectedOption === 'logoff'}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  style={{ cursor: 'pointer' }}
                />
                <span>Log off</span>
              </label>
            </div>
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
        </div>
      </div>
    </Window>
  );
};

export default ShutdownDialog;
