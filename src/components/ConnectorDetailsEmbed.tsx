import React, { useState } from "react";
import { ConnectorDetails, ConnectorList } from "@getnuvo/pipelines-react";
import { useAuth } from "../auth/AuthContext";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

interface ConnectorData {
  id: string;
}

const ConnectorDetailsEmbed: React.FC = () => {
  const { accessToken } = useAuth();
  const [selectedConnectorId, setSelectedConnectorId] = useState<string | null>(null);

  return (
    <div className="component-container">
      {selectedConnectorId ? (
        <div>
          <button
            className="button"
            onClick={() => setSelectedConnectorId(null)}
            style={{ marginBottom: "1rem", alignSelf: "flex-start" }}
          >
            ← Back to List
          </button>
          <ConnectorDetails
            accessToken={accessToken || ""}
            connectorId={selectedConnectorId}
            settings={{ language: "en", modal: false }}
            onConnectorUpdate={({ data }: { data: unknown }) => {
              console.log("Connector updated:", data);
            }}
            onConnectorDelete={({ data }: { data: unknown }) => {
              console.log("Connector deleted:", data);
              setSelectedConnectorId(null);
            }}
            onClose={() => setSelectedConnectorId(null)}
          />
        </div>
      ) : (
        <ConnectorList
          accessToken={accessToken || ""}
          settings={{ language: "en", modal: false, allowConnectorCreation: false }}
          onConnectorView={({ data }: { data: ConnectorData }) => {
            setSelectedConnectorId(data.id);
          }}
          onClose={() => {
            console.log("Connector list closed");
          }}
        />
      )}
    </div>
  );
};

export default ConnectorDetailsEmbed;

