import React from 'react';
import {
  FileText,
  Users,
  Network,
  LayoutDashboard,
  GraduationCap,
  Compass,
  FlaskConical,
  CheckCircle2,
  User,
  ArrowRightLeft,
  Bookmark
} from 'lucide-react';

export const SIDEBAR_ITEMS = [
  { id: 'desk', label: 'Research desk', icon: FileText },
  { id: 'explore', label: 'Explore people', icon: Users },
  { id: 'network', label: 'Research network', icon: Network },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'university', label: 'University', icon: GraduationCap },
  { id: 'clubs', label: 'Clubs', icon: Compass },
  { id: 'instruments', label: 'Instruments', icon: FlaskConical },
  { id: 'turnitin', label: 'Turnitin slots', icon: CheckCircle2 },
  { id: 'profile', label: 'My profile', icon: User }
];

export function Sidebar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenSwitchUser
}) {
  return (
    <aside className="app-sidebar">
      <div>
        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="brand-icon-box">R</div>
          <div className="brand-title">ResearchSphere</div>
        </div>

        {/* Workspace Kicker */}
        <div className="sidebar-kicker">WORKSPACE</div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-link-btn ${isActive ? 'active' : ''}`}
                id={`nav-${item.id}`}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        {/* Field Note Card */}
        <div className="field-note-card">
          <div className="field-note-kicker">
            <Bookmark size={11} />
            <span>FIELD NOTE</span>
          </div>
          <p className="field-note-text">
            Good questions travel further than good answers.
          </p>
        </div>

        {/* Current User Switcher Card */}
        <div
          className="sidebar-user-badge"
          onClick={onOpenSwitchUser}
          title="Click to switch or create account"
        >
          <div className="user-badge-left">
            <div className="user-avatar-circle">
              {currentUser.name ? currentUser.name.charAt(0) : 'H'}
            </div>
            <div className="user-badge-details">
              <b>{currentUser.name.split(' ')[0]}</b>
              <small>{currentUser.role}</small>
            </div>
          </div>
          <ArrowRightLeft size={14} color="#7d96a8" />
        </div>
      </div>
    </aside>
  );
}
