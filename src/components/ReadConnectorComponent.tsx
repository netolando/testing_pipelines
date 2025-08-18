// src/components/ReadConnectorComponent.tsx

import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { readConnectors } from "../utils/connector";
import { Connector } from "../types"; // make sure this exists
import "../styles.css";

// imports unchanged
const ReadConnectorComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [expandedConnectorId, setExpandedConnectorId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReadConnectors = async () => {
    setLoading(true);
    setError(null);
    setConnectors([]);
    try {
      const data = await readConnectors(accessToken || "");
      setConnectors(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedConnectorId(expandedConnectorId === id ? null : id);
  };

  return (
    <div className="component-container">
      <h2>Read Connectors</h2>
      <div className="form">
        <button
          onClick={handleReadConnectors}
          className="button"
          disabled={loading || !accessToken}
        >
          {loading ? "Loading..." : "Read Connectors"}
        </button>
      </div>
      {error && <div className="error-box">{error}</div>}
      {connectors.length > 0 && (
        <div className="table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Node Type</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {connectors.map((c) => (
                <React.Fragment key={c.id}>
                  <tr
                    className="clickable-row"
                    onClick={() => toggleExpand(c.id)}
                  >
                    <td>{c.name}</td>
                    <td>{c.type}</td>
                    <td>{c.node_type}</td>
                    <td>{new Date(c.createdAt).toLocaleString()}</td>
                  </tr>
                  {expandedConnectorId === c.id && (
                    <tr className="details-row">
                      <td colSpan={4}>
                        <p>
                          <strong>ID:</strong> {c.id}
                        </p>
                        <p>
                          <strong>Created By:</strong>{" "}
                          {c.created_by?.name || "Unknown"} (
                          {c.created_by?.identifier || "N/A"})
                        </p>
                        <p>
                          <strong>Last Updated:</strong>{" "}
                          {new Date(c.updatedAt).toLocaleString()}
                        </p>
                        <p>
                          <strong>Updated By:</strong>{" "}
                          {c.updated_by?.name || "Unknown"} (
                          {c.updated_by?.identifier || "N/A"})
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && connectors.length === 0 && (
        <p style={{ color: "#fff", padding: "1rem" }}>No connectors found.</p>
      )}
    </div>
  );
};

export default ReadConnectorComponent;