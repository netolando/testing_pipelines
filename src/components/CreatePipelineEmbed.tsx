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
        <p style={{ color: "#fff" }}>
          Please authenticate first to create a pipeline.
        </p>
      </div>
    );
  }

  return (
    <div className="component-container">
      <CreatePipeline
        accessToken={accessToken}
        configuration={{
          tdmId: "68a38fe6ba7ddf8a13335f6b",
          outputConnectorId: "683054fd65dd47b2d44f4524",
        }}
        settings={{
          modal: false,
          runPipelineOnCreation: true,
        }}
      />
    </div>
  );
};

export default CreatePipelineEmbed;