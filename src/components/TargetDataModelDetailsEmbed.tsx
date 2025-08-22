import React, { useState } from "react";
import { TargetDataModelDetails, TargetDataModelList } from "@getnuvo/pipelines-react";
import { useAuth } from "../auth/AuthContext";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

interface TdmData {
  id: string;
}

const TargetDataModelDetailsEmbed: React.FC = () => {
  const { accessToken } = useAuth();
  const [selectedTdmId, setSelectedTdmId] = useState<string | null>(null);

  return (
    <div className="component-container">
      {selectedTdmId ? (
        <div>
          <button
            className="button"
            onClick={() => setSelectedTdmId(null)}
            style={{ marginBottom: "1rem", alignSelf: "flex-start" }}
          >
            ← Back to List
          </button>
          <TargetDataModelDetails
            accessToken={accessToken || ""}
            targetDataModelId={selectedTdmId}
            settings={{ language: "en", modal: false }}
            onTargetDataModelUpdate={({ data }: { data: unknown }) => {
              console.log("TDM updated:", data);
            }}
            onTargetDataModelDelete={({ data }: { data: unknown }) => {
              console.log("TDM deleted:", data);
              setSelectedTdmId(null);
            }}
            onClose={() => setSelectedTdmId(null)}
          />
        </div>
      ) : (
        <TargetDataModelList
          accessToken={accessToken || ""}
          settings={{ language: "en", modal: false, allowTargetDataModelCreation: false }}
          onTargetDataModelView={({ data }: { data: TdmData }) => {
            setSelectedTdmId(data.id);
          }}
          onClose={() => {
            console.log("TDM list closed");
          }}
        />
      )}
    </div>
  );
};

export default TargetDataModelDetailsEmbed;

