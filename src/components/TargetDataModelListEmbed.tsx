import React from "react";
import { TargetDataModelList } from "@getnuvo/pipelines-react";
import { useAuth } from "../auth/AuthContext";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const TargetDataModelListEmbed: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <div className="component-container">
      <TargetDataModelList
        accessToken={accessToken || ""}
        settings={{ language: "en", modal: false, allowTargetDataModelCreation: false }}
        onTargetDataModelView={({ data }: { data: unknown }) => {
          console.log("TDM selected:", data);
        }}
        onTargetDataModelCreate={() => {
          console.log("TDM creation triggered");
        }}
        onClose={() => {
          console.log("TDM list closed");
        }}
      />
    </div>
  );
};

export default TargetDataModelListEmbed;

