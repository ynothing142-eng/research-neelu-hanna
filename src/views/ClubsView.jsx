import React, { useState } from 'react';
import {
  Compass,
  Search,
  CheckCircle,
  Users,
  Calendar,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Target
} from 'lucide-react';
import { runLinearSearch } from '../shared/algorithms/searching-sorting.js';
import { runGreedyIntervalScheduling, runNaiveFCFS } from '../shared/algorithms/optimization.js';
import { GanttIntervalDiagram } from '../components/visualizers/GanttIntervalDiagram.jsx';

export function ClubsView({
  clubs,
  currentUser,
  onToggleJoinClub,
  userClubs,
  initialTab = 'search'
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'search', 'optimization'
  const [searchKeyword, setSearchKeyword] = useState('');
  const [linearSearchResult, setLinearSearchResult] = useState(null);

  // Run Linear Search for Clubs
  const handleLinearSearch = () => {
    const q = searchKeyword.trim().toLowerCase();
    if (!q) {
      setLinearSearchResult(null);
      return;
    }

    const res = runLinearSearch(
      clubs,
      (c) => c.name.toLowerCase(),
      q
    );

    // If exact name didn't match, check category or tags
    if (!res.found) {
      const tagMatch = clubs.findIndex(
        (c) =>
          c.category.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
      if (tagMatch !== -1) {
        res.found = true;
        res.index = tagMatch;
        res.item = clubs[tagMatch];
      }
    }

    setLinearSearchResult(res);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
          STUDENT COMMUNITY & RESOURCE SCHEDULING
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
          Clubs
        </h1>
        <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
          Explore research clubs via O(n) Linear Search, join study circles, and schedule limited seminar room resources using Earliest Finish Time (EFT) Greedy Interval Scheduling.
        </p>
      </div>

      {/* Mode Switcher */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          padding: '6px',
          background: '#f1ece0',
          borderRadius: '10px',
          marginBottom: '26px',
          width: 'fit-content'
        }}
      >
        <button
          onClick={() => setActiveTab('search')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'search' ? '#ffffff' : 'transparent',
            color: activeTab === 'search' ? '#172430' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'search' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Search size={14} color="#176057" />
          <span>Phase 3 Linear Search & Clubs</span>
        </button>

        <button
          onClick={() => setActiveTab('optimization')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: activeTab === 'optimization' ? '#ffffff' : 'transparent',
            color: activeTab === 'optimization' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: activeTab === 'optimization' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Target size={14} color="#176057" />
          <span>Phase 4 Greedy Room Optimization</span>
        </button>
      </div>

      {/* TAB 1: Phase 3 Linear Search & Clubs Directory */}
      {activeTab === 'search' && (
        <div>
          {/* Phase 3: Linear Search Bar */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #e8e2d5',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '32px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={16} color="#176057" />
                <b style={{ fontSize: '14px', color: '#172430' }}>
                  Phase 3 Linear Search: Clubs by Name, Category, or Keyword
                </b>
              </div>
              <span style={{ fontSize: '11px', background: '#f1ede4', padding: '2px 8px', borderRadius: '4px', color: '#658296', fontFamily: 'var(--font-mono)' }}>
                O(n) Sequential Scan
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search e.g. 'Robotics', 'AI', 'Quantum', 'Biotech'..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 14px',
                  borderRadius: '8px',
                  border: '1px solid #dcd5c7',
                  fontSize: '13.5px',
                  backgroundColor: '#ffffff'
                }}
              />
              <button onClick={handleLinearSearch} className="btn-primary-teal" style={{ padding: '9px 16px', fontSize: '13px' }}>
                <Search size={14} />
                <span>Search Club (O(n))</span>
              </button>
            </div>

            {linearSearchResult && (
              <div style={{ marginTop: '14px', padding: '12px 16px', borderRadius: '8px', background: linearSearchResult.found ? '#f0fdf4' : '#fef2f2', border: linearSearchResult.found ? '1px solid #bbf7d0' : '1px solid #fecaca', fontSize: '13px' }}>
                {linearSearchResult.found ? (
                  <div style={{ color: '#166534' }}>
                    ✓ Found club: <b>{linearSearchResult.item.name}</b> in {linearSearchResult.comparisons} comparisons (Index {linearSearchResult.index}).
                  </div>
                ) : (
                  <div style={{ color: '#991b1b' }}>
                    ✕ No matching club found after examining all {clubs.length} clubs.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Clubs Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
            {clubs.map((club) => {
              const isMember = userClubs.includes(club.name);
              const isHighlighted = linearSearchResult?.item?.id === club.id;

              return (
                <div
                  key={club.id}
                  className="feed-card"
                  style={{
                    border: isHighlighted ? '2px solid #176057' : '1px solid #e8e2d5',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    margin: 0
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: '#172430' }}>
                        {club.name}
                      </h3>
                      <span className="badge-tag">{club.category}</span>
                    </div>

                    <p style={{ fontSize: '13.5px', color: '#556675', lineHeight: 1.5, marginBottom: '14px' }}>
                      {club.description}
                    </p>

                    <div style={{ fontSize: '12px', color: '#7b8e9b', marginBottom: '14px' }}>
                      Lead: <b>{club.lead}</b> · Meets: <b>{club.meetingDay}</b>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {club.tags.map((tag, idx) => (
                        <span key={idx} className="tag-chip">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #f1ece1', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      <Users size={12} style={{ display: 'inline', marginRight: '4px' }} />
                      {club.members} active members
                    </span>

                    <button
                      onClick={() => onToggleJoinClub(club.name)}
                      className={isMember ? 'undo-nav-btn' : 'btn-primary-teal'}
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                    >
                      {isMember ? 'Joined ✓' : 'Join Club'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Phase 4 Resource Allocation & Greedy Algorithm Section */}
      {activeTab === 'optimization' && (
        <div>
          <GanttIntervalDiagram clubs={clubs} />
        </div>
      )}
    </div>
  );
}
