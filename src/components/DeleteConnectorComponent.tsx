import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../styles.css";

const DeleteConnectorComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [connectorId, setConnectorId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteConnector = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch(
        `https://api-gateway.getnuvo.com/dp/api/v1/connector/${connectorId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            Authorization: accessToken || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setMessage(data.message || `Connector ${connectorId} deleted.`);
      setConnectorId("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Delete Connector</h2>
      <div className="form">
        <input
          type="text"
          placeholder="Connector ID"
          value={connectorId}
          onChange={(e) => setConnectorId(e.target.value)}
          className="input"
          required
        />
        <button
          onClick={handleDeleteConnector}
          className="button"
          disabled={loading || !accessToken || !connectorId}
        >
          {loading ? "Deleting..." : "Delete Connector"}
        </button>
      </div>

      {message && <div className="success-box">{message}</div>}
      {error && <div className="error-box">{error}</div>}
    </div>
  );
};

export default DeleteConnectorComponent;
