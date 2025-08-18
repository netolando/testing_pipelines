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

export default PipelineDetailsEmbed;