import React, { useState, useEffect } from 'react';
import { Search, X, User, FileText, FlaskConical, Compass, ArrowRight } from 'lucide-react';

export function SearchModal({
  isOpen,
  onClose,
  people,
  posts,
  instruments,
  clubs,
  onSelectResult
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchingPeople = q
    ? people.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.institution.toLowerCase().includes(q)
      )
    : people.slice(0, 3);

  const matchingPosts = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q)
      )
    : posts.slice(0, 2);

  const matchingInstruments = q
    ? instruments.filter((i) => i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q))
    : [];

  const matchingClubs = q
    ? clubs.filter((c) => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        style={{ maxWidth: '580px', padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #eee8dc', paddingBottom: '14px', marginBottom: '16px' }}>
          <Search size={18} color="#64748b" />
          <input
            type="text"
            placeholder="Search researchers, articles, instruments, clubs..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              color: '#1e293b',
              background: 'transparent'
            }}
          />
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8a96a3' }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
          {/* Researchers */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#7b8e9b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Researchers & Students
            </div>
            {matchingPeople.map((person) => (
              <div
                key={person.id}
                onClick={() => {
                  onSelectResult('explore', person);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background 0.1s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f4ec')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <User size={15} color="#176057" />
                  <div>
                    <b style={{ fontSize: '13.5px', color: '#172430' }}>{person.name}</b>
                    <small style={{ display: 'block', fontSize: '11px', color: '#7b8e9b' }}>
                      {person.department} · {person.institution}
                    </small>
                  </div>
                </div>
                <ArrowRight size={13} color="#94a3b8" />
              </div>
            ))}
          </div>

          {/* Feed Posts */}
          {matchingPosts.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#7b8e9b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Research Desk Posts
              </div>
              {matchingPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    onSelectResult('desk', post);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f4ec')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FileText size={15} color="#176057" />
                    <div>
                      <b style={{ fontSize: '13.5px', color: '#172430' }}>{post.title}</b>
                      <small style={{ display: 'block', fontSize: '11px', color: '#7b8e9b' }}>
                        By {post.author} · {post.topic}
                      </small>
                    </div>
                  </div>
                  <ArrowRight size={13} color="#94a3b8" />
                </div>
              ))}
            </div>
          )}

          {/* Instruments */}
          {matchingInstruments.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#7b8e9b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Instruments
              </div>
              {matchingInstruments.map((inst) => (
                <div
                  key={inst.id}
                  onClick={() => {
                    onSelectResult('instruments', inst);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f4ec')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <FlaskConical size={15} color="#176057" />
                    <div>
                      <b style={{ fontSize: '13.5px', color: '#172430' }}>{inst.name}</b>
                      <small style={{ display: 'block', fontSize: '11px', color: '#7b8e9b' }}>
                        {inst.category} · {inst.status}
                      </small>
                    </div>
                  </div>
                  <ArrowRight size={13} color="#94a3b8" />
                </div>
              ))}
            </div>
          )}

          {/* Clubs */}
          {matchingClubs.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: '700', color: '#7b8e9b', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Academic Clubs
              </div>
              {matchingClubs.map((club) => (
                <div
                  key={club.id}
                  onClick={() => {
                    onSelectResult('clubs', club);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f7f4ec')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Compass size={15} color="#176057" />
                    <div>
                      <b style={{ fontSize: '13.5px', color: '#172430' }}>{club.name}</b>
                      <small style={{ display: 'block', fontSize: '11px', color: '#7b8e9b' }}>
                        {club.category} · {club.members} members
                      </small>
                    </div>
                  </div>
                  <ArrowRight size={13} color="#94a3b8" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
