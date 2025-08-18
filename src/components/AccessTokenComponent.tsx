import React, { useState } from "react";
import { getAccessToken } from "../utils/authentication";
import "../styles.css";

const AccessTokenComponent: React.FC = () => {
  const [licenseKey, setLicenseKey] = useState("");
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCopied(false);

    try {
      const token = await getAccessToken(licenseKey, email);
      setAccessToken(token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (accessToken) {
      navigator.clipboard.writeText(accessToken).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div className="component-container">
      <h2>Get Access Token</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="password"
          placeholder="License Key"
          value={licenseKey}
          onChange={(e) => setLicenseKey(e.target.value)}
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? "Loading..." : "Get Access Token"}
        </button>
      </form>

      {error && <div className="error-box">{error}</div>}

      {accessToken && (
        <div className="copy-container">
          <button onClick={handleCopy} className="copy-button">
            {copied ? "Copied!" : "Copy Access Token"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AccessTokenComponent;
