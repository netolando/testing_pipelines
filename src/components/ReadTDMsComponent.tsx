import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import "../styles.css";

interface TdmListItem {
  id: string;
  name?: string;
  type?: string;
  createdAt?: string;
  [k: string]: any;
}

interface TdmColumn {
  key: string;
  label?: string;
  columnType?: string;
  description?: string;
  validations?: Array<{ validate: string;[k: string]: any }>;
  dropdownOptions?: Array<{ label: string; value: string }>;
  isMultiSelect?: boolean;
  [k: string]: any;
}

interface TdmDetails {
  id: string;
  name?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  columns?: TdmColumn[];
  [k: string]: any;
}

const ReadTDMsComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [tdms, setTdms] = useState<TdmListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedTdm, setSelectedTdm] = useState<TdmListItem | null>(null);
  const [tdmDetails, setTdmDetails] = useState<TdmDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const fetchTDMs = async () => {
    setLoading(true);
    setError(null);
    setSelectedTdm(null);
    setTdmDetails(null);
    try {
      const response = await fetch(
        "https://api-gateway.getnuvo.com/dp/api/v1/tdm",
        {
          headers: {
            Authorization: `Bearer ${accessToken || ""}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch TDMs");
      const result = await response.json();
      setTdms(result.data || []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const fetchTdmDetails = async (tdm: TdmListItem) => {
    setSelectedTdm(tdm);
    setLoadingDetails(true);
    setError(null);
    setTdmDetails(null);
    try {
      const response = await fetch(
        `https://api-gateway.getnuvo.com/dp/api/v1/tdm/${tdm.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken || ""}`,
            Accept: "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch TDM details");
      const result = await response.json();
      // Some APIs return { data: {...} }
      setTdmDetails(result.data || result);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoadingDetails(false);
    }
  };

  const backToList = () => {
    setSelectedTdm(null);
    setTdmDetails(null);
  };

  const isRequired = (validations?: Array<{ validate: string }>) => {
    if (!validations) return false;
    return validations.some((v) => (v?.validate || "").toLowerCase() === "required");
  };

  return (
    <div className="component-container">
      <h2>Target Data Models</h2>

      <div className="form">
        <button
          onClick={fetchTDMs}
          className="button"
          disabled={loading || !accessToken}
        >
          {loading ? "Loading..." : "Fetch TDMs"}
        </button>

        {selectedTdm && (
          <button
            onClick={backToList}
            className="button"
            style={{ marginLeft: "8px", background: "#2b3a5b" }}
          >
            ← Back to list
          </button>
        )}
      </div>

      {error && <div className="error-box">{error}</div>}

      {!selectedTdm && tdms.length > 0 && (
        <div className="table-container">
          <table className="dark-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Type</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {tdms.map((tdm) => (
                <tr
                  key={tdm.id}
                  className="clickable-row"
                  onClick={() => fetchTdmDetails(tdm)}
                >
                  <td>{tdm.name || "—"}</td>
                  <td>{tdm.id}</td>
                  <td>{tdm.type || "—"}</td>
                  <td>
                    {tdm.createdAt ? new Date(tdm.createdAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedTdm && (
        <div style={{ marginTop: "1rem" }}>
          <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>
            {tdmDetails?.name || selectedTdm.name || "TDM Details"}
          </h3>
          <p style={{ color: "#9fb4d9", marginTop: 0 }}>
            <strong>ID:</strong> {selectedTdm.id}
            {tdmDetails?.type ? <> &nbsp;·&nbsp; <strong>Type:</strong> {tdmDetails.type}</> : null}
            {tdmDetails?.updatedAt ? (
              <> &nbsp;·&nbsp; <strong>Updated:</strong> {new Date(tdmDetails.updatedAt).toLocaleString()}</>
            ) : null}
          </p>

          {loadingDetails && <p style={{ color: "#fff" }}>Loading details...</p>}

          {!loadingDetails && tdmDetails?.columns?.length ? (
            <div className="table-container">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Label</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Options</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {tdmDetails.columns.map((col) => (
                    <tr key={col.key}>
                      <td>{col.key}</td>
                      <td>{col.label || "—"}</td>
                      <td>{col.columnType || "—"}</td>
                      <td>{isRequired(col.validations) ? "Yes" : "No"}</td>
                      <td>
                        {Array.isArray(col.dropdownOptions)
                          ? `${col.dropdownOptions.length}${col.isMultiSelect ? " (multi)" : ""}`
                          : "—"}
                      </td>
                      <td>{col.description || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !loadingDetails ? (
            <div className="white-box">
              <pre style={{ margin: 0 }}>
                {JSON.stringify(tdmDetails || selectedTdm, null, 2)}
              </pre>
            </div>
          ) : null}
        </div>
      )}

      {!loading && !selectedTdm && tdms.length === 0 && (
        <p style={{ color: "#fff", padding: "1rem" }}>No TDMs found.</p>
      )}
    </div>
  );
};

export default ReadTDMsComponent;