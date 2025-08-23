// src/components/ExecutionListEmbed.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { ExecutionDetails } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

interface Pipeline {
  id: string;
  name: string;
  active: boolean;
  created_at?: string;
}

interface Execution {
  id: string;
  pipeline: string;
  status: string;
  trigger_type: string;
  created_at?: string;
}

const ExecutionListEmbed: React.FC = () => {
  const { accessToken } = useAuth();
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [selectedPipeline, setSelectedPipeline] = useState<Pipeline | null>(null);
  const [selectedExecution, setSelectedExecution] = useState<Execution | null>(null);
  const [loadingPipelines, setLoadingPipelines] = useState(false);
  const [loadingExecutions, setLoadingExecutions] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetchPipelines();
    }
  }, [accessToken]);

  const fetchPipelines = async () => {
    setLoadingPipelines(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api-gateway.getnuvo.com/dp/api/v1/pipeline",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch pipelines");
      const data = await res.json();
      setPipelines(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingPipelines(false);
    }
  };

  const fetchExecutions = async (pipelineId: string) => {
    setLoadingExecutions(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api-gateway.getnuvo.com/dp/api/v1/execution?filters[pipeline]=${pipelineId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch executions");
      const data = await res.json();
      setExecutions(data.data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingExecutions(false);
    }
  };

  const handlePipelineSelect = (p: Pipeline) => {
    setSelectedPipeline(p);
    setSelectedExecution(null);
    fetchExecutions(p.id);
  };

  const handleExecutionSelect = (e: Execution) => {
    setSelectedExecution(e);
  };

  const handleBackToPipelines = () => {
    setSelectedPipeline(null);
    setExecutions([]);
    setSelectedExecution(null);
  };

  const handleBackToExecutions = () => {
    setSelectedExecution(null);
  };

  if (!accessToken) {
    return (
      <div className="embeddable-container">
        <p style={{ color: "#fff" }}>Please authenticate first.</p>
      </div>
    );
  }

  return (
    <div className="embeddable-container">
      {error && <div className="error-box">{error}</div>}

      {!selectedPipeline && !selectedExecution && (
        <>
          {loadingPipelines ? (
            <p style={{ color: "#fff" }}>Loading pipelines...</p>
          ) : (
            <div className="table-container">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Active</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {pipelines.map((p) => (
                    <tr
                      key={p.id}
                      className="clickable-row"
                      onClick={() => handlePipelineSelect(p)}
                    >
                      <td>{p.name}</td>
                      <td>{p.active ? "Yes" : "No"}</td>
                      <td>
                        {p.created_at
                          ? new Date(p.created_at).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {selectedPipeline && !selectedExecution && (
        <>
          <button
            className="button"
            onClick={handleBackToPipelines}
            style={{ marginBottom: "1rem", alignSelf: "flex-start" }}
          >
            ← Back to Pipelines
          </button>
          {loadingExecutions ? (
            <p style={{ color: "#fff" }}>Loading executions...</p>
          ) : executions.length ? (
            <div className="table-container">
              <table className="dark-table">
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Trigger</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {executions.map((e) => (
                    <tr
                      key={e.id}
                      className="clickable-row"
                      onClick={() => handleExecutionSelect(e)}
                    >
                      <td>{e.status}</td>
                      <td>{e.trigger_type}</td>
                      <td>
                        {e.created_at
                          ? new Date(e.created_at).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ color: "#fff" }}>
              No executions found for this pipeline.
            </p>
          )}
        </>
      )}

      {selectedExecution && (
        <>
          <button
            className="button"
            onClick={handleBackToExecutions}
            style={{ marginBottom: "1rem", alignSelf: "flex-start" }}
          >
            ← Back to Executions
          </button>
          <ExecutionDetails
            accessToken={accessToken}
            executionId={selectedExecution.id}
            settings={{ modal: false }}
          />
        </>
      )}
    </div>
  );
};

export default ExecutionListEmbed;