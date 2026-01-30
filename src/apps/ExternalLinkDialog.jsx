/**
 * External Link Dialog
 * 
 * Authentic Windows 98 security dialog for opening external sites
 * Mimics the behavior of IE when clicking external links
 */

import React from 'react';

const ExternalLinkDialog = ({ url, onConfirm, onCancel }) => {
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
            onClick={onCancel}
        >
            <div
                className="win98-external-dialog"
                onClick={(e) => e.stopPropagation()}
                style={{
                    width: '380px',
                    background: 'hsl(var(--win98-gray))',
                    border: '2px solid',
                    borderColor: 'hsl(var(--win98-white)) hsl(var(--win98-dark-gray)) hsl(var(--win98-dark-gray)) hsl(var(--win98-white))',
                    boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
                }}
            >
                {/* Title Bar */}
                <div
                    style={{
                        background: 'linear-gradient(90deg, hsl(var(--win98-title-active)), hsl(180, 40%, 25%))',
                        color: 'hsl(var(--win98-title-text))',
                        padding: '2px 4px',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    }}
                >
                    <span style={{ fontSize: '14px' }}>🌐</span>
                    Internet Explorer
                </div>

                {/* Dialog Body */}
                <div
                    style={{
                        padding: '16px 12px',
                        fontSize: '11px',
                        fontFamily: 'MS Sans Serif, Tahoma, sans-serif',
                    }}
                >
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        {/* Warning Icon */}
                        <div style={{ fontSize: '32px', flexShrink: 0 }}>⚠️</div>

                        {/* Message */}
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: '0 0 12px 0', lineHeight: '1.4' }}>
                                You are about to open an external website:
                            </p>
                            <p style={{
                                margin: '0 0 12px 0',
                                fontWeight: 'bold',
                                wordBreak: 'break-all',
                            }}>
                                {url}
                            </p>
                            <p style={{ margin: '0', lineHeight: '1.4' }}>
                                This site will open in your default browser.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div
                    style={{
                        height: '1px',
                        background: 'hsl(var(--win98-dark-gray))',
                        boxShadow: '0 1px 0 hsl(var(--win98-white))',
                    }}
                />

                {/* Buttons */}
                <div
                    style={{
                        padding: '12px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '8px',
                    }}
                >
                    <button
                        className="win98-button"
                        onClick={onConfirm}
                        style={{ minWidth: '75px' }}
                        autoFocus
                    >
                        OK
                    </button>
                    <button
                        className="win98-button"
                        onClick={onCancel}
                        style={{ minWidth: '75px' }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExternalLinkDialog;
