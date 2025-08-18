export interface Connector {
  id: string;
  name: string;
  type: string;
  node_type: string;
  trigger_type: string;
  createdAt: string;
  updatedAt: string;
  created_by: {
    id: string;
    name: string;
    identifier: string;
    type: string;
  };
  updated_by: {
    id: string;
    name: string;
    identifier: string;
    type: string;
  };
}
