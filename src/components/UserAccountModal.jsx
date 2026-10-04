import React, { useState } from 'react';
import { X, UserPlus, Check, Sparkles } from 'lucide-react';

export function UserAccountModal({
  isOpen,
  onClose,
  people,
  currentUser,
  onSwitchUser,
  onCreateUser
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');
  const [department, setDepartment] = useState('Data Science');
  const [institution, setInstitution] = useState('KJU');
  const [bio, setBio] = useState('');

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      handle: name.toLowerCase().replace(/\s+/g, ''),
      initials,
      role,
      department,
      institution,
      bio: bio.trim() || `${role} researching at ${institution}`,
      publications: 0,
      citations: 0,
      followingCount: 0,
      followersCount: 0,
      isFollowing: false,
      topics: ['General Research']
    };

    onCreateUser(newUser);
    setIsCreating(false);
    setName('');
    setBio('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content-card"
        style={{ maxWidth: '500px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: '#172430' }}>
              {isCreating ? 'Create Researcher Account' : 'Switch Active Profile'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b' }}>
              {isCreating
                ? 'Join ResearchSphere academic community'
                : 'Select an existing researcher profile or create a new one'}
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#8a96a3' }}>
            <X size={20} />
          </button>
        </div>

        {!isCreating ? (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', maxHeight: '320px', overflowY: 'auto' }}>
              {people.map((person) => {
                const isSelected = currentUser.id === person.id;
                return (
                  <div
                    key={person.id}
                    onClick={() => {
                      onSwitchUser(person);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: isSelected ? '1.5px solid #176057' : '1px solid #e7e2d6',
                      backgroundColor: isSelected ? '#f2f8f6' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '50%',
                          backgroundColor: isSelected ? '#176057' : '#d97746',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '13px'
                        }}
                      >
                        {person.initials || person.name.charAt(0)}
                      </div>
                      <div>
                        <b style={{ fontSize: '14px', color: '#172430', display: 'block' }}>{person.name}</b>
                        <small style={{ fontSize: '11.5px', color: '#64748b' }}>
                          {person.role} · {person.department} ({person.institution})
                        </small>
                      </div>
                    </div>
                    {isSelected && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#176057', fontSize: '12px', fontWeight: 600 }}>
                        <Check size={16} /> Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsCreating(true)}
              className="btn-primary-teal"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <UserPlus size={16} />
              <span>Create New Researcher Profile</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleCreate}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '22px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13.5px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13.5px', background: '#fff' }}
                  >
                    <option value="Student">Student</option>
                    <option value="Researcher">Researcher</option>
                    <option value="Faculty">Faculty</option>
                    <option value="Lab Director">Lab Director</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '5px' }}>
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Data Science"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13.5px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Institution / University
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. KJU"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13.5px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7b8e9b', textTransform: 'uppercase', marginBottom: '5px' }}>
                  Research Bio
                </label>
                <textarea
                  rows={2}
                  placeholder="Brief summary of your academic interests..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #dcd5c7', fontSize: '13.5px' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                style={{ padding: '9px 16px', borderRadius: '8px', border: '1px solid #dcd5c7', background: '#fff', cursor: 'pointer', fontSize: '13px' }}
              >
                Back to Switch
              </button>
              <button type="submit" className="btn-primary-teal">
                <Sparkles size={15} />
                <span>Save Profile</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
