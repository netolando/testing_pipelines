import React, { useState, useEffect } from "react";
import AccessTokenComponent from "./components/AccessTokenComponent";
import CreateConnectorComponent from "./components/CreateConnectorComponent";
import ReadConnectorComponent from "./components/ReadConnectorComponent";
import DeleteConnectorComponent from "./components/DeleteConnectorComponent";
import CreateTDMComponent from "./components/CreateTDMComponent";
import ReadTDMsComponent from "./components/ReadTDMsComponent";
import ReadUsersComponent from "./components/ReadUsersComponent";
import CreatePipelineEmbed from "./components/CreatePipelineEmbed";
import ExecutionListEmbed from "./components/ExecutionListEmbed";
import ExecutionDetailsEmbed from "./components/ExecutionDetailsEmbed";
import PipelineListEmbed from "./components/PipelineListEmbed";
import PipelineDetailsEmbed from "./components/PipelineDetailsEmbed";
import FileUploadEmbeddable from "./components/FileUploadEmbeddable";
import { AuthProvider } from "./auth/AuthContext";
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
  const [activeTab, setActiveTab] = useState("AccessToken");
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

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
      case "ExecutionList":
        return <ExecutionListEmbed />;
      case "ExecutionDetails":
        return <ExecutionDetailsEmbed />;
      case "PipelineList":
        return <PipelineListEmbed />;
      case "PipelineDetails":
        return <PipelineDetailsEmbed />;
      case "FileUpload":
        return <FileUploadEmbeddable />;
      default:
        return null;
    }
  };

  return (
    <AuthProvider>
      {!authenticated && (
        <AuthModal onAuthenticated={() => setAuthenticated(true)} />
      )}
      {authenticated && (
        <div className="app-container">
          <aside className="sidebar">
            <div className="sidebar-logo-container">
              <img
                src="src/public/Logo_Darkblue.svg"
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
              ]}
            />

            <SidebarSection
              label="TDMs"
              open={openSection === "TDMs"}
              onClick={() => toggleSection("TDMs")}
              buttons={[
                { label: "Create", active: activeTab === "CreateTDM", onClick: () => setActiveTab("CreateTDM") },
                { label: "Read", active: activeTab === "ReadTDMs", onClick: () => setActiveTab("ReadTDMs") },
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
                { label: "List", active: activeTab === "PipelineList", onClick: () => setActiveTab("PipelineList") },
                { label: "Details", active: activeTab === "PipelineDetails", onClick: () => setActiveTab("PipelineDetails") },
              ]}
            />

            <SidebarSection
              label="Execution"
              open={openSection === "Execution"}
              onClick={() => toggleSection("Execution")}
              buttons={[
                { label: "List", active: activeTab === "ExecutionList", onClick: () => setActiveTab("ExecutionList") },
                { label: "Details", active: activeTab === "ExecutionDetails", onClick: () => setActiveTab("ExecutionDetails") },
              ]}
            />

            <SidebarButton
              active={activeTab === "FileUpload"}
              onClick={() => setActiveTab("FileUpload")}
              label="File Upload"
            />
          </aside>

          <main className="main-content">
            {["CreatePipeline", "PipelineList", "PipelineDetails", "ExecutionList", "ExecutionDetails"].includes(activeTab) ? (
              <div className="embed-container">
                {renderTabContent()}
              </div>
            ) : (
              <div className="content-box">
                <h1 className="content-title">
                  {{
                    AccessToken: "Access Token",
                    CreateConnector: "Create Connector",
                    ReadConnector: "Read Connectors",
                    DeleteConnector: "Delete Connector",
                    CreateTDM: "Create TDM",
                    ReadTDMs: "Read TDMs",
                    ReadUsers: "Read Users",
                    CreatePipeline: "Create Pipeline",
                    PipelineList: "Pipeline List",
                    PipelineDetails: "Pipeline Details",
                    ExecutionList: "Execution List",
                    ExecutionDetails: "Execution Details",
                  }[activeTab] || "App"}
                </h1>
                {renderTabContent()}
              </div>
            )}
          </main>
        </div>
      )}
    </AuthProvider>
  );
};

export default App;