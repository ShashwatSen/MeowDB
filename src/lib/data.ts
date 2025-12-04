import type { Entry, HistoryEvent, User } from '@/lib/types';
import { subDays, subHours, subMinutes } from 'date-fns';

export const user: User = {
    name: 'Alex Doe',
    email: 'alex.doe@example.com',
    avatarUrl: 'https://picsum.photos/seed/user-avatar/100/100',
};

export const entries: Entry[] = [
  {
    id: 'db-prod-01',
    name: 'Production User Database',
    category: 'Databases',
    lastUpdated: subHours(new Date(), 2).toISOString(),
    version: 8,
    description: 'Main database for all production user accounts and profiles.',
    location: 'aws-us-east-1',
  },
  {
    id: 'doc-legal-q2-2024',
    name: 'Q2 2024 Legal Agreements',
    category: 'Documents',
    lastUpdated: subDays(new Date(), 1).toISOString(),
    version: 3,
    description: 'Signed legal agreements and contracts for the second quarter of 2024.',
    location: 'gcp-europe-west1',
  },
  {
    id: 'api-stripe-prod',
    name: 'Stripe Production Key',
    category: 'API Keys',
    lastUpdated: subDays(new Date(), 5).toISOString(),
    version: 2,
    description: 'Primary API key for interacting with the Stripe payment processing service.',
    location: 'internal-vault',
  },
  {
    id: 'data-customer-emails',
    name: 'Customer Email List (Active)',
    category: 'Customer Data',
    lastUpdated: subMinutes(new Date(), 15).toISOString(),
    version: 24,
    description: 'Export of all active customer email addresses for marketing campaigns.',
    location: 'gcp-us-central1',
  },
    {
    id: 'db-analytics-01',
    name: 'Analytics Event Warehouse',
    category: 'Databases',
    lastUpdated: subHours(new Date(), 8).toISOString(),
    version: 12,
    description: 'Data warehouse for all user interaction and analytics events.',
    location: 'aws-us-west-2',
  },
  {
    id: 'doc-onboarding-v2',
    name: 'Employee Onboarding Guide v2.1',
    category: 'Documents',
    lastUpdated: subDays(new Date(), 14).toISOString(),
    version: 4,
    description: 'Latest version of the new hire onboarding documentation.',
    location: 'gcp-europe-west1',
  },
];

export const history: { [key: string]: HistoryEvent[] } = {
  'db-prod-01': [
    {
      id: 'hist-1',
      type: 'UPDATE',
      user: { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/jane/40/40' },
      timestamp: subHours(new Date(), 2).toISOString(),
      details: 'Updated schema: added `last_login_ip` to users table.',
    },
    {
      id: 'hist-2',
      type: 'ROLLBACK',
      user: { name: 'Admin', avatarUrl: 'https://picsum.photos/seed/admin/40/40' },
      timestamp: subDays(new Date(), 2).toISOString(),
      details: 'Rolled back to version 6 due to performance degradation.',
    },
    {
      id: 'hist-3',
      type: 'UPDATE',
      user: { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/jane/40/40' },
      timestamp: subDays(new Date(), 2).toISOString(),
      details: 'Deployed new indexing strategy for `orders` table.',
    },
    {
      id: 'hist-4',
      type: 'CREATE',
      user: { name: 'Alex Doe', avatarUrl: 'https://picsum.photos/seed/alex/40/40' },
      timestamp: subDays(new Date(), 30).toISOString(),
      details: 'Initial creation of the production user database.',
    },
  ],
  // Add history for other entries if needed
};

export function getEntries(query?: string, category?: string): Entry[] {
  let filteredEntries = [...entries];

  if (query) {
    filteredEntries = filteredEntries.filter(entry =>
      entry.name.toLowerCase().includes(query.toLowerCase()) ||
      entry.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category && category !== 'all') {
    filteredEntries = filteredEntries.filter(entry => entry.category === category);
  }

  return filteredEntries.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());
}


export function getEntryById(id: string): Entry | undefined {
  return entries.find(entry => entry.id === id);
}

export function getHistoryByEntryId(id:string): HistoryEvent[] {
    return history[id] || [];
}
