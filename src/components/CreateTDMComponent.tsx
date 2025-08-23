import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { CreateTargetDataModel, TargetDataModelDetails } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";

const CreateTDMComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [createdTdmId, setCreatedTdmId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="embeddable-resizable-box">
      {showDetails && createdTdmId ? (
        <div className="embeddable-content">
          <TargetDataModelDetails
            accessToken={accessToken || ""}
            targetDataModelId={createdTdmId}
            settings={{ i18nOverrides: {}, language: "en", modal: false }}
            onTargetDataModelUpdate={({ data }) => { }}
            onTargetDataModelDelete={({ data }) => {
              setShowDetails(false);
              setCreatedTdmId(null);
            }}
            onClose={() => {
              setShowDetails(false);
              setCreatedTdmId(null);
            }}
          />
        </div>
      ) : (
        <div className="embeddable-content">
          <CreateTargetDataModel
            accessToken={accessToken || ""}
            configuration={{}}
            settings={{ modal: false }}
            onTargetDataModelCreate={async () => {
              try {
                const response = await fetch("https://api-gateway.ingestro.com/dp/api/v1/tdm/", {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${accessToken || ""}`,
                    Accept: "application/json",
                  },
                });
                const result = await response.json();
                const tdmList = result?.data || [];
                if (tdmList.length > 0) {
                  // Get the newest TDM by created_at
                  const newestTdm = tdmList.reduce((latest: any, item: any) => {
                    return new Date(item.created_at) > new Date(latest.created_at) ? item : latest;
                  }, tdmList[0]);
                  setCreatedTdmId(newestTdm.id);
                  setShowDetails(true);
                }
              } catch (err) {
                // Optionally handle error
              }
            }}
            onClose={() => { }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateTDMComponent;
