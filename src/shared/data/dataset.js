/**
 * ResearchSphere Shared Dataset
 * Single source of truth across all 4 phases.
 * Loaded once and exported for all algorithms and visual demos.
 */

export const RESEARCHERS = [
  { id: 1, name: 'Hanna Neelu', department: 'Data Science', institution: 'KJU', publications: 8, citations: 42, year: 2021 },
  { id: 2, name: 'Arjun Kumar', department: 'Computer Science', institution: 'KJU', publications: 5, citations: 27, year: 2023 },
  { id: 3, name: 'Meera Sharma', department: 'Computer Science', institution: 'KJU', publications: 12, citations: 61, year: 2019 },
  { id: 4, name: 'Rahul Thomas', department: 'Data Science', institution: 'KJU', publications: 9, citations: 35, year: 2020 },
  { id: 5, name: 'Ishita Rao', department: 'Biotechnology', institution: 'Bengaluru Institute', publications: 3, citations: 14, year: 2024 },
  { id: 6, name: 'Vikram Das', department: 'Electronics', institution: 'Bengaluru Institute', publications: 7, citations: 30, year: 2022 },
  { id: 7, name: 'Nisha George', department: 'Computer Science', institution: 'National Research Lab', publications: 10, citations: 52, year: 2018 },
  { id: 8, name: 'Kabir Shah', department: 'Data Science', institution: 'National Research Lab', publications: 4, citations: 18, year: 2023 },
];

export const POSTS = [
  { id: 1, title: 'Research Project Ideas', date: '2026-08-19', likes: 12, authorId: 1 },
  { id: 2, title: 'AI Workshop & Neural Networks', date: '2026-08-21', likes: 28, authorId: 3 },
  { id: 3, title: 'Data Science Discovery', date: '2026-08-24', likes: 19, authorId: 4 },
  { id: 4, title: 'Instrument Sharing Pilot', date: '2026-08-27', likes: 35, authorId: 7 },
  { id: 5, title: 'New Research Opportunity', date: '2026-09-02', likes: 24, authorId: 2 },
];

export const REQUESTS = [
  { id: 1, instrument: 'GPU Workstation', requester: 'Hanna Neelu', start: 1, end: 4, status: 'Approved' },
  { id: 2, instrument: 'GPU Workstation', requester: 'Arjun Kumar', start: 3, end: 6, status: 'Pending' },
  { id: 3, instrument: '3D Printer', requester: 'Ishita Rao', start: 2, end: 5, status: 'Pending' },
  { id: 4, instrument: '3D Printer', requester: 'Kabir Shah', start: 6, end: 8, status: 'Approved' },
  { id: 5, instrument: 'Arduino Kit', requester: 'Rahul Thomas', start: 4, end: 7, status: 'Rejected' },
  { id: 6, instrument: 'Spectrometer', requester: 'Vikram Das', start: 5, end: 9, status: 'Pending' },
];

export const COLLABORATION_EDGES = [
  [1, 2],
  [1, 4],
  [2, 3],
  [3, 4],
  [4, 6],
  [6, 7],
  [7, 8],
];

export const INSTRUMENTS = ['GPU Workstation', '3D Printer', 'Spectrometer', 'Arduino Kit'];

export function getInitialDataset() {
  return {
    researchers: [...RESEARCHERS],
    posts: [...POSTS],
    requests: [...REQUESTS],
    edges: [...COLLABORATION_EDGES],
    instruments: [...INSTRUMENTS],
  };
}
