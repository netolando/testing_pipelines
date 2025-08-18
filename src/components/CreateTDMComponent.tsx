import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../styles.css";

const CreateTDMComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [name, setName] = useState("");
  const [tdmDefinition, setTdmDefinition] = useState("{}");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api-gateway.getnuvo.com/dp/api/v1/tdm",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken || ""}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            tdm_definition: JSON.parse(tdmDefinition),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to create TDM");

      const data = await response.json();
      setResponseData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="component-container">
      <h2>Create TDM</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="TDM Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />
        <textarea
          placeholder="TDM Definition JSON"
          value={tdmDefinition}
          onChange={(e) => setTdmDefinition(e.target.value)}
          className="input"
          rows={10}
        />
        <button type="submit" className="button" disabled={loading || !accessToken}>
          {loading ? "Creating..." : "Create TDM"}
        </button>
      </form>
      {error && <div className="error-box">{error}</div>}
      {responseData && (
        <div className="result-box">
          <strong>TDM Created!</strong>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateTDMComponent;
