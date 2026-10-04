import React from 'react';
import { Search, Undo2, Bell, GraduationCap, Sparkles } from 'lucide-react';
import { SIDEBAR_ITEMS } from './Sidebar.jsx';

export function TopNavbar({
  activeTab,
  onOpenSearch,
  onUndo,
  undoStackSize,
  lastUndoAction,
  currentUser,
  onOpenDsaGuide
}) {
  const currentItem = SIDEBAR_ITEMS.find((item) => item.id === activeTab) || SIDEBAR_ITEMS[0];

  return (
    <header className="top-navbar">
      {/* Breadcrumb Navigation */}
      <div className="nav-breadcrumbs">
        <span>ResearchSphere</span>
        <span>›</span>
        <b>{currentItem.label}</b>
      </div>

      {/* Nav Tools */}
      <div className="nav-tools">
        {/* DSA Faculty Guide / Syllabus Demonstration Button */}
        <button
          onClick={onOpenDsaGuide}
          className="btn-primary-teal"
          style={{
            padding: '6px 13px',
            fontSize: '12.5px',
            background: 'linear-gradient(135deg, #176057 0%, #114e47 100%)',
            boxShadow: '0 2px 6px rgba(23,96,87,0.25)'
          }}
          title="Open complete DSA Phases & Faculty Presentation Guide"
        >
          <GraduationCap size={15} />
          <span>DSA Phases Guide</span>
        </button>

        {/* Search Input with Shortcut Badge */}
        <button
          className="search-box-btn"
          onClick={onOpenSearch}
          title="Search researchers, topics, instruments (⌘K)"
        >
          <Search size={14} />
          <span>Search researchers</span>
          <span className="kbd-badge">⌘ K</span>
        </button>

        {/* Undo Button (Phase 1 LIFO Stack demonstration) */}
        <button
          className="undo-nav-btn"
          onClick={onUndo}
          disabled={undoStackSize === 0}
          title={
            undoStackSize > 0
              ? `Undo last action: ${lastUndoAction?.description || 'LIFO Stack Pop'}`
              : 'Undo Stack is empty (LIFO)'
          }
        >
          <Undo2 size={14} />
          <span>Undo</span>
          {undoStackSize > 0 && (
            <span className="undo-count-badge">{undoStackSize}</span>
          )}
        </button>

        {/* Notification Bell */}
        <button className="icon-circle-btn" title="Notifications">
          <Bell size={15} />
          <span className="notification-dot"></span>
        </button>

        {/* User Avatar Circle */}
        <div
          className="user-avatar-circle"
          style={{ width: '32px', height: '32px', fontSize: '13px', cursor: 'pointer' }}
          title={`Signed in as ${currentUser.name} (${currentUser.role})`}
        >
          {currentUser.name ? currentUser.name.charAt(0) : 'H'}
        </div>
      </div>
    </header>
  );
}
