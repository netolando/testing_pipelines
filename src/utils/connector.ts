import { Connector } from "../types";

const BASE_URL = "https://api-gateway.getnuvo.com/dp/api/v1";

const apiRequest = async (
  endpoint: string,
  method: string,
  accessToken: string,
  body: any = null
): Promise<any> => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data?.message || response.statusText || "Unknown error";
    throw new Error(`API Error: ${errorMsg}`);
  }

  return data;
};

export const createConnector = async (
  connectorData: Partial<Connector>,
  accessToken: string
): Promise<Connector> => {
  const response = await apiRequest(
    "/connector",
    "POST",
    accessToken,
    connectorData
  );
  return response.data;
};

export const readConnectors = async (
  accessToken: string
): Promise<Connector[]> => {
  const response = await apiRequest("/connector", "GET", accessToken);
  return response.data;
};
