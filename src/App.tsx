import React, { useState } from "react";
import AccessTokenComponent from "./components/AccessTokenComponent";
import CreateConnectorComponent from "./components/CreateConnectorComponent";
import ReadConnectorComponent from "./components/ReadConnectorComponent";
import DeleteConnectorComponent from "./components/DeleteConnectorComponent";
import CreateTDMComponent from "./components/CreateTDMComponent";
import ReadTDMsComponent from "./components/ReadTDMsComponent";
import ReadUsersComponent from "./components/ReadUsersComponent";
import CreatePipelineEmbed from "./components/CreatePipelineEmbed";
import PipelineDetailsEmbed from "./components/PipelineDetailsEmbed";
import FileUploadEmbeddable from "./components/FileUploadEmbeddable";
import ConnectorDetailsEmbed from "./components/ConnectorDetailsEmbed";
import TargetDataModelDetailsEmbed from "./components/TargetDataModelDetailsEmbed";
import LogoDarkblue from "./assets/Logo_Darkblue.svg";
import { useAuth } from "./auth/AuthContext";
import AuthModal from "./auth/AuthModal";

import "./styles.css";

// Sidebar button styled using global classes
const SidebarButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button onClick={onClick} className={`sidebar-button${active ? " active" : ""}`}> 
    {label}
  </button>
);

const SidebarSection: React.FC<{
  label: string;
  open: boolean;
  onClick: () => void;
  buttons: { label: string; active: boolean; onClick: () => void }[];
}> = ({ label, open, onClick, buttons }) => (
  <div className="sidebar-section">
    <button onClick={onClick} className={`sidebar-section-toggle${open ? " open" : ""}`}>
      {label}
    </button>
    {open && (
      <div className="sidebar-submenu">
        {buttons.map((btn) => (
          <SidebarButton key={btn.label} {...btn} />
        ))}
      </div>
    )}
  </div>
);

const App: React.FC = () => {
  const { accessToken, userName } = useAuth();
  const [activeTab, setActiveTab] = useState("AccessToken");
  const [openSection, setOpenSection] = useState<string | null>(null);

  // Removed code that forcibly hides parts of the embedded pipeline component

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "AccessToken":
        return <AccessTokenComponent />;
      case "CreateConnector":
        return <CreateConnectorComponent />;
      case "ReadConnector":
        return <ReadConnectorComponent />;
      case "DeleteConnector":
        return <DeleteConnectorComponent />;
      case "CreateTDM":
        return <CreateTDMComponent />;
      case "ReadTDMs":
        return <ReadTDMsComponent />;
      case "ReadUsers":
        return <ReadUsersComponent />;
      case "CreatePipeline":
        return <CreatePipelineEmbed />;
      case "PipelineDetails":
        return <PipelineDetailsEmbed />;
      case "FileUpload":
        return <FileUploadEmbeddable />;
      case "ConnectorDetails":
        return <ConnectorDetailsEmbed />;
      case "TargetDataModelDetails":
        return <TargetDataModelDetailsEmbed />;
      default:
        return null;
    }
  };

  if (!accessToken) {
    return <AuthModal />;
  }

  const handleCopyToken = () => {
    navigator.clipboard.writeText(accessToken);
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <span className="user-name">{userName}</span>
        <button className="button copy-token-button" onClick={handleCopyToken}>Copy Token</button>
      </div>
      <aside className="sidebar">
            <div className="sidebar-logo-container">
              <img
                src={LogoDarkblue}
                alt="Ingestro Logo"
                className="sidebar-logo-img"
              />
            </div>

            <SidebarButton
              active={activeTab === "AccessToken"}
              onClick={() => setActiveTab("AccessToken")}
              label="Access Token"
            />

            <SidebarSection
              label="Connectors"
              open={openSection === "Connectors"}
              onClick={() => toggleSection("Connectors")}
              buttons={[
                { label: "Create", active: activeTab === "CreateConnector", onClick: () => setActiveTab("CreateConnector") },
                { label: "Read", active: activeTab === "ReadConnector", onClick: () => setActiveTab("ReadConnector") },
                { label: "Delete", active: activeTab === "DeleteConnector", onClick: () => setActiveTab("DeleteConnector") },
                { label: "Details", active: activeTab === "ConnectorDetails", onClick: () => setActiveTab("ConnectorDetails") },
              ]}
            />

            <SidebarSection
              label="TDMs"
              open={openSection === "TDMs"}
              onClick={() => toggleSection("TDMs")}
              buttons={[
                { label: "Create", active: activeTab === "CreateTDM", onClick: () => setActiveTab("CreateTDM") },
                { label: "Read", active: activeTab === "ReadTDMs", onClick: () => setActiveTab("ReadTDMs") },
                { label: "Details", active: activeTab === "TargetDataModelDetails", onClick: () => setActiveTab("TargetDataModelDetails") },
              ]}
            />

            <SidebarButton
              active={activeTab === "ReadUsers"}
              onClick={() => setActiveTab("ReadUsers")}
              label="Users"
            />

            <SidebarSection
              label="Pipelines"
              open={openSection === "Pipelines"}
              onClick={() => toggleSection("Pipelines")}
              buttons={[
                { label: "Create", active: activeTab === "CreatePipeline", onClick: () => setActiveTab("CreatePipeline") },
                { label: "Details", active: activeTab === "PipelineDetails", onClick: () => setActiveTab("PipelineDetails") },
              ]}
            />


            <SidebarButton
              active={activeTab === "FileUpload"}
              onClick={() => setActiveTab("FileUpload")}
              label="File Upload"
            />
      </aside>

      <main className="main-content">
            {["CreatePipeline", "PipelineDetails", "FileUpload", "ConnectorDetails", "TargetDataModelDetails"].includes(activeTab) ? (
              <div className="embed-container">
                {renderTabContent()}
              </div>
            ) : (
              <div className="content-box">
                {renderTabContent()}
              </div>
            )}
      </main>
    </div>
  );
};

export default App;