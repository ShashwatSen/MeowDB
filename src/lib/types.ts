export type Entry = {
  id: string;
  name: string;
  category: 'Databases' | 'Documents' | 'API Keys' | 'Customer Data';
  lastUpdated: string;
  version: number;
  description: string;
  location: string;
};

export type HistoryEvent = {
  id: string;
  type: 'CREATE' | 'UPDATE' | 'DELETE' | 'ROLLBACK';
  user: {
    name: string;
    avatarUrl: string;
  };
  timestamp: string;
  details: string;
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
};
