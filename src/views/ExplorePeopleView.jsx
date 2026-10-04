import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  UserCheck,
  BookOpen,
  Quote,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function ExplorePeopleView({
  people,
  currentUser,
  onToggleFollow,
  edges,
  onOpenSwitchUser
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDept, setSelectedDept] = useState('All');

  const filteredPeople = people.filter((person) => {
    // Exclude current user from follow suggestions
    if (person.id === currentUser.id) return false;

    const matchesSearch =
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'All' || person.role === selectedRole;
    const matchesDept = selectedDept === 'All' || person.department === selectedDept;

    return matchesSearch && matchesRole && matchesDept;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
            ACADEMIC NETWORK & COMMUNITY
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
            Explore people
          </h1>
          <p style={{ fontSize: '14.5px', color: '#556675', maxWidth: '780px' }}>
            Connect and follow researchers, faculty mentors, and fellow student scholars across university labs.
          </p>
        </div>

        <button
          onClick={onOpenSwitchUser}
          className="btn-primary-teal"
          style={{ padding: '8px 14px', fontSize: '13px' }}
        >
          <UserPlus size={15} />
          <span>Switch or Create Profile</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e8e2d5',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '28px',
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
        }}
      >
        <div style={{ flex: 1, minWidth: '240px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={16} color="#7b8e9b" />
          <input
            type="text"
            placeholder="Search researchers by name, department, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '13.5px',
              color: '#172430',
              background: 'transparent'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #dcd5c7',
              fontSize: '13px',
              background: '#fff'
            }}
          >
            <option value="All">All Roles</option>
            <option value="Student">Student</option>
            <option value="Faculty">Faculty</option>
            <option value="Researcher">Researcher</option>
          </select>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{
              padding: '7px 12px',
              borderRadius: '8px',
              border: '1px solid #dcd5c7',
              fontSize: '13px',
              background: '#fff'
            }}
          >
            <option value="All">All Departments</option>
            <option value="Data Science">Data Science</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
      </div>

      {/* People Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '22px' }}>
        {filteredPeople.map((person) => {
          const isFollowing = edges.some(
            (e) => (e.source === currentUser.id && e.target === person.id)
          );

          return (
            <div
              key={person.id}
              className="feed-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                margin: 0
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      className="author-avatar"
                      style={{
                        width: '42px',
                        height: '42px',
                        fontSize: '15px',
                        backgroundColor: isFollowing ? '#176057' : '#b8976b'
                      }}
                    >
                      {person.initials || person.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#172430', lineHeight: 1.2 }}>
                        {person.name}
                      </h3>
                      <small style={{ color: '#7b8e9b', fontSize: '12px' }}>
                        {person.department} · {person.institution}
                      </small>
                    </div>
                  </div>

                  <span className="badge-tag">{person.role}</span>
                </div>

                <p style={{ fontSize: '13px', color: '#556675', lineHeight: 1.5, marginBottom: '16px' }}>
                  {person.bio}
                </p>

                {/* Academic metrics */}
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '12px', color: '#64748b' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <BookOpen size={13} color="#176057" />
                    <span><b>{person.publications}</b> publications</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Quote size={13} color="#176057" />
                    <span><b>{person.citations}</b> citations</span>
                  </div>
                </div>

                {/* Topics */}
                {person.topics && (
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                    {person.topics.map((t, idx) => (
                      <span key={idx} className="tag-chip" style={{ fontSize: '10.5px' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div style={{ borderTop: '1px solid #f1ece1', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '11.5px', color: '#8a9ba8' }}>
                  {person.followersCount} followers
                </span>

                <button
                  onClick={() => onToggleFollow(person.id)}
                  className={isFollowing ? 'undo-nav-btn' : 'btn-primary-teal'}
                  style={{ padding: '6px 14px', fontSize: '12.5px' }}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck size={14} color="#176057" />
                      <span>Following</span>
                    </>
                  ) : (
                    <>
                      <UserPlus size={14} />
                      <span>Follow</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
