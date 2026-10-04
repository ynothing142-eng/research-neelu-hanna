import React, { useState } from 'react';
import {
  Plus,
  Heart,
  MessageSquare,
  Share2,
  Trash2,
  Filter,
  CheckCircle,
  GitCommit,
  Layers,
  Code2,
  ArrowRight,
  Sparkles,
  BookOpen,
  Trees,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { infixToPostfix } from '../shared/algorithms/infixToPostfix.js';
import { BinaryTreeDiagram } from '../components/visualizers/BinaryTreeDiagram.jsx';
import { Phase1DataStructuresDiagram } from '../components/visualizers/Phase1DataStructuresDiagram.jsx';

export function ResearchDeskView({
  postsLinkedList,
  postsArray,
  onAddPost,
  onDeletePost,
  currentUser,
  topicTree,
  onOpenExplore,
  undoStack,
  undoStackSize,
  queueItems,
  onUndo,
  onProcessQueue,
  onJoinQueue,
  initialDeskMode = 'feed'
}) {
  const [deskMode, setDeskMode] = useState(initialDeskMode); // 'feed', 'tree', 'phase1'
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState('ARTICLE');
  const [topic, setTopic] = useState('Science');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('All');

  // Phase 1 Infix -> Postfix Search
  const [searchInfix, setSearchInfix] = useState('');
  const [showInfixTrace, setShowInfixTrace] = useState(false);
  const [postfixResult, setPostfixResult] = useState(null);

  // Handle publishing post (Phase 1: Linked List O(1) Prepend + LIFO Stack)
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser.name,
      authorHandle: currentUser.initials || currentUser.name.substring(0, 2).toUpperCase(),
      role: currentUser.role,
      affiliation: `${currentUser.institution} · ${currentUser.department}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 19),
      type: postType,
      topic,
      title: title.trim(),
      content: content.trim(),
      tags: ['Research', 'Collaboration', topic],
      likes: 0,
      comments: 0,
      bookmarked: false
    };

    onAddPost(newPost);
    setTitle('');
    setContent('');
    setShowPublishForm(false);
    setDeskMode('feed');
  };

  // Run Infix to Postfix conversion when query changes
  const handleInfixSearch = (val) => {
    setSearchInfix(val);
    if (!val.trim()) {
      setPostfixResult(null);
      return;
    }
    const res = infixToPostfix(val);
    setPostfixResult(res);
  };

  // Filter posts based on selected topic and postfix search query
  const filteredPosts = postsArray.filter((post) => {
    if (selectedTopicFilter !== 'All' && post.topic !== selectedTopicFilter) {
      return false;
    }
    if (postfixResult && postfixResult.postfixArray.length > 0) {
      const q = searchInfix.toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        post.topic.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="page-container">
      {/* Editorial Hero Banner (Matches Image 4) */}
      <div className="editorial-hero">
        <div>
          <div className="hero-date">TUESDAY · 14 MAY 2024</div>
          <h1 className="hero-heading">
            A desk for the work <br />
            <em>between the lines.</em>
          </h1>
          <p className="hero-subtitle">
            Find the people, questions, and instruments that make your next study possible.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            className="btn-primary-teal"
            onClick={() => setShowPublishForm(!showPublishForm)}
          >
            <Plus size={16} />
            <span>{showPublishForm ? 'Close form' : 'Start a post'}</span>
          </button>
        </div>
      </div>

      {/* Clean Mode Switcher Bar */}
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
          onClick={() => setDeskMode('feed')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: deskMode === 'feed' ? '#ffffff' : 'transparent',
            color: deskMode === 'feed' ? '#172430' : '#64748b',
            cursor: 'pointer',
            boxShadow: deskMode === 'feed' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          📰 Research Desk Feed
        </button>

        <button
          onClick={() => setDeskMode('tree')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: deskMode === 'tree' ? '#ffffff' : 'transparent',
            color: deskMode === 'tree' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: deskMode === 'tree' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Trees size={14} color="#176057" />
          <span>Phase 2 Binary Tree Hierarchy</span>
        </button>

        <button
          onClick={() => setDeskMode('phase1')}
          style={{
            padding: '7px 16px',
            borderRadius: '7px',
            fontSize: '12.5px',
            fontWeight: 600,
            border: 'none',
            backgroundColor: deskMode === 'phase1' ? '#ffffff' : 'transparent',
            color: deskMode === 'phase1' ? '#176057' : '#64748b',
            cursor: 'pointer',
            boxShadow: deskMode === 'phase1' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Layers size={14} color="#176057" />
          <span>Phase 1 Linear Structures Workbench</span>
        </button>
      </div>

      {/* Start a Research Conversation / Add to the Desk (Matches Image 2 & 5) */}
      {showPublishForm && (
        <div className="feed-card" style={{ border: '1.5px solid #176057', background: '#fdfcf9', marginBottom: '32px' }}>
          <div className="section-kicker">
            <Sparkles size={13} />
            <span>ADD TO THE DESK</span>
          </div>
          <h3 className="section-title" style={{ fontSize: '24px', marginBottom: '20px' }}>
            Start a research conversation
          </h3>

          <form onSubmit={handlePublish}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '22px' }}>
              <div>
                <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Title</label>
                <input
                  type="text"
                  required
                  placeholder="Enter a descriptive post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #dcd5c7',
                    fontSize: '14px',
                    backgroundColor: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share a preliminary finding, dataset, or research query..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #dcd5c7',
                    fontSize: '14px',
                    backgroundColor: '#ffffff',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Type</label>
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #dcd5c7',
                      fontSize: '13.5px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="ARTICLE">Article</option>
                    <option value="RESEARCH OPPORTUNITY">Research Opportunity</option>
                    <option value="EVENT">Event</option>
                    <option value="OPEN DATA">Open Data</option>
                    <option value="FIELD NOTE">Field Note</option>
                  </select>
                </div>

                <div>
                  <label className="input-label" style={{ display: 'block', marginBottom: '6px' }}>Research topic</label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #dcd5c7',
                      fontSize: '13.5px',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="Science">Science (Root)</option>
                    <option value="Physics">Physics</option>
                    <option value="Biology">Biology</option>
                    <option value="Photonics">Photonics</option>
                    <option value="Quantum">Quantum</option>
                    <option value="Genetics">Genetics</option>
                    <option value="Ecology">Ecology</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '11.5px', color: '#658296', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <GitCommit size={13} color="#176057" />
                <span>Phase 1 DSA: Prepends node to Linked List (O(1)) & pushes action to LIFO Undo Stack</span>
              </div>
              <button type="submit" className="btn-primary-teal">
                Publish note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Mode 2: Dedicated Diagrammatic Binary Tree */}
      {deskMode === 'tree' && (
        <div style={{ marginBottom: '32px' }}>
          <BinaryTreeDiagram
            selectedTopic={selectedTopicFilter}
            onSelectTopic={(t) => {
              setSelectedTopicFilter(t);
              setDeskMode('feed');
            }}
          />
        </div>
      )}

      {/* Mode 3: Dedicated Diagrammatic Phase 1 Workbench */}
      {deskMode === 'phase1' && (
        <Phase1DataStructuresDiagram
          postsLinkedList={postsLinkedList}
          postsArray={postsArray}
          undoStack={undoStack}
          undoStackSize={undoStackSize}
          queueItems={queueItems}
          onAddPost={onAddPost}
          onDeletePost={onDeletePost}
          onUndo={onUndo}
          onProcessQueue={onProcessQueue}
          onJoinQueue={onJoinQueue}
        />
      )}

      {/* Mode 1: Main Desk Layout (Matches Image 1 & 4) */}
      {deskMode === 'feed' && (
        <div className="desk-grid">
          {/* Left Column: Feed and Expressions */}
          <div>
            {/* Phase 1 Infix -> Postfix Query Bar */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e8e2d5',
                borderRadius: '10px',
                padding: '14px 18px',
                marginBottom: '22px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', color: '#7b8e9b', textTransform: 'uppercase' }}>
                  Phase 1 Expression Filter (Infix → Postfix Stack)
                </span>
                <button
                  onClick={() => setShowInfixTrace(!showInfixTrace)}
                  style={{ background: 'transparent', border: 'none', color: '#176057', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                >
                  {showInfixTrace ? 'Hide Stack Trace' : 'View Shunting-Yard Stack Trace'}
                </button>
              </div>

              <input
                type="text"
                placeholder="e.g. (Science AND Biology) OR Physics"
                value={searchInfix}
                onChange={(e) => handleInfixSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: '1px solid #dcd5c7',
                  fontSize: '13px',
                  color: '#172430'
                }}
              />

              {postfixResult && (
                <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ color: '#64748b' }}>Postfix Output:</span>
                  <code style={{ background: '#f1ede4', padding: '2px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)', color: '#176057', fontWeight: 600 }}>
                    {postfixResult.postfixString || '(none)'}
                  </code>
                </div>
              )}

              {showInfixTrace && postfixResult && (
                <div style={{ marginTop: '12px', background: '#fbf9f4', padding: '10px 12px', borderRadius: '6px', border: '1px solid #ebe4d8', fontSize: '11.5px', maxHeight: '140px', overflowY: 'auto' }}>
                  <b>Operator Stack Trace (LIFO):</b>
                  {postfixResult.steps.map((st, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0', borderBottom: '1px solid #efe8dc' }}>
                      <span>{st.action}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', color: '#176057' }}>Stack: [{st.stack.join(', ')}]</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Field Notes Section Header */}
            <div className="section-title-row">
              <div>
                <div className="section-kicker">~ LIVE FIELD NOTES</div>
                <h2 className="section-title">Research activity</h2>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#7b8e9b' }}>Filter:</span>
                <span className="badge-tag" style={{ background: '#eef5f3', color: '#176057' }}>
                  {selectedTopicFilter} ({filteredPosts.length})
                </span>
              </div>
            </div>

            {/* Singly Linked List Chain Visualizer Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                background: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #eae4d8',
                marginBottom: '20px',
                fontSize: '11.5px',
                color: '#556677',
                overflowX: 'auto'
              }}
            >
              <Layers size={14} color="#176057" />
              <b style={{ color: '#172430' }}>Linked List:</b>
              <span style={{ background: '#176057', color: '#fff', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>HEAD</span>
              {postsArray.slice(0, 4).map((p) => (
                <React.Fragment key={p.id}>
                  <span>→</span>
                  <span style={{ background: '#f1ede4', padding: '2px 7px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                    Node #{p.id} ({p.author.split(' ')[0]})
                  </span>
                </React.Fragment>
              ))}
              {postsArray.length > 4 && <span>→ ... ({postsArray.length - 4} more)</span>}

              <button
                onClick={() => setDeskMode('phase1')}
                style={{
                  marginLeft: 'auto',
                  background: 'transparent',
                  border: 'none',
                  color: '#176057',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Inspect Full Diagram →
              </button>
            </div>

            {/* Posts Feed */}
            {filteredPosts.map((post) => (
              <article key={post.id} className="feed-card" id={`post-${post.id}`}>
                <div className="feed-card-header">
                  <div className="author-meta">
                    <div className="author-avatar">{post.authorHandle || post.author.substring(0, 2).toUpperCase()}</div>
                    <div className="author-info">
                      <b>{post.author}</b>
                      <small>
                        {post.affiliation} · {post.date}
                      </small>
                    </div>
                  </div>

                  <span className="badge-tag">{post.type}</span>
                </div>

                <h3 className="feed-post-title">{post.title}</h3>
                <p className="feed-post-content">{post.content}</p>

                <div className="post-tags-row">
                  {post.tags.map((t, idx) => (
                    <span key={idx} className="tag-chip">
                      - {t}
                    </span>
                  ))}
                </div>

                <div className="feed-card-footer">
                  <div className="footer-actions">
                    <button className="footer-action-btn" title="Appreciate research">
                      <Heart size={14} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="footer-action-btn" title="Join discussion">
                      <MessageSquare size={14} />
                      <span>{post.comments}</span>
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => onDeletePost(post.id)}
                      className="footer-action-btn"
                      title="Delete post (pushes to LIFO Undo Stack)"
                    >
                      <Trash2 size={13} color="#94a3b8" />
                    </button>
                    <button className="footer-action-btn" title="Share article link">
                      <Share2 size={13} color="#94a3b8" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Binary Tree Topics + Worth Following + Circles (Matches Image 4 & 5) */}
          <div>
            {/* Card 1: Research Topics (Phase 2 Binary Tree Hierarchy) */}
            <div className="right-card">
              <div className="right-card-header">
                <span className="right-card-kicker">RESEARCH TOPICS</span>
                <button
                  onClick={() => setSelectedTopicFilter('All')}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    fontSize: '12px',
                    color: selectedTopicFilter === 'All' ? '#176057' : '#7b8e9b',
                    fontWeight: selectedTopicFilter === 'All' ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  All
                </button>
              </div>

              {/* Binary Tree Structure list */}
              <div className="topic-list">
                {[
                  { name: 'Science', count: 9, depth: 0 },
                  { name: 'Physics', count: 1, depth: 1 },
                  { name: 'Photonics', count: 1, depth: 2 },
                  { name: 'Laser Physics', count: 0, depth: 2 },
                  { name: 'Quantum', count: 0, depth: 2 },
                  { name: 'Biology', count: 1, depth: 1 },
                  { name: 'Genetics', count: 1, depth: 2 },
                  { name: 'Ecology', count: 0, depth: 2 }
                ].map((item) => (
                  <div
                    key={item.name}
                    className="topic-item"
                    onClick={() => setSelectedTopicFilter(item.name)}
                    style={{
                      paddingLeft: `${item.depth * 12}px`,
                      fontWeight: selectedTopicFilter === item.name ? 700 : 400
                    }}
                  >
                    <span>
                      {item.depth > 0 ? '├─ ' : ''}
                      {item.name} ({item.count})
                    </span>
                    {selectedTopicFilter === item.name && <CheckCircle size={13} color="#176057" />}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #f1ece1' }}>
                <button
                  onClick={() => setDeskMode('tree')}
                  className="btn-primary-teal"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '12px', padding: '6px 12px' }}
                >
                  <Trees size={13} />
                  <span>Open SVG Tree Diagram</span>
                </button>
              </div>
            </div>

            {/* Card 2: Worth Following Dark Teal Banner (Matches Image 4 & 5) */}
            <div className="worth-following-card">
              <div className="worth-following-kicker">WORTH FOLLOWING</div>
              <h3 className="worth-following-title">Questions with a second life</h3>
              <p className="worth-following-text">
                Three new threads are gathering around methods for community-led data collection.
              </p>
              <div className="worth-following-link" onClick={onOpenExplore}>
                <span>Explore the thread</span>
                <ArrowRight size={13} />
              </div>
            </div>

            {/* Card 3: Your Circles (Matches Image 5) */}
            <div className="right-card">
              <div className="right-card-header">
                <span className="right-card-kicker">◆ YOUR CIRCLES</span>
                <span style={{ fontSize: '11.5px', color: '#7b8e9b', cursor: 'pointer' }}>View all</span>
              </div>

              <div>
                <div className="circle-item">
                  <div className="circle-icon-box" style={{ background: '#e6f4ea', color: '#137333' }}>
                    ⏳
                  </div>
                  <div className="circle-details">
                    <b>Urban Methods Lab</b>
                    <small>4 active conversations</small>
                  </div>
                </div>

                <div className="circle-item">
                  <div className="circle-icon-box" style={{ background: '#e8f0fe', color: '#1a73e8' }}>
                    💻
                  </div>
                  <div className="circle-details">
                    <b>Data & Society</b>
                    <small>8 active conversations</small>
                  </div>
                </div>

                <div className="circle-item">
                  <div className="circle-icon-box" style={{ background: '#fef7e0', color: '#b06000' }}>
                    🌱
                  </div>
                  <div className="circle-details">
                    <b>Climate Research</b>
                    <small>6 active conversations</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
