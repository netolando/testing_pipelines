import React from "react";
import { ConnectorList } from "@getnuvo/pipelines-react";
import { useAuth } from "../auth/AuthContext";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const ConnectorListEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="component-container">
      <ConnectorList
        accessToken={accessToken || ""}
        settings={{ language: "en", modal: false, allowConnectorCreation: false }}
        onConnectorView={({ data }: { data: unknown }) => {
          console.log("Connector selected:", data);
        }}
        onConnectorCreate={() => {
          console.log("Connector creation triggered");
        }}
        onClose={() => {
          console.log("Connector list closed");
        }}
      />
    </div>
  );
};

export default ConnectorListEmbed;

