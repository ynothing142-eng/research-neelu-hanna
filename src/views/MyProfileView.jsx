import React from 'react';
import {
  User,
  GraduationCap,
  Building,
  BookOpen,
  Quote,
  UserPlus,
  Compass,
  FlaskConical,
  CheckCircle2,
  Trash2,
  Sparkles
} from 'lucide-react';

export function MyProfileView({
  currentUser,
  postsArray,
  userClubs,
  instruments,
  turnitinSlots,
  onOpenSwitchUser,
  onDeletePost
}) {
  const myPosts = postsArray.filter(
    (p) => p.author === currentUser.name || p.authorHandle === currentUser.initials
  );

  return (
    <div className="page-container">
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#176057', textTransform: 'uppercase', marginBottom: '6px' }}>
            RESEARCHER IDENTITY & CREDENTIALS
          </div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '38px', fontWeight: 500, color: '#172430', marginBottom: '8px' }}>
            My profile
          </h1>
          <p style={{ fontSize: '14.5px', color: '#556675' }}>
            Manage your academic credentials, published notes, instrument queues, and university memberships.
          </p>
        </div>

        <button
          onClick={onOpenSwitchUser}
          className="btn-primary-teal"
          style={{ padding: '8px 16px', fontSize: '13px' }}
        >
          <UserPlus size={15} />
          <span>Switch or Create Account</span>
        </button>
      </div>

      {/* Profile Overview Card */}
      <div className="feed-card" style={{ padding: '28px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div
            className="user-avatar-circle"
            style={{ width: '64px', height: '64px', fontSize: '24px', backgroundColor: '#d97746' }}
          >
            {currentUser.initials || currentUser.name.charAt(0)}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, color: '#172430' }}>
                {currentUser.name}
              </h2>
              <span className="badge-tag">{currentUser.role}</span>
            </div>

            <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span>{currentUser.department}</span>
              <span>·</span>
              <span>{currentUser.institution}</span>
            </div>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
              {currentUser.bio}
            </p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '12px',
            marginTop: '24px',
            borderTop: '1px solid #f1ece1',
            paddingTop: '20px'
          }}
        >
          <div style={{ background: '#fdfcf9', padding: '12px', borderRadius: '8px', border: '1px solid #eae3d5' }}>
            <span style={{ fontSize: '11px', color: '#7b8e9b', textTransform: 'uppercase', fontWeight: 600 }}>My Posts</span>
            <b style={{ display: 'block', fontSize: '20px', color: '#172430' }}>{myPosts.length}</b>
          </div>

          <div style={{ background: '#fdfcf9', padding: '12px', borderRadius: '8px', border: '1px solid #eae3d5' }}>
            <span style={{ fontSize: '11px', color: '#7b8e9b', textTransform: 'uppercase', fontWeight: 600 }}>Following</span>
            <b style={{ display: 'block', fontSize: '20px', color: '#172430' }}>{currentUser.followingCount || 1}</b>
          </div>

          <div style={{ background: '#fdfcf9', padding: '12px', borderRadius: '8px', border: '1px solid #eae3d5' }}>
            <span style={{ fontSize: '11px', color: '#7b8e9b', textTransform: 'uppercase', fontWeight: 600 }}>Followers</span>
            <b style={{ display: 'block', fontSize: '20px', color: '#172430' }}>{currentUser.followersCount || 1}</b>
          </div>

          <div style={{ background: '#fdfcf9', padding: '12px', borderRadius: '8px', border: '1px solid #eae3d5' }}>
            <span style={{ fontSize: '11px', color: '#7b8e9b', textTransform: 'uppercase', fontWeight: 600 }}>Clubs Joined</span>
            <b style={{ display: 'block', fontSize: '20px', color: '#172430' }}>{userClubs.length}</b>
          </div>
        </div>
      </div>

      {/* Two Columns: My Published Articles & My Associated Activity */}
      <div className="desk-grid">
        {/* Left: My Authored Posts */}
        <div>
          <div className="section-title-row">
            <div>
              <div className="section-kicker">~ LINKED LIST NODES</div>
              <h3 className="section-title" style={{ fontSize: '22px' }}>
                My Published Articles ({myPosts.length})
              </h3>
            </div>
          </div>

          {myPosts.length === 0 ? (
            <div className="feed-card" style={{ padding: '24px', textAlign: 'center', color: '#7b8e9b' }}>
              You haven't published any notes yet. Go to Research desk and click "+ Start a post".
            </div>
          ) : (
            myPosts.map((post) => (
              <div key={post.id} className="feed-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#172430' }}>
                    {post.title}
                  </h4>
                  <button
                    onClick={() => onDeletePost(post.id)}
                    className="footer-action-btn"
                    title="Delete post (pushes to Undo Stack)"
                  >
                    <Trash2 size={14} color="#94a3b8" />
                  </button>
                </div>
                <p style={{ fontSize: '13px', color: '#556675', marginBottom: '10px' }}>
                  {post.content}
                </p>
                <div style={{ fontSize: '11.5px', color: '#7b8e9b' }}>
                  Topic: <b>{post.topic}</b> · Published: {post.date}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right: My Memberships & Reservations */}
        <div>
          {/* My Joined Clubs */}
          <div className="right-card" style={{ marginBottom: '24px' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#172430', marginBottom: '12px' }}>
              My Club Memberships
            </h4>
            {userClubs.length === 0 ? (
              <p style={{ fontSize: '12.5px', color: '#7b8e9b' }}>No clubs joined yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {userClubs.map((clubName, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#176057', fontWeight: 600 }}>
                    <Compass size={14} />
                    <span>{clubName}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Academic Integrity Verification */}
          <div className="right-card">
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, color: '#172430', marginBottom: '12px' }}>
              Turnitin Plagiarism Status
            </h4>
            <div style={{ fontSize: '12.5px', color: '#556675', lineHeight: 1.5 }}>
              All your submission files are verified via the Turnitin BST indexing pipeline before final departmental signoff.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
