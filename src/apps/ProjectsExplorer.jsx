/**
 * Projects Explorer App (Recruiter-Ready Edition)
 *
 * Windows 98-authentic Explorer for Projects (D:) with folder navigation
 * Features: categorized projects, folder navigation, project detail windows,
 * status bar, double-click handling, GitHub links
 */

import React, { useState, useRef } from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

// ============================================================================
// CONSTANTS & DATA
// ============================================================================

const DOUBLE_CLICK_DELAY = 300; // ms
const FOLDER_OPEN_DELAY = 150; // ms

// Project data organized by folders
const PROJECT_DATA = {
  'Web Applications': [
    {
      id: 'portfolio',
      name: 'Interactive Portfolio.exe',
      type: 'Application',
      size: '512 KB',
      description: 'A fully interactive Windows-98-style operating system simulation built in the browser.',
      tech: 'React, Zustand, Tailwind CSS, Custom Window Manager',
      highlights: ['OS-level UI simulation', 'Multi-window state management', 'UX attention to detail'],
      githubUrl: 'https://github.com/asmitsaw/portfolio',
      liveUrl: window.location.origin,
    },
    {
      id: 'ai-resume',
      name: 'AI Resume Advisor.exe',
      type: 'Application',
      size: '320 KB',
      description: 'A web-based AI tool that analyzes resumes and provides improvement suggestions.',
      tech: 'HTML, JavaScript, Prompt-based AI logic',
      highlights: ['Resume analysis', 'AI-powered suggestions', 'User-friendly interface'],
      githubUrl: 'https://github.com/asmitsaw/ai-resume-advisor',
    },
    {
      id: 'startx',
      name: 'STARTX Career Starter.exe',
      type: 'Application',
      size: '480 KB',
      description: 'Career planning and development platform for students.',
      tech: 'React, Node.js, MongoDB',
      highlights: ['Career guidance', 'Skill tracking', 'Resource library'],
      githubUrl: 'https://github.com/asmitsaw/startx',
    },
    {
      id: 'college',
      name: 'College Website.exe',
      type: 'Application',
      size: '640 KB',
      description: 'Modern college website with event management and student portal.',
      tech: 'HTML, CSS, JavaScript, PHP',
      highlights: ['Event management', 'Student portal', 'Responsive design'],
      githubUrl: 'https://github.com/ asmitsaw/college-website',
    },
  ],

  'AI / Machine Learning': [
    {
      id: 'fluencify',
      name: 'Fluencify Language Assistant.exe',
      type: 'Application',
      size: '1.2 MB',
      description: 'An AI-powered language learning assistant focused on conversational fluency and confidence.',
      tech: 'TypeScript, Conversational AI, NLP concepts',
      highlights: ['Real-time language practice', 'Vocabulary building', 'Speaking confidence tools'],
      githubUrl: 'https://github.com/asmitsaw/fluencify',
    },
    {
      id: 'insurance-prediction',
      name: 'Medical Insurance Cost Prediction.ipynb',
      type: 'Jupyter Notebook',
      size: '2.4 MB',
      description: 'Machine learning model to predict medical insurance costs based on demographic data.',
      tech: 'Python, Pandas, Scikit-learn',
      highlights: ['Regression modeling', 'Data preprocessing', 'Feature engineering'],
      githubUrl: 'https://github.com/asmitsaw/medical-insurance-prediction',
    },
    {
      id: 'plate-detection',
      name: 'Number Plate Detection.ipynb',
      type: 'Jupyter Notebook',
      size: '3.1 MB',
      description: 'Computer vision project to detect and extract vehicle number plates from images.',
      tech: 'Python, OpenCV, Image processing',
      highlights: ['Image processing', 'Pattern recognition', 'Real-time detection'],
      githubUrl: 'https://github.com/asmitsaw/number-plate-detection',
    },
    {
      id: 'chatbot',
      name: 'Chatbot Language Learning.exe',
      type: 'Application',
      size: '840 KB',
      description: 'Interactive chatbot for learning new languages through conversation.',
      tech: 'Python, NLP, Dialog management',
      highlights: ['Conversational AI', 'Language learning', 'Context awareness'],
      githubUrl: 'https://github.com/asmitsaw/chatbot-language',
    },
  ],

  'Mobile & Cross-Platform Apps': [
    {
      id: 'flex-vault',
      name: 'Flex Vault Mobile App.exe',
      type: 'Application',
      size: '1.8 MB',
      description: 'A secure mobile vault application for storing sensitive information.',
      tech: 'Flutter, Dart, Secure storage patterns',
      highlights: ['End-to-end encryption', 'Biometric authentication', 'Cross-platform'],
      githubUrl: 'https://github.com/asmitsaw/flex-vault',
    },
    {
      id: 'multi-cloud',
      name: 'Multi-Cloud Storage App.exe',
      type: 'Application',
      size: '2.2 MB',
      description: 'A Flutter app allowing users to upload and manage files across multiple cloud providers.',
      tech: 'Dart, Flutter, Cloud APIs',
      highlights: ['Multi-cloud support', 'File synchronization', 'Unified interface'],
      githubUrl: 'https://github.com/asmitsaw/multi-cloud-storage',
    },
    {
      id: 'dsa-game',
      name: 'DSA Game App.exe',
      type: 'Application',
      size: '1.5 MB',
      description: 'A gamified application to practice data structures and algorithms interactively.',
      tech: 'TypeScript, Expo, Game-based learning',
      highlights: ['Interactive challenges', 'Progress tracking', 'Gamification'],
      githubUrl: 'https://github.com/asmitsaw/dsa-game',
    },
  ],

  'Hackathons & Competitions': [
    {
      id: 'avishkar',
      name: 'Avishkar 2025 Project.exe',
      type: 'Application',
      size: '1.1 MB',
      description: 'Solution developed for Avishkar hackathon addressing real-world challenges.',
      tech: 'React, Node.js, Team collaboration',
      highlights: ['Problem-driven design', 'Fast prototyping', 'Presentation skills'],
      githubUrl: 'https://github.com/asmitsaw/avishkar-2025',
    },
    {
      id: 'sprintnova',
      name: 'SprintNova 2025.exe',
      type: 'Application',
      size: '980 KB',
      description: 'Rapidly built solution developed during SprintNova hackathon.',
      tech: 'Vue.js, Firebase',
      highlights: ['Rapid development', 'MVP approach', 'Team coordination'],
      githubUrl: 'https://github.com/asmitsaw/sprintnova-2025',
    },
    {
      id: 'technova',
      name: 'TechNova 2026.exe',
      type: 'Application',
      size: '1.3 MB',
      description: 'Innovation project for TechNova hackathon.',
      tech: 'Python, Django, PostgreSQL',
      highlights: ['Innovative solution', 'Full-stack development', 'Time-constrained'],
      githubUrl: 'https://github.com/asmitsaw/technova-2026',
    },
    {
      id: 'sih',
      name: 'SIH 2025 Project.exe',
      type: 'Application',
      size: '1.6 MB',
      description: 'Solution developed for Smart India Hackathon addressing real-world problem statements.',
      tech: 'TypeScript, React Native, Cloud services',
      highlights: ['Government problem statement', 'Scalable solution', 'Social impact'],
      githubUrl: 'https://github.com/asmitsaw/sih-2025',
    },
  ],

  'UI / Frontend Experiments': [
    {
      id: 'sliding-login',
      name: 'Sliding Login UI.exe',
      type: 'Application',
      size: '120 KB',
      description: 'A modern animated sliding login interface built purely with CSS.',
      tech: 'HTML, CSS animations',
      highlights: ['Pure CSS', 'Smooth animations', 'Modern design'],
      githubUrl: 'https://github.com/asmitsaw/sliding-login-ui',
      liveUrl: 'https://asmitsaw.github.io/sliding-login-ui',
    },
    {
      id: 'glassmorphism',
      name: 'Glassmorphism Login UI.exe',
      type: 'Application',
      size: '140 KB',
      description: 'UI experiment showcasing glassmorphism design trends.',
      tech: 'CSS, UI design principles',
      highlights: ['Glassmorphism', 'Modern aesthetics', 'Backdrop blur'],
      githubUrl: 'https://github.com/asmitsaw/glassmorphism-ui',
      liveUrl: 'https://asmitsaw.github.io/glassmorphism-ui',
    },
    {
      id: 'hand-art',
      name: 'Hand Art UI.exe',
      type: 'Application',
      size: '160 KB',
      description: 'Creative hand-drawn style UI experiment.',
      tech: 'SVG, CSS, JavaScript',
      highlights: ['Artistic design', 'Custom illustrations', 'Interactive elements'],
      githubUrl: 'https://github.com/asmitsaw/hand-art-ui',
    },
  ],

  'Systems & Meta': [
    {
      id: 'portfolio-source',
      name: 'Portfolio OS Source.exe',
      type: 'Application',
      size: '890 KB',
      description: 'Source code for this Windows 98 portfolio operating system.',
      tech: 'React, Zustand, Vite, Windows 98 UI',
      highlights: ['Complete OS simulation', 'State management', 'Multi-window system'],
      githubUrl: 'https://github.com/asmitsaw/windows98-portfolio',
      liveUrl: window.location.origin,
    },
    {
      id: 'project-list',
      name: 'All Types of Projects.txt',
      type: 'Text Document',
      size: '12 KB',
      description: 'Complete list of all projects with categories and descriptions.',
      content: `PROJECTS OVERVIEW - ASMIT SAW

WEB APPLICATIONS (4)
- Interactive Portfolio
- AI Resume Advisor
- STARTX Career Starter
- College Website

AI / MACHINE LEARNING (4)
- Fluencify Language Assistant
- Medical Insurance Cost Prediction
- Number Plate Detection
- Chatbot Language Learning

MOBILE & CROSS-PLATFORM (3)
- Flex Vault Mobile App
- Multi-Cloud Storage App
- DSA Game App

HACKATHONS & COMPETITIONS (4)
- Avishkar 2025
- SprintNova 2025
- TechNova 2026
- SIH 2025

UI / FRONTEND EXPERIMENTS (3)
- Sliding Login UI
- Glassmorphism Login UI
- Hand Art UI

SYSTEMS & META (2)
- Portfolio OS Source
- All Types of Projects

Total Projects: 20
Tech Stack: React, Python, Flutter, TypeScript, Node.js, and more
`,
    },
  ],
};

// ============================================================================
// COMPONENT: FileIcon
// ============================================================================

const FileIcon = ({ type }) => {
  const iconMap = {
    'File folder': '📁',
    'Application': '💻',
    'Jupyter Notebook': '📓',
    'Text Document': '📄',
  };

  return (
    <span style={{ marginRight: '6px', fontSize: '13px' }}>
      {iconMap[type] || '📄'}
    </span>
  );
};

// ============================================================================
// COMPONENT: ProjectDetailWindow
// ============================================================================

const ProjectDetailWindow = ({ project, onClose }) => {
  if (!project) return null;

  const isNotebook = project.name.endsWith('.ipynb');
  const isTextFile = project.name.endsWith('.txt');

  const handleViewCode = () => {
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank');
    }
  };

  const handleLiveDemo = () => {
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: isTextFile ? '600px' : '480px',
          maxHeight: '80vh',
          background: 'hsl(var(--win98-gray))',
          border: '2px outset hsl(var(--win98-light-gray))',
          boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Title bar */}
        <div
          style={{
            background: 'linear-gradient(to right, #000080, #1084d0)',
            color: 'white',
            padding: '2px 4px',
            fontSize: '11px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>
            <FileIcon type={project.type} />
            {project.name}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'hsl(var(--win98-gray))',
              border: '1px outset hsl(var(--win98-light-gray))',
              width: '16px',
              height: '14px',
              fontSize: '9px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div
          style={{
            padding: '16px',
            fontSize: '11px',
            overflow: 'auto',
            flex: 1,
            background: isTextFile ? '#FFFFFF' : 'hsl(var(--win98-gray))',
          }}
        >
          {isTextFile ? (
            // Text file viewer
            <pre
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                lineHeight: '1.5',
                margin: 0,
                whiteSpace: 'pre-wrap',
              }}
            >
              {project.content}
            </pre>
          ) : (
            // Application/Notebook viewer
            <>
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  {project.name.replace(/\.(exe|ipynb)$/, '')}
                </strong>
                <p style={{ lineHeight: '1.5', margin: '0 0 12px 0' }}>
                  {project.description}
                </p>
              </div>

              {project.tech && (
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>Technologies:</strong>
                  <div style={{ color: '#000080' }}>{project.tech}</div>
                </div>
              )}

              {project.highlights && project.highlights.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <strong style={{ display: 'block', marginBottom: '4px' }}>
                    {isNotebook ? 'Key Features:' : 'Highlights:'}
                  </strong>
                  <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                    {project.highlights.map((highlight, i) => (
                      <li key={i} style={{ marginBottom: '2px' }}>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </div>

        {/* Button bar */}
        {!isTextFile && (
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid #808080',
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {project.githubUrl && (
              <button
                onClick={handleViewCode}
                className="win98-button"
                style={{
                  padding: '4px 16px',
                  fontSize: '11px',
                  minWidth: '90px',
                }}
              >
                View Code
              </button>
            )}
            {project.liveUrl && (
              <button
                onClick={handleLiveDemo}
                className="win98-button"
                style={{
                  padding: '4px 16px',
                  fontSize: '11px',
                  minWidth: '90px',
                }}
              >
                Live Demo
              </button>
            )}
            <button
              onClick={onClose}
              className="win98-button"
              style={{
                padding: '4px 16px',
                fontSize: '11px',
                minWidth: '75px',
              }}
            >
              Close
            </button>
          </div>
        )}

        {isTextFile && (
          <div
            style={{
              padding: '12px',
              borderTop: '1px solid #808080',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              onClick={onClose}
              className="win98-button"
              style={{
                padding: '4px 16px',
                fontSize: '11px',
                minWidth: '75px',
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// COMPONENT: FileRow
// ============================================================================

const FileRow = ({ item, index, isSelected, onSelect, onDoubleClick, onHover }) => {
  const lastClickTime = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;

    if (timeSinceLastClick < DOUBLE_CLICK_DELAY) {
      onDoubleClick(item);
      lastClickTime.current = 0;
    } else {
      onSelect(item);
      lastClickTime.current = now;
    }
  };

  return (
    <tr
      onClick={handleClick}
      onMouseEnter={() => onHover(item)}
      style={{
        cursor: 'pointer',
        backgroundColor: isSelected ? '#000080' : index % 2 === 0 ? '#ffffff' : '#f8f8f8',
        color: isSelected ? 'white' : 'black',
        userSelect: 'none',
      }}
    >
      <td style={{ padding: '2px 4px', width: '280px' }}>
        <FileIcon type={item.type} />
        {item.name}
      </td>
      <td style={{ padding: '2px 4px', width: '140px' }}>{item.type}</td>
      <td style={{ padding: '2px 4px', width: '90px', textAlign: 'right', fontFamily: '"Courier New", monospace' }}>
        {item.size}
      </td>
    </tr>
  );
};

// ============================================================================
// MAIN COMPONENT: ProjectsExplorer
// ============================================================================

const ProjectsExplorer = ({ windowId = 'projects' }) => {
  const [currentPath, setCurrentPath] = useState('Projects (D:)');
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusText, setStatusText] = useState('');
  const [projectDetail, setProjectDetail] = useState(null);

  // Get current items (folders at root, or files within a folder)
  const getCurrentItems = () => {
    if (currentPath === 'Projects (D:)') {
      // Show folders
      return Object.keys(PROJECT_DATA).map((folderName) => ({
        id: folderName,
        name: folderName,
        type: 'File folder',
        size: '',
        isFolder: true,
      }));
    } else {
      // Show files in current folder
      const folderName = currentPath.replace('Projects (D:)\\', '');
      return PROJECT_DATA[folderName] || [];
    }
  };

  const items = getCurrentItems();

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    if (item.isFolder) {
      setStatusText(`${item.name}`);
    } else {
      setStatusText(`${item.name} — ${item.description?.substring(0, 60)}...`);
    }
  };

  const handleItemOpen = (item) => {
    if (item.isFolder) {
      // Navigate into folder
      setCurrentPath(`Projects (D:)\\${item.name}`);
      setSelectedItem(null);
      setStatusText(`${Object.keys(PROJECT_DATA[item.name] || {}).length} object(s)`);
    } else {
      // Open project detail
      setProjectDetail(item);
    }
  };

  const handleItemHover = (item) => {
    if (!selectedItem || selectedItem.id !== item.id) {
      if (item.isFolder) {
        setStatusText(`${item.name}`);
      } else {
        setStatusText(`${item.name} — ${item.type}`);
      }
    }
  };

  const handleBack = () => {
    if (currentPath !== 'Projects (D:)') {
      setCurrentPath('Projects (D:)');
      setSelectedItem(null);
      setStatusText(`${Object.keys(PROJECT_DATA).length} object(s)`);
    }
  };

  React.useEffect(() => {
    setStatusText(`${items.length} object(s)`);
  }, [items.length]);

  return (
    <Window windowId={windowId}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          background: 'hsl(var(--win98-gray))',
        }}
      >
        {/* Address Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px',
            background: 'hsl(var(--win98-gray))',
            borderBottom: '1px solid #808080',
          }}
        >
          <button
            onClick={handleBack}
            disabled={currentPath === 'Projects (D:)'}
            className="win98-button"
            style={{
              padding: '2px 12px',
              fontSize: '11px',
              opacity: currentPath === 'Projects (D:)' ? 0.5 : 1,
            }}
          >
            ← Back
          </button>
          <div
            style={{
              flex: 1,
              background: '#FFFFFF',
              border: '1px inset #808080',
              padding: '2px 4px',
              fontSize: '11px',
              fontFamily: '"MS Sans Serif", sans-serif',
            }}
          >
            {currentPath}
          </div>
        </div>

        {/* File List */}
        <div
          style={{
            flex: 1,
            background: '#FFFFFF',
            overflow: 'auto',
            padding: '2px',
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
              <tr style={{ background: 'hsl(var(--win98-gray))', borderBottom: '1px solid #808080' }}>
                <th style={{ textAlign: 'left', padding: '2px 4px', width: '280px' }}>Name</th>
                <th style={{ textAlign: 'left', padding: '2px 4px', width: '140px' }}>Type</th>
                <th style={{ textAlign: 'right', padding: '2px 4px', width: '90px' }}>Size</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <FileRow
                  key={item.id}
                  item={item}
                  index={index}
                  isSelected={selectedItem?.id === item.id}
                  onSelect={handleItemSelect}
                  onDoubleClick={handleItemOpen}
                  onHover={handleItemHover}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Status Bar */}
        <div
          style={{
            height: '20px',
            background: 'hsl(var(--win98-gray))',
            borderTop: '1px solid #808080',
            padding: '2px 6px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {statusText}
        </div>

        {/* Project Detail Window */}
        {projectDetail && (
          <ProjectDetailWindow
            project={projectDetail}
            onClose={() => setProjectDetail(null)}
          />
        )}
      </div>
    </Window>
  );
};

export default ProjectsExplorer;
