/**
 * Windows 98 Help Dialog
 * 
 * Simple help dialog explaining the portfolio
 */

import React from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const HelpDialog = () => {
  const { closeWindow } = useWindowStore();

  return (
    <Window windowId="help" isDialog={true}>
      <div
        className="h-full flex flex-col p-4"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Dialog Icon and Content */}
        <div className="flex items-start gap-3 mb-4">
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#000080',
              border: '2px solid #000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#FFFFFF',
              flexShrink: 0,
            }}
          >
            ?
          </div>
          <div style={{ fontSize: '11px', lineHeight: '1.5' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Windows 98 Portfolio Help
            </p>
            <p style={{ marginBottom: '8px' }}>
              This is a Windows 98–style portfolio OS built by Asmit.
            </p>
            <p style={{ marginBottom: '8px' }}>
              Navigate through the desktop, open applications, and explore
              the various windows to learn more about my work and skills.
            </p>
            <p>
              This portfolio demonstrates UI systems thinking, state management,
              and attention to detail in recreating an authentic retro experience.
            </p>
          </div>
        </div>

        {/* Dialog Buttons */}
        <div className="flex justify-end gap-2 mt-auto">
          <button className="win98-button" onClick={() => closeWindow('help')}>
            OK
          </button>
        </div>
      </div>
    </Window>
  );
};

export default HelpDialog;
