import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { PipelineDetails, PipelineList } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";

interface PipelineData {
  id: string;
  name: string;
}

const PipelineDetailsEmbed: React.FC = () => {
  const { accessToken } = useAuth();
  const [selectedPipelineId, setSelectedPipelineId] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string | null>(null);

  const handlePipelineSelect = ({ data }: { data: PipelineData }) => {
    if (data && data.id) {
      setSelectedPipelineId(data.id);
    }
  };

  const handleBackToList = () => {
    setSelectedPipelineId(null);
  };

  const renderContent = () => {
    if (selectedPipelineId) {
      return (
        <div>
          <button
            onClick={handleBackToList}
            className="button"
            style={{ marginBottom: "1rem", alignSelf: "flex-start" }}
          >
            &larr; Back to List
          </button>
          <PipelineDetails
            accessToken={accessToken || ""}
            pipelineId={selectedPipelineId}
            settings={{ modal: false }}
          />
          {/* Show ExecutionDetails if an execution is selected, otherwise show ExecutionList */}
          <div style={{ marginTop: "2rem" }}>
            {selectedExecutionId ? (
              <ExecutionDetails
                accessToken={accessToken || ""}
                executionId={selectedExecutionId}
                settings={{ i18nOverrides: {}, language: "en", modal: false }}
                onExecutionRun={({ data }) => {
                  // Optionally handle rerun result
                }}
                onClose={() => {
                  setSelectedExecutionId(null);
                }}
              />
            ) : (
              <ExecutionList
                accessToken={accessToken || ""}
                pipelineId={selectedPipelineId}
                settings={{ i18nOverrides: {}, language: "en", modal: false }}
                onExecutionView={({ data }: { data: { id: string } }) => {
                  setSelectedExecutionId(data.id);
                }}
                onClose={() => {
                  setSelectedExecutionId(null);
                }}
              />
            )}
          </div>
        </div>
      );
    }
    return (
      <PipelineList
        accessToken={accessToken || ""}
        onPipelineView={handlePipelineSelect}
        settings={{ modal: false }}
      />
    );
  };

  return (
    <div className="component-container">
      {error && <div className="error-box">{error}</div>}
      {renderContent()}
    </div>
  );
};

// Import ExecutionList and ExecutionDetails from @getnuvo/pipelines-react
import { ExecutionList, ExecutionDetails } from "@getnuvo/pipelines-react";

export default PipelineDetailsEmbed;