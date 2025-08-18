// src/components/ReadUsersComponent.tsx

import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../styles.css";

// imports unchanged
const ReadUsersComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api-gateway.getnuvo.com/dp/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${accessToken || ""}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const result = await response.json();
      setUsers(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedUserId(expandedUserId === id ? null : id);
  };

  return (
    <div className="component-container">
      <h2>Read Users</h2>
      <div className="form">
        <button
          onClick={fetchUsers}
          className="button"
          disabled={loading || !accessToken}
        >
          {loading ? "Loading..." : "Fetch Users"}
        </button>
      </div>
      {error && <div className="error-box">{error}</div>}
      {users.length > 0 && (
        <div className="table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Identifier</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <React.Fragment key={u.id}>
                  <tr
                    className="clickable-row"
                    onClick={() => toggleExpand(u.id)}
                  >
                    <td>{u.name}</td>
                    <td>{u.type}</td>
                    <td>{u.identifier}</td>
                  </tr>
                  {expandedUserId === u.id && (
                    <tr className="details-row">
                      <td colSpan={3}>
                        {u.createdAt && (
                          <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(u.createdAt).toLocaleString()}
                          </p>
                        )}
                        {u.updatedAt && (
                          <p>
                            <strong>Updated At:</strong>{" "}
                            {new Date(u.updatedAt).toLocaleString()}
                          </p>
                        )}
                        <p>
                          <strong>ID:</strong> {u.id}
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
      {!loading && users.length === 0 && (
        <p style={{ color: "#fff", padding: "1rem" }}>No users found.</p>
      )}
    </div>
  );
};

export default ReadUsersComponent;