import React from "react";
import { useAuth } from "../auth/AuthContext";
import { PipelineList } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const PipelineListEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="component-container">
      <h2>Pipeline List (Embedded)</h2>
      <div className="embed-container">
        <PipelineList accessToken={accessToken || ""} />
      </div>
    </div>
  );
};

export default PipelineListEmbed;
