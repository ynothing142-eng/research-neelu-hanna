import React, { useState } from 'react';
import {
  FileText,
  UserCheck,
  Users,
  Layers,
  ArrowRight,
  CornerDownRight,
  Play,
  RotateCcw,
  Network,
  Share2,
  CheckCircle,
  GitBranch
} from 'lucide-react';

export function DashboardView({
  postsLinkedList,
  postsArray,
  currentUser,
  people,
  edges,
  onNavigateToNetwork
}) {
  const [isRunningBenchmark, setIsRunningBenchmark] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

  // Compute live traversal metrics
  const iterativeResult = postsLinkedList.iterativeCount();
  const recursiveResult = postsLinkedList.recursiveCount();

  // Active user's statistics
  const myPostsCount = postsArray.filter(
    (p) => p.author === currentUser.name || p.authorHandle === currentUser.initials
  ).length;

  const followedCount = currentUser.followingCount || 1;
  const followersCount = currentUser.followersCount || 1;
  const totalDeskPosts = postsArray.length;

  // Run visual traversal step demonstration
  const handleRunTraversal = () => {
    setIsRunningBenchmark(true);
    setActiveNodeIndex(0);

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < postsArray.length) {
        setActiveNodeIndex(idx);
      } else {
        clearInterval(interval);
        setIsRunningBenchmark(false);
      }
    }, 280);
  };

  const handleResetTraversal = () => {
    setActiveNodeIndex(-1);
    setIsRunningBenchmark(false);
  };

  return (
    <div className="page-container">
      {/* Header (Matches Image 6) */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
          RESEARCH OVERVIEW
        </div>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14.5px', color: '#556675' }}>
          Your research activity and platform insights at a glance.
        </p>
      </div>

      {/* 4 Stat Cards Grid (Matches Image 6) */}
      <div className="stat-cards-grid">
        {/* Card 1: My Posts */}
        <div className="dashboard-stat-card">
          <div className="stat-icon-pill">
            <FileText size={15} />
          </div>
          <div>
            <div className="stat-number">{myPostsCount}</div>
            <div className="stat-label">My posts</div>
          </div>
        </div>

        {/* Card 2: Researchers Followed */}
        <div className="dashboard-stat-card">
          <div className="stat-icon-pill">
            <UserCheck size={15} />
          </div>
          <div>
            <div className="stat-number">{followedCount}</div>
            <div className="stat-label">Researchers followed</div>
          </div>
        </div>

        {/* Card 3: Followers */}
        <div className="dashboard-stat-card">
          <div className="stat-icon-pill">
            <Users size={15} />
          </div>
          <div>
            <div className="stat-number">{followersCount}</div>
            <div className="stat-label">Followers</div>
          </div>
        </div>

        {/* Card 4: Total Research Desk Posts */}
        <div className="dashboard-stat-card">
          <div className="stat-icon-pill">
            <Layers size={15} />
          </div>
          <div>
            <div className="stat-number">{totalDeskPosts}</div>
            <div className="stat-label">Total Research Desk posts</div>
          </div>
        </div>
      </div>

      {/* Traversal Comparison Card (Matches Image 6) */}
      <div className="traversal-comparison-card">
        <div className="traversal-header-row">
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
              RESEARCH DESK ANALYSIS
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, color: '#172430' }}>
              Feed traversal comparison
            </h2>
          </div>
          <span className="traversal-pill">{totalDeskPosts} feed nodes</span>
        </div>

        <p style={{ fontSize: '13.5px', color: '#556675', lineHeight: 1.6, maxWidth: '820px' }}>
          The platform traverses the Research Desk linked list in two ways to count published posts. Both approaches produce the same count, while the traversal method affects memory use and practical limits.
        </p>

        {/* Visual Traverser Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '18px' }}>
          <button
            onClick={handleRunTraversal}
            disabled={isRunningBenchmark}
            className="btn-primary-teal"
            style={{ padding: '8px 14px', fontSize: '12.5px' }}
          >
            <Play size={13} />
            <span>{isRunningBenchmark ? 'Traversing nodes...' : 'Run Live Traversal Animation'}</span>
          </button>
          <button
            onClick={handleResetTraversal}
            disabled={activeNodeIndex === -1}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #dcd5c7',
              background: '#fff',
              fontSize: '12.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>
        </div>

        {/* Interactive Node Step Display */}
        {activeNodeIndex >= 0 && (
          <div style={{ marginTop: '16px', padding: '12px', background: '#fcfaf5', borderRadius: '8px', border: '1px solid #eae3d5' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
              Active Node in Pointer Traversal: Step {activeNodeIndex + 1} of {postsArray.length}
            </div>
            <div style={{ fontSize: '13px', color: '#172430' }}>
              Visiting: <b>"{postsArray[activeNodeIndex]?.title}"</b> by {postsArray[activeNodeIndex]?.author}
            </div>
          </div>
        )}

        {/* Two Comparison Columns (Matches Image 6) */}
        <div className="comparison-columns-grid">
          {/* Method One: Iterative */}
          <div className="method-box">
            <div className="method-kicker">
              <span>METHOD ONE</span>
              <ArrowRight size={14} color="#176057" />
            </div>
            <h3 className="method-title">Iterative traversal</h3>
            <p className="method-desc">
              Moves through each feed node one at a time using a loop.
            </p>

            <div className="metrics-table-rows">
              <div className="metric-row">
                <span>Posts counted</span>
                <b>{iterativeResult.count}</b>
              </div>
              <div className="metric-row">
                <span>Runtime</span>
                <b>{iterativeResult.runtimeMs.toFixed(4)} ms</b>
              </div>
              <div className="metric-row">
                <span>Time</span>
                <b>{iterativeResult.timeComplexity}</b>
              </div>
              <div className="metric-row">
                <span>Extra space</span>
                <b>{iterativeResult.spaceComplexity}</b>
              </div>
            </div>
          </div>

          {/* Method Two: Recursive */}
          <div className="method-box">
            <div className="method-kicker">
              <span>METHOD TWO</span>
              <CornerDownRight size={14} color="#c28e2b" />
            </div>
            <h3 className="method-title">Recursive traversal</h3>
            <p className="method-desc">
              Counts a node, then calls itself to visit the next node.
            </p>

            <div className="metrics-table-rows">
              <div className="metric-row">
                <span>Posts counted</span>
                <b>{recursiveResult.count}</b>
              </div>
              <div className="metric-row">
                <span>Runtime</span>
                <b>{recursiveResult.runtimeMs.toFixed(4)} ms</b>
              </div>
              <div className="metric-row">
                <span>Time</span>
                <b>{recursiveResult.timeComplexity}</b>
              </div>
              <div className="metric-row">
                <span>Recursion depth</span>
                <b>{recursiveResult.recursionDepth}</b>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase 2 Follower Graph & Network Preview */}
      <div className="feed-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '4px' }}>
              PHASE 2 RELATIONSHIPS
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: '#172430' }}>
              Academic Network & Follow Relationships
            </h3>
          </div>
          <button
            onClick={onNavigateToNetwork}
            className="btn-primary-teal"
            style={{ padding: '8px 14px', fontSize: '12.5px' }}
          >
            <Network size={14} />
            <span>Open Graph & BFS View</span>
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: '#556675', marginBottom: '20px' }}>
          The follower network is represented as an <b>Adjacency List Directed Graph</b> where nodes represent scholars and edges represent follow relationships.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
          {people.slice(0, 4).map((p) => {
            const isFollowedByMe = edges.some(
              (e) => (e.source === currentUser.id && e.target === p.id)
            );
            return (
              <div
                key={p.id}
                style={{
                  background: '#fcfaf5',
                  padding: '14px',
                  borderRadius: '8px',
                  border: '1px solid #ece5d8'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div className="user-avatar-circle" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                    {p.initials || p.name.charAt(0)}
                  </div>
                  <div>
                    <b style={{ fontSize: '13px', color: '#172430', display: 'block' }}>{p.name}</b>
                    <small style={{ fontSize: '11px', color: '#7b8e9b' }}>{p.department}</small>
                  </div>
                </div>
                <div style={{ fontSize: '11.5px', color: isFollowedByMe ? '#137333' : '#64748b' }}>
                  {isFollowedByMe ? '✓ You follow this researcher' : '○ Not yet connected'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
