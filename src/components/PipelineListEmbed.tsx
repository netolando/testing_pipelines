import React from "react";
import { useAuth } from "../auth/AuthContext";
import { PipelineList } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const PipelineListEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="embeddable-container">
      <PipelineList
        accessToken={accessToken || ""}
        settings={{ modal: false }}
      />
    </div>
  );
};

export default PipelineListEmbed;
