/**
 * System Properties App
 * 
 * Windows 98 style system properties dialog
 * with fun/professional information
 */

import React, { useState } from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const SystemProperties = ({ windowId = 'system' }) => {
  const tabs = ['General', 'Computer Name', 'Hardware', 'Performance'];
  const [selectedTab, setSelectedTab] = useState('General');

  const { closeWindow } = useWindowStore();

  const handleClose = () => {
    closeWindow(windowId);
  };

  return (
    <Window windowId={windowId} isDialog={false}>
      <div
        className="h-full flex flex-col p-2"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Tabs */}
        <div className="flex" style={{ marginBottom: '-2px' }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`win98-tab ${selectedTab === tab ? 'active' : ''}`}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="win98-tab-content flex-1 overflow-auto">
          {selectedTab === 'General' && (
            <div>
              {/* Windows Logo */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="flex flex-wrap gap-0.5"
                  style={{ width: '64px' }}
                >
                  <div style={{ width: '30px', height: '30px', background: '#FF0000' }} />
                  <div style={{ width: '30px', height: '30px', background: '#00FF00' }} />
                  <div style={{ width: '30px', height: '30px', background: '#0000FF' }} />
                  <div style={{ width: '30px', height: '30px', background: '#FFFF00' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Microsoft Windows 98
                  </div>
                  <div style={{ fontSize: '11px', color: '#666' }}>
                    Second Edition
                  </div>
                  <div style={{ fontSize: '11px', marginTop: '8px' }}>
                    Copyright © 1981-1998 Microsoft Corp.
                  </div>
                </div>
              </div>

              <hr style={{
                border: 'none',
                borderTop: '1px solid hsl(var(--win98-dark-gray))',
                borderBottom: '1px solid hsl(var(--win98-white))',
                marginBottom: '12px',
              }} />

              {/* System Info */}
              <div style={{ fontSize: '11px' }}>
                <div className="mb-4">
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Registered to:
                  </div>
                  <div style={{ marginLeft: '12px' }}>
                    <div>Asmit Kumar</div>
                    <div>Creative Technologist</div>
                    <div style={{ color: '#666', marginTop: '4px' }}>
                      Product ID: ASMIT-98-DEV-1337
                    </div>
                  </div>
                </div>

                <hr style={{
                  border: 'none',
                  borderTop: '1px solid hsl(var(--win98-dark-gray))',
                  borderBottom: '1px solid hsl(var(--win98-white))',
                  marginBottom: '12px',
                }} />

                <div className="mb-4">
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    Computer:
                  </div>
                  <div style={{ marginLeft: '12px' }}>
                    <table style={{ fontSize: '11px' }}>
                      <tbody>
                        <tr>
                          <td style={{ paddingRight: '12px', color: '#666' }}>Processor:</td>
                          <td>Curiosity 2.0 @ Unlimited MHz</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: '12px', color: '#666' }}>RAM:</td>
                          <td>Unlimited GB</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: '12px', color: '#666' }}>System:</td>
                          <td>Creative-PC</td>
                        </tr>
                        <tr>
                          <td style={{ paddingRight: '12px', color: '#666' }}>Passion:</td>
                          <td>Building Amazing Things</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <hr style={{
                  border: 'none',
                  borderTop: '1px solid hsl(var(--win98-dark-gray))',
                  borderBottom: '1px solid hsl(var(--win98-white))',
                  marginBottom: '12px',
                }} />

                <div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                    About Me:
                  </div>
                  <div style={{
                    marginLeft: '12px',
                    lineHeight: '1.5',
                    color: '#333',
                  }}>
                    Full Stack Developer passionate about creating
                    beautiful, functional web experiences. I specialize
                    in React, TypeScript, and Node.js. This retro portfolio
                    showcases my attention to detail and love for nostalgic UI.
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'Hardware' && (
            <div style={{ fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                Installed Skills:
              </div>
              <div
                className="win98-inset p-2"
                style={{
                  background: 'hsl(var(--win98-white))',
                  height: '200px',
                  overflow: 'auto',
                }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span>📁</span>
                    <span style={{ fontWeight: 'bold' }}>Programming Languages</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>├── JavaScript</div>
                    <div>├── TypeScript</div>
                    <div>├── Python</div>
                    <div>├── Go</div>
                    <div>└── SQL</div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span>📁</span>
                    <span style={{ fontWeight: 'bold' }}>Frontend Technologies</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>├── React</div>
                    <div>├── Vue.js</div>
                    <div>├── Next.js</div>
                    <div>├── Tailwind CSS</div>
                    <div>└── Three.js</div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span>📁</span>
                    <span style={{ fontWeight: 'bold' }}>Backend Technologies</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>├── Node.js</div>
                    <div>├── Express</div>
                    <div>├── FastAPI</div>
                    <div>├── PostgreSQL</div>
                    <div>└── MongoDB</div>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <span>📁</span>
                    <span style={{ fontWeight: 'bold' }}>Tools & Platforms</span>
                  </div>
                  <div style={{ marginLeft: '20px' }}>
                    <div>├── Git</div>
                    <div>├── Docker</div>
                    <div>├── AWS</div>
                    <div>├── Figma</div>
                    <div>└── VS Code</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'Performance' && (
            <div style={{ fontSize: '11px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '12px' }}>
                Performance Status
              </div>

              {/* Memory Status */}
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Coffee Consumption:</span>
                  <span>98%</span>
                </div>
                <div className="win98-progress">
                  <div
                    className="win98-progress-bar"
                    style={{ width: '98%' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Creativity Level:</span>
                  <span>95%</span>
                </div>
                <div className="win98-progress">
                  <div
                    className="win98-progress-bar"
                    style={{ width: '95%' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Problem Solving:</span>
                  <span>92%</span>
                </div>
                <div className="win98-progress">
                  <div
                    className="win98-progress-bar"
                    style={{ width: '92%' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Debugging Skills:</span>
                  <span>88%</span>
                </div>
                <div className="win98-progress">
                  <div
                    className="win98-progress-bar"
                    style={{ width: '88%' }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>Sleep Deprivation:</span>
                  <span>75%</span>
                </div>
                <div className="win98-progress">
                  <div
                    className="win98-progress-bar"
                    style={{ width: '75%', background: '#FF6600' }}
                  />
                </div>
              </div>

              <hr style={{
                border: 'none',
                borderTop: '1px solid hsl(var(--win98-dark-gray))',
                borderBottom: '1px solid hsl(var(--win98-white))',
                margin: '12px 0',
              }} />

              <div style={{ color: '#666', fontStyle: 'italic' }}>
                System is running at optimal capacity.
                <br />
                All creative modules are online.
              </div>
            </div>
          )}
        </div>

        {/* Dialog Buttons */}
        <div className="flex justify-end gap-2 mt-2">
          <button className="win98-button">OK</button>
          <button className="win98-button">Cancel</button>
          <button className="win98-button">Apply</button>
        </div>
      </div>
    </Window>
  );
};

export default SystemProperties;
