import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { CreateConnector } from "@getnuvo/pipelines-react";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const CreateConnectorComponent: React.FC = () => {
  const { accessToken } = useAuth();
  const [showEmbed, setShowEmbed] = useState(false);

  return (
    <div className="component-container">
      <h2>Create Connector (Embedded)</h2>

      <CreateConnector
        accessToken={accessToken || ""}
        configuration={{
          name: "",
        }}
        settings={{
          language: "en",
          modal: false,
        }}
        onConnectorCreate={({ data }) => {
          console.log("Connector created:", data);
        }}
        onClose={() => setShowEmbed(false)}
      />
    </div>
  );
};

export default CreateConnectorComponent;
