import React from "react";
import { useAuth } from "../auth/AuthContext";
import { CreatePipeline } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const CreatePipelineEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return (
      <div className="component-container">
        <h2>Create Pipeline (Embedded)</h2>
        <p style={{ color: "#fff" }}>
          Please authenticate first to create a pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className="component-container">
      <h2>Create Pipeline (Embedded)</h2>
      <div className="embed-container">
        <CreatePipeline
          accessToken={accessToken}
          settings={{ modal: true }}
        />
      </div>
    </div>
  );
};

export default CreatePipelineEmbed;