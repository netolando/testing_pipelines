import React, { useState } from 'react';
import { useAuth } from './AuthContext';

const getAccessToken = async (email: string, licenseKey: string) => {
  const response = await fetch("https://api-gateway.ingestro.com/dp/api/v1/auth/access-token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      license_key: licenseKey,
      auth: {
        identifier: email,
        type: "USER",
      },
    }),
  });
  return response.json();
};

const verifyAccessToken = async (accessToken: string) => {
  const response = await fetch("https://api-gateway.ingestro.com/dp/api/v1/auth/verify", {
    method: "POST",
    headers: {
      accept: "application/json",
      access_token: accessToken,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to verify access token");
  }
  return response.json();
};

const AuthModal: React.FC = () => {
  const { setAccessToken, setUserName } = useAuth();
  const [mode, setMode] = useState<'token' | 'license'>('token');
  const [tokenInput, setTokenInput] = useState('');
  const [email, setEmail] = useState('');
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');

  const handleTokenSubmit = async () => {
    if (tokenInput.trim()) {
      try {
        const verifyResponse = await verifyAccessToken(tokenInput.trim());
        setAccessToken(tokenInput.trim());
        setUserName(verifyResponse.data?.name || '');
        setError('');
      } catch {
        setError('Failed to verify access token.');
      }
    } else {
      setError('Please enter an access token.');
    }
  };

  const handleLicenseSubmit = async () => {
    if (email.trim() && licenseKey.trim()) {
      try {
        const tokenResponse = await getAccessToken(email.trim(), licenseKey.trim());
        const token = tokenResponse.access_token;
        const verifyResponse = await verifyAccessToken(token);
        setAccessToken(token);
        setUserName(verifyResponse.data?.name || '');
        setError('');
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
          >
            Access Token
          </button>
          <button
            className={`button${mode === 'license' ? ' active' : ''}`}
            onClick={() => setMode('license')}
          >
            Email + License Key
          </button>
        </div>

        {mode === 'token' ? (
          <div className="auth-form">
            <input
              className="input"
              type="text"
              placeholder="Access Token"
              value={tokenInput}
              onChange={e => setTokenInput(e.target.value)}
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
