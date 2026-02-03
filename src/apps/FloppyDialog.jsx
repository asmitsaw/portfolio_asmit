/**
 * Floppy Dialog App
 *
 * Simple Windows 98 style "Insert disk" dialog for drive A:
 */

import React from 'react';
import Window from '../components/Window';

const FloppyDialog = ({ windowId = 'floppy' }) => {
  return (
    <Window windowId={windowId} isDialog={true}>
      <div
        className="h-full flex flex-col p-4"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        <div className="flex items-start gap-3 mb-4">
          <svg width="32" height="32" viewBox="0 0 32 32">
            {/* Warning icon */}
            <circle cx="16" cy="16" r="14" fill="#FFFF00" stroke="#000" strokeWidth="1" />
            <rect x="14" y="8" width="4" height="12" fill="#000" />
            <rect x="14" y="22" width="4" height="4" fill="#000" />
          </svg>
          <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
            <div style={{ marginBottom: '8px' }}>
              There is no disk in drive A:.
            </div>
            <div>
              Please insert a disk into drive <strong>A:</strong> (3½ Floppy).
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-auto">
          <button className="win98-button">Retry</button>
          <button className="win98-button">Cancel</button>
        </div>
      </div>
    </Window>
  );
};

export default FloppyDialog;

