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
const SidebarButton: React.FC<{ active: boolean; onClick: () => void; label: string; className?: string }> = ({ active, onClick, label, className }) => (
  <button
    onClick={onClick}
    className={
      className
        ? `sidebar-button ${className}`
        : `sidebar-button${active ? " active" : ""}`
    }
  >
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
  const { accessToken, userName, setAccessToken, setUserName } = useAuth();
  console.log('[App] accessToken:', accessToken);
  console.log('[App] userName:', userName);
  const [activeTab, setActiveTab] = useState("AccessToken");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    console.log('[App] Toggling section:', section);
    setOpenSection((prev) => (prev === section ? null : section));
  };

  const renderTabContent = () => {
    console.log('[App] Rendering tab:', activeTab);
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
    console.log('[App] No accessToken, showing AuthModal');
    return <AuthModal />;
  }

  const handleCopyToken = () => {
    console.log('[App] Copying token:', accessToken);
    navigator.clipboard.writeText(accessToken);
  };

  const handleLogout = () => {
    setAccessToken("");
    setUserName("");
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');
  };

  return (
    <div className="app-container">
      <div className="top-bar">
        <span className="user-name">{userName}</span>
        <button className="copy-token-button" onClick={handleCopyToken}>
          Copy Token
        </button>
      </div>
      <aside className="sidebar">
        <div className="sidebar-logo-container">
          <img src={LogoDarkblue} alt="Ingestro Logo" className="sidebar-logo-img" />
        </div>

        <SidebarButton
          active={activeTab === "AccessToken"}
          onClick={() => setActiveTab("AccessToken")}
          label="Access Token"
        />
        {/* Home section */}
        <SidebarButton
          active={activeTab === "Home"}
          onClick={() => setActiveTab("Home")}
          label="Home"
        />

        <SidebarSection
          label="Connectors"
          open={openSection === "Connectors"}
          onClick={() => toggleSection("Connectors")}
          buttons={[
            {
              label: "Create",
              active: activeTab === "CreateConnector",
              onClick: () => setActiveTab("CreateConnector"),
            },
            {
              label: "Details",
              active: activeTab === "ConnectorDetails",
              onClick: () => setActiveTab("ConnectorDetails"),
            },
          ]}
        />

        <SidebarSection
          label="TDMs"
          open={openSection === "TDMs"}
          onClick={() => toggleSection("TDMs")}
          buttons={[
            {
              label: "Create",
              active: activeTab === "CreateTDM",
              onClick: () => setActiveTab("CreateTDM"),
            },
            {
              label: "Details",
              active: activeTab === "TargetDataModelDetails",
              onClick: () => setActiveTab("TargetDataModelDetails"),
            },
          ]}
        />

        {/* Users section removed */}
        {/* Users section hidden */}
        {/* <SidebarButton
          active={activeTab === "ReadUsers"}
          onClick={() => setActiveTab("ReadUsers")}
          label="Users"
        /> */}

        <SidebarSection
          label="Pipelines"
          open={openSection === "Pipelines"}
          onClick={() => toggleSection("Pipelines")}
          buttons={[
            {
              label: "Create",
              active: activeTab === "CreatePipeline",
              onClick: () => setActiveTab("CreatePipeline"),
            },
            {
              label: "Details",
              active: activeTab === "PipelineDetails",
              onClick: () => setActiveTab("PipelineDetails"),
            },
          ]}
        />

        <SidebarButton
          active={activeTab === "FileUpload"}
          onClick={() => setActiveTab("FileUpload")}
          label="File Upload"
        />

        {/* Logout button at bottom, centered */}
        {/* Log Out button at bottom, centered */}
        <div className="sidebar-logout-container">
          <SidebarButton
            active={false}
            onClick={handleLogout}
            label="Log Out"
            className="logout-button"
          />
        </div>
      </aside>

      <main className="main-content">
        {activeTab === "Home" ? (
          <div className="embed-container">{renderTabContent()}</div>
        ) : (
          <div className="content-box">{renderTabContent()}</div>
        )}
      </main>
    </div>
  );
};

export default App;