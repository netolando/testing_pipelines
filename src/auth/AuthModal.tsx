import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const mockFetchAccessToken = async (email: string, licenseKey: string) => {
    // Replace with real API call
    return Promise.resolve('mocked_access_token');
};

const AuthModal: React.FC = () => {
    const { setAccessToken, setUserName } = useAuth();
    const [mode, setMode] = useState<'token' | 'license'>('token');
    const [accessToken, setAccessTokenInput] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [licenseKey, setLicenseKey] = useState('');
    const [error, setError] = useState('');

    const handleTokenSubmit = () => {
        if (accessToken.trim() && name.trim()) {
            setAccessToken(accessToken.trim());
            setUserName(name.trim());
        } else {
            setError('Please enter a name and access token.');
        }
    };

    const handleLicenseSubmit = async () => {
        if (email.trim() && licenseKey.trim()) {
            try {
                const token = await mockFetchAccessToken(email, licenseKey);
                setAccessToken(token);
                setUserName(email.trim());
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
                            placeholder="Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
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
                {error && <div className="error-box">{error}</div>}
            </div>
        </div>
    );
};

export default AuthModal;
