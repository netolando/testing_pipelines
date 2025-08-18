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

// Sidebar button styled like the provided design
const SidebarButton: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      height: '48px',
      borderRadius: '12px',
      background: active ? '#2563eb' : '#fff',
      color: active ? '#fff' : '#162338',
      fontWeight: 700,
      fontFamily: "'Inter', 'Haffer Regular', Arial, sans-serif",
      fontSize: '1rem',
      border: 'none',
      margin: '0 auto',
      marginBottom: '8px',
      boxShadow: active ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
      cursor: 'pointer',
      transition: 'background 0.2s, color 0.2s',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
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
  <div style={{ width: '100%' }}>
    <button
      onClick={onClick}
      style={{
        width: '100%',
        height: '48px',
        borderRadius: '12px',
        background: open ? '#2563eb' : '#fff',
        color: open ? '#fff' : '#162338',
        fontWeight: 700,
        fontFamily: "'Inter', 'Haffer Regular', Arial, sans-serif",
        fontSize: '1rem',
        border: 'none',
        margin: '0 auto',
        marginBottom: '8px',
        boxShadow: open ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
        cursor: 'pointer',
        transition: 'background 0.2s, color 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {label}
    </button>
    {open && (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginLeft: '0', marginTop: '4px' }}>
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

  useEffect(() => {
    const applyStyles = () => {
      const input = document.querySelector('.nuvo__transformation-input');
      if (input) input.style.display = 'none';

      const transformation = document.querySelector('.nuvo__transformation-transformation');
      if (transformation) transformation.style.display = 'none';

      const mappings = document.querySelector('.nuvo__transformation-mappings');
      const container = document.querySelector('.wide-content');
      if (mappings && container) {
        const containerWidth = container.clientWidth;
        mappings.style.minWidth = `${containerWidth / 2}px`;
      }
    };

    applyStyles();

    const observer = new MutationObserver(() => {
      applyStyles();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

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
        <div style={{ background: '#162338', minHeight: '100vh', width: '100vw', display: 'flex' }}>
          <aside
            style={{
              width: '8%',
              minWidth: '120px',
              maxWidth: '220px',
              background: '#fff',
              boxShadow: '2px 0 12px rgba(0,0,0,0.07)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '24px 0',
              gap: '16px',
              fontFamily: "'Inter', 'Haffer Regular', Arial, sans-serif",
            }}
          >
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

          <main style={{ flex: 1, padding: '0', marginLeft: '8%', minHeight: '100vh', background: '#162338', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', fontFamily: "'Inter', 'Haffer Regular', Arial, sans-serif" }}>
            {["CreatePipeline", "PipelineList", "PipelineDetails", "ExecutionList", "ExecutionDetails"].includes(activeTab) ? (
              <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                {renderTabContent()}
              </div>
            ) : (
              <div className="main-box" style={{ background: '#fff', color: '#162338', marginTop: '48px', borderRadius: '16px', boxShadow: '0 12px 30px rgba(0,0,0,0.07)', width: '90%', maxWidth: '900px', padding: '48px 40px', fontFamily: "'Inter', 'Haffer Regular', Arial, sans-serif" }}>
                <h1 style={{ fontFamily: 'Haffer Regular', fontWeight: 700, fontSize: '2rem', color: '#162338', marginBottom: '2rem' }}>
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