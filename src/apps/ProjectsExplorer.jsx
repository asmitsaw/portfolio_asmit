/**
 * Projects Explorer App
 *
 * Windows Explorer–style view for Projects (D:)
 * Shows a simple tree on the left and files on the right.
 */

import React from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const ProjectsExplorer = ({ windowId = 'projects' }) => {
  const menuItems = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Help'];

  const projects = [
    {
      id: 1,
      name: 'Windows 98 Portfolio',
      description: 'This nostalgic portfolio website you\'re viewing right now!',
      tech: 'React, Tailwind CSS, Zustand',
      status: 'Live',
      icon: '💾',
    },
    {
      id: 2,
      name: 'E-Commerce Platform',
      description: 'Full-stack online shopping platform with payment integration',
      tech: 'Next.js, Stripe, PostgreSQL',
      status: 'Complete',
      icon: '🛒',
    },
    {
      id: 3,
      name: 'Real-time Chat App',
      description: 'WebSocket-based chat application with rooms and direct messages',
      tech: 'Node.js, Socket.io, MongoDB',
      status: 'Complete',
      icon: '💬',
    },
    {
      id: 4,
      name: 'AI Image Generator',
      description: 'Generate images from text using AI models',
      tech: 'Python, FastAPI, Stable Diffusion',
      status: 'In Progress',
      icon: '🎨',
    },
    {
      id: 5,
      name: 'Task Management API',
      description: 'RESTful API for task and project management',
      tech: 'Go, PostgreSQL, Redis',
      status: 'Complete',
      icon: '📋',
    },
    {
      id: 6,
      name: 'Weather Dashboard',
      description: 'Beautiful weather dashboard with forecasts and maps',
      tech: 'Vue.js, OpenWeather API, Mapbox',
      status: 'Complete',
      icon: '🌤️',
    },
  ];

  const { openWindow } = useWindowStore();

  const handleOpenPortfolio = () => {
    // Open Internet Explorer focused on portfolio links
    openWindow('explorer');
  };

  const treeLines = [
    'Projects (D:)',
    '├── Web Apps',
    '│   ├── Portfolio.exe',
    '│   └── Dashboard.exe',
    '├── Machine Learning',
    '│   ├── Model.pkl',
    '│   └── Notebook.ipynb',
    '├── Systems',
    '│   └── OS-Simulator.exe',
    '└── Experiments',
    '    └── Prototype.exe',
  ];

  const files = [
    {
      id: 'portfolio',
      name: 'Portfolio.exe',
      type: 'Application',
      size: '512 KB',
      folder: 'Web Apps',
      onOpen: handleOpenPortfolio,
    },
    {
      id: 'dashboard',
      name: 'Dashboard.exe',
      type: 'Application',
      size: '640 KB',
      folder: 'Web Apps',
    },
    {
      id: 'model',
      name: 'Model.pkl',
      type: 'Model file',
      size: '24 MB',
      folder: 'Machine Learning',
    },
    {
      id: 'notebook',
      name: 'Notebook.ipynb',
      type: 'Jupyter Notebook',
      size: '1.2 MB',
      folder: 'Machine Learning',
    },
    {
      id: 'os-sim',
      name: 'OS-Simulator.exe',
      type: 'Application',
      size: '2.4 MB',
      folder: 'Systems',
    },
    {
      id: 'prototype',
      name: 'Prototype.exe',
      type: 'Application',
      size: '1.8 MB',
      folder: 'Experiments',
    },
  ];

  return (
    <Window windowId={windowId}>
      <div className="flex h-full" style={{ background: 'hsl(var(--win98-gray))' }}>
        {/* Left tree view */}
        <div
          style={{
            width: '40%',
            borderRight: '1px solid hsl(var(--win98-dark-gray))',
            padding: '4px',
            background: 'hsl(var(--win98-white))',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
          }}
        >
          {treeLines.map((line, idx) => (
            <div key={idx} style={{ whiteSpace: 'pre' }}>
              {line}
            </div>
          ))}
        </div>

        {/* Right file list */}
        <div
          className="flex-1"
          style={{
            background: 'hsl(var(--win98-white))',
            padding: '4px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '11px',
            }}
          >
            <thead>
              <tr>
                <th align="left">Name</th>
                <th align="left">Type</th>
                <th align="right">Size</th>
                <th align="left">Folder</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr
                  key={file.id}
                  onDoubleClick={() => file.onOpen && file.onOpen()}
                  style={{ cursor: file.onOpen ? 'pointer' : 'default' }}
                >
                  <td>{file.name}</td>
                  <td>{file.type}</td>
                  <td align="right">{file.size}</td>
                  <td>{file.folder}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
            Tip: Double-click <strong>Portfolio.exe</strong> to open the portfolio in Internet Explorer.
          </div>
        </div>
      </div>
    </Window>
  );
};

export default ProjectsExplorer;

