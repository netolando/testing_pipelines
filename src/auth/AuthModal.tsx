import React, { useState } from 'react';
import { useAuth } from './AuthContext';

type Props = {
    onAuthenticated: () => void;
};

const mockFetchAccessToken = async (email: string, licenseKey: string) => {
    // Replace with real API call
    return Promise.resolve('mocked_access_token');
};

const AuthModal: React.FC<Props> = ({ onAuthenticated }) => {
    const { setAccessToken } = useAuth();
    const [mode, setMode] = useState<'token' | 'license'>('token');
    const [accessToken, setAccessTokenInput] = useState('');
    const [email, setEmail] = useState('');
    const [licenseKey, setLicenseKey] = useState('');
    const [error, setError] = useState('');

    const handleTokenSubmit = () => {
        if (accessToken.trim()) {
            setAccessToken(accessToken.trim());
            onAuthenticated();
        } else {
            setError('Please enter a valid access token.');
        }
    };

    const handleLicenseSubmit = async () => {
        if (email.trim() && licenseKey.trim()) {
            try {
                const token = await mockFetchAccessToken(email, licenseKey);
                setAccessToken(token);
                onAuthenticated();
            } catch {
                setError('Failed to authenticate with email and license key.');
            }
        } else {
            setError('Please enter both email and license key.');
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal stylish-modal auth-modal">
                <h2 className="auth-title">Login</h2>
                <div className="auth-mode-toggle">
                    <button
                        className={`button${mode === 'token' ? ' active' : ''}`}
                        onClick={() => setMode('token')}
                    >Access Token</button>
                    <button
                        className={`button${mode === 'license' ? ' active' : ''}`}
                        onClick={() => setMode('license')}
                    >Email + License Key</button>
                </div>
                {mode === 'token' ? (
                    <div className="auth-form">
                        <input
                            className="input"
                            type="text"
                            placeholder="Access Token"
                            value={accessToken}
                            onChange={e => setAccessTokenInput(e.target.value)}
                        />
                        <button className="button" onClick={handleTokenSubmit}>Submit</button>
                    </div>
                ) : (
                    <div className="auth-form">
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className="input"
                            type="text"
                            placeholder="License Key"
                            value={licenseKey}
                            onChange={e => setLicenseKey(e.target.value)}
                        />
                        <button className="button" onClick={handleLicenseSubmit}>Submit</button>
                    </div>
                )}
                {error && <div className="error-box" style={{ marginTop: '1rem' }}>{error}</div>}
            </div>
            <style>{`
                .modal-backdrop {
                    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;
                    z-index: 9999;
                }
                .modal.stylish-modal.auth-modal {
                    background: #f2f2f2;
                    padding: 2.5rem 2rem;
                    border-radius: 16px;
                    min-width: 400px;
                    max-width: 400px;
                    box-shadow: 0 12px 30px rgba(0,0,0,0.18), 0 0 12px rgba(255,255,255,0.12);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .auth-title {
                    font-family: 'Haffer Regular', sans-serif;
                    font-size: 2rem;
                    color: #162338;
                    margin-bottom: 1.5rem;
                    font-weight: 700;
                }
                .auth-mode-toggle {
                    display: flex;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    justify-content: center;
                }
                .auth-mode-toggle .button {
                    font-family: 'Haffer Regular', sans-serif;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 6px;
                    padding: 12px 24px;
                    margin: 0 0.5rem;
                    transition: background 0.2s, color 0.2s;
                    background: #f2f2f2;
                    color: #162338;
                }
                .auth-mode-toggle .button.active {
                    background: #007bff;
                    color: #fff;
                }
                .auth-form {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                }
                .auth-form .input {
                    font-family: 'Haffer Regular', sans-serif;
                    font-size: 16px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    padding: 12px;
                    width: 100%;
                    box-sizing: border-box;
                }
                .auth-form .button {
                    width: 100%;
                    font-size: 16px;
                    font-weight: 600;
                    border-radius: 6px;
                    padding: 12px;
                    background: #007bff;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .auth-form .button:hover {
                    background: #0056b3;
                }
            `}</style>
        </div>
    );
};

export default AuthModal;
