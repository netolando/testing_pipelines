import React from "react";
import { useAuth } from "../auth/AuthContext";
import { ExecutionDetails } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const ExecutionDetailsEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="component-container">
      <h2>Execution Details (Embedded)</h2>
      <div className="embed-container">
        <ExecutionDetails accessToken={accessToken || ""} />
      </div>
    </div>
  );
};

export default ExecutionDetailsEmbed;
