import React from "react";
import { useAuth } from "../auth/AuthContext";
import { ExecutionDetails } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const ExecutionDetailsEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="component-container">
      <ExecutionDetails
        accessToken={accessToken || ""}
        settings={{ modal: false }}
      />
    </div>
  );
};

export default ExecutionDetailsEmbed;
