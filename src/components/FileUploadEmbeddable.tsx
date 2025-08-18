import React, { useState, useEffect } from "react";
import { FileUploader } from "@getnuvo/pipelines-react";
import { useAuth } from "../auth/AuthContext";
import "@getnuvo/pipelines-react/index.css";
import "../styles.css";

const FileUploadEmbeddable: React.FC = () => {
    const { accessToken } = useAuth();
    const [connectors, setConnectors] = useState<any[]>([]);
    const [selectedConnectorId, setSelectedConnectorId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;
        setLoading(true);
        setError(null);
        fetch("https://api-gateway.getnuvo.com/dp/api/v1/connector", {
            headers: {
                Authorization: accessToken,
                Accept: "application/json",
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch connectors");
                return res.json();
            })
            .then((data) => {
                setConnectors(data.data || []);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [accessToken]);

    return (
        <div className="component-container">
            <h2>File Upload Embeddable</h2>
            {error && <div className="error-box">{error}</div>}
            <div className="form">
                <label htmlFor="connector-select" style={{ fontWeight: 600, marginBottom: 8 }}>
                    Select Input Connector:
                </label>
                <select
                    id="connector-select"
                    className="input"
                    value={selectedConnectorId}
                    onChange={(e) => setSelectedConnectorId(e.target.value)}
                    disabled={loading || connectors.length === 0}
                >
                    <option value="">-- Select Connector --</option>
                    {connectors.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name} ({c.type})
                        </option>
                    ))}
                </select>
            </div>
            {selectedConnectorId && (
                <div style={{ marginTop: 32 }}>
                    <FileUploader
                        accessToken={accessToken || ""}
                        inputConnectorId={selectedConnectorId}
                        settings={{
                            i18nOverrides: {},
                            language: "en",
                            modal: true,
                            allowedFileTypes: ["csv", "tsv", "xls", "xlsx", "json", "xml"],
                        }}
                        onExecutionView={({ execution }) => {
                            console.log("Selected execution:", execution);
                        }}
                        onClose={() => {
                            setSelectedConnectorId("");
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default FileUploadEmbeddable;
