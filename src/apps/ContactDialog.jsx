/**
 * Contact Dialog App
 * 
 * Windows 98 style dialog box for sending messages
 * with Name, Email, Message fields
 */

import React, { useState } from 'react';
import Window from '../components/Window';
import { useWindowStore } from '../store/windowStore';

const ContactDialog = ({ windowId = 'contact' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const { closeWindow } = useWindowStore();
  const [submitting, setSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e?.preventDefault(); // Handle if it's called from a form submit event

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "d7ff7019-2c29-4b6f-910b-c347e2c9d6f1",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => closeWindow(windowId), 3000);
      } else {
        console.error("Web3Forms Error:", result);
        alert(`Error: ${result.message || "Something went wrong. Please try again."}`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert(`Network Error: ${error.message}. Please check your internet connection.`);
    } finally {
      setSubmitting(false);
    }
  };



  // Handle cancel
  const handleCancel = () => {
    closeWindow(windowId);
  };

  // Success message view
  if (showSuccess) {
    return (
      <Window windowId={windowId} isDialog={true}>
        <div
          className="h-full flex flex-col items-center justify-center p-4"
          style={{ background: 'hsl(var(--win98-gray))' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="14" fill="#00AA00" stroke="#000" strokeWidth="1" />
              <path d="M8,16 L14,22 L24,10" fill="none" stroke="#FFF" strokeWidth="3" />
            </svg>
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
              Message Sent Successfully!
            </span>
          </div>
          <p style={{ fontSize: '11px', textAlign: 'center', color: '#666' }}>
            Thank you for your message. I'll get back to you soon!
          </p>
        </div>
      </Window>
    );
  }

  return (
    <Window windowId={windowId} isDialog={true}>
      <div
        className="h-full flex flex-col"
        style={{ background: 'hsl(var(--win98-gray))' }}
      >
        {/* Dialog Content */}
        <div className="flex-1 p-4">
          {/* Header with icon */}
          <div className="flex items-start gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 32 32">
              {/* Envelope */}
              <rect x="2" y="6" width="28" height="20" fill="#FFFFCC" stroke="#000" strokeWidth="1" />
              <polygon points="2,6 16,18 30,6" fill="#FFD700" stroke="#000" strokeWidth="1" />
              {/* Letter lines */}
              <line x1="6" y1="20" x2="14" y2="20" stroke="#0000FF" strokeWidth="1" />
              <line x1="6" y1="23" x2="12" y2="23" stroke="#0000FF" strokeWidth="1" />
            </svg>
            <div>
              <p style={{ fontSize: '11px', marginBottom: '8px' }}>
                Send me a message! Fill out the form below and I'll
                get back to you as soon as possible.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            {/* Name */}
            <div className="flex items-center gap-2">
              <label
                style={{
                  fontSize: '11px',
                  width: '60px',
                  textAlign: 'right',
                }}
              >
                <span style={{ textDecoration: 'underline' }}>N</span>ame:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="win98-input flex-1"
                style={{ height: '22px' }}
              />
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <label
                style={{
                  fontSize: '11px',
                  width: '60px',
                  textAlign: 'right',
                }}
              >
                <span style={{ textDecoration: 'underline' }}>E</span>mail:
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="win98-input flex-1"
                style={{ height: '22px' }}
              />
            </div>

            {/* Message */}
            <div className="flex items-start gap-2">
              <label
                style={{
                  fontSize: '11px',
                  width: '60px',
                  textAlign: 'right',
                  paddingTop: '4px',
                }}
              >
                <span style={{ textDecoration: 'underline' }}>M</span>essage:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="win98-textarea flex-1"
                rows={5}
                style={{ resize: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Dialog Buttons */}
        <div
          className="flex justify-end gap-2 p-3"
          style={{
            borderTop: '1px solid hsl(var(--win98-dark-gray))',
          }}
        >
          <button
            className="win98-button"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'OK'}
          </button>
          <button
            className="win98-button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Window>
  );
};

export default ContactDialog;
