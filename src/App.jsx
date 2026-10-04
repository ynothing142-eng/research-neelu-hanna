import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar.jsx';
import { TopNavbar } from './components/TopNavbar.jsx';
import { SearchModal } from './components/SearchModal.jsx';
import { UserAccountModal } from './components/UserAccountModal.jsx';
import { FacultyDsaGuideModal } from './components/FacultyDsaGuideModal.jsx';
import { Toast } from './components/Toast.jsx';

import {
  PostLinkedList,
  UndoStack,
  FIFOBookingQueue,
  buildResearchTopicBinaryTree,
  INITIAL_POSTS,
  INITIAL_PEOPLE,
  INITIAL_EDGES,
  INITIAL_INSTRUMENTS,
  UNIVERSITY_MEMBERS,
  INITIAL_SERVICE_REQUESTS,
  INITIAL_CLUBS,
  INITIAL_TURNITIN_SLOTS
} from './shared/data/researchSphereData.js';

import { ResearchDeskView } from './views/ResearchDeskView.jsx';
import { ExplorePeopleView } from './views/ExplorePeopleView.jsx';
import { ResearchNetworkView } from './views/ResearchNetworkView.jsx';
import { DashboardView } from './views/DashboardView.jsx';
import { UniversityView } from './views/UniversityView.jsx';
import { ClubsView } from './views/ClubsView.jsx';
import { InstrumentsView } from './views/InstrumentsView.jsx';
import { TurnitinSlotsView } from './views/TurnitinSlotsView.jsx';
import { MyProfileView } from './views/MyProfileView.jsx';

export function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('desk');
  const [activeSubMode, setActiveSubMode] = useState(null);

  // Modals & UI States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isDsaGuideOpen, setIsDsaGuideOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // People & Current User State
  const [people, setPeople] = useState(INITIAL_PEOPLE);
  const [currentUser, setCurrentUser] = useState(INITIAL_PEOPLE[0]); // Hanna Neelu

  // Follow Network Graph Edges
  const [edges, setEdges] = useState(INITIAL_EDGES);

  // Phase 1: Singly Linked List for Posts
  const [postsLinkedList] = useState(() => new PostLinkedList(INITIAL_POSTS));
  const [postsArray, setPostsArray] = useState(() => postsLinkedList.toArray());

  // Phase 1: LIFO Stack for Undo Operations
  const [undoStack] = useState(() => new UndoStack());
  const [undoStackSize, setUndoStackSize] = useState(0);

  // Phase 1: FIFO Queue for Instrument Bookings
  const [instruments, setInstruments] = useState(INITIAL_INSTRUMENTS);
  const [queueItems, setQueueItems] = useState([
    { id: 101, instrument: '3D Printer', requester: 'Ishita Rao', startDate: '2026-10-05', endDate: '2026-10-08', status: 'In FIFO Queue' },
    { id: 102, instrument: '3D Printer', requester: 'Kabir Shah', startDate: '2026-10-10', endDate: '2026-10-12', status: 'In FIFO Queue' },
    { id: 104, instrument: 'GPU Workstation', requester: 'Hanna Neelu', startDate: '2026-10-04', endDate: '2026-10-07', status: 'Approved' },
    { id: 105, instrument: 'GPU Workstation', requester: 'Arjun Kumar', startDate: '2026-10-08', endDate: '2026-10-11', status: 'In FIFO Queue' }
  ]);

  // Phase 2: Binary Tree Topics
  const topicTree = useMemo(() => buildResearchTopicBinaryTree(), []);

  // Phase 3 & 4: University, Clubs, Turnitin, Priority Queue
  const [universityMembers] = useState(UNIVERSITY_MEMBERS);
  const [serviceRequests, setServiceRequests] = useState(INITIAL_SERVICE_REQUESTS);
  const [clubs, setClubs] = useState(INITIAL_CLUBS);
  const [userClubs, setUserClubs] = useState(['AI & Data Science Society']);
  const [turnitinSlots, setTurnitinSlots] = useState(INITIAL_TURNITIN_SLOTS);

  // Helper to sync Linked List to React Array
  const syncPosts = () => {
    setPostsArray(postsLinkedList.toArray());
  };

  const showToast = (title, message, type = 'info') => {
    setToast({ title, message, type });
  };

  // --- Phase 1: Add Post (Linked List O(1) Prepend + LIFO Stack) ---
  const handleAddPost = (newPost) => {
    const res = postsLinkedList.insertHead(newPost);
    syncPosts();

    undoStack.push({
      type: 'ADD_POST',
      postId: newPost.id,
      post: newPost,
      description: `Create post "${newPost.title}"`
    });
    setUndoStackSize(undoStack.size());

    showToast(
      'Post Published (Phase 1 Linked List)',
      `Inserted node at HEAD in ${res.complexity}. Pushed to LIFO Undo Stack.`,
      'success'
    );
  };

  // --- Phase 1: Delete Post (Linked List Traversal O(n) + LIFO Stack) ---
  const handleDeletePost = (postId) => {
    const postToDelete = postsArray.find((p) => p.id === postId);
    if (!postToDelete) return;

    postsLinkedList.deleteById(postId);
    syncPosts();

    undoStack.push({
      type: 'DELETE_POST',
      post: postToDelete,
      description: `Delete post "${postToDelete.title}"`
    });
    setUndoStackSize(undoStack.size());

    showToast(
      'Post Deleted',
      'Action stored on LIFO Undo Stack. Click "Undo" anytime to restore.',
      'info'
    );
  };

  // --- Phase 1: LIFO Stack Undo Handler ---
  const handleUndo = () => {
    const lastAction = undoStack.pop();
    if (!lastAction) return;

    setUndoStackSize(undoStack.size());

    if (lastAction.type === 'ADD_POST') {
      postsLinkedList.deleteById(lastAction.postId);
      syncPosts();
      showToast('Undone via LIFO Stack', `Reverted: ${lastAction.description}`, 'undo');
    } else if (lastAction.type === 'DELETE_POST') {
      postsLinkedList.insertHead(lastAction.post);
      syncPosts();
      showToast('Undone via LIFO Stack', `Restored post: "${lastAction.post.title}"`, 'undo');
    } else if (lastAction.type === 'FOLLOW') {
      setEdges((prev) =>
        prev.filter((e) => !(e.source === lastAction.source && e.target === lastAction.target))
      );
      showToast('Undone via LIFO Stack', `Unfollowed ${lastAction.targetName}`, 'undo');
    } else if (lastAction.type === 'UNFOLLOW') {
      setEdges((prev) => [...prev, { source: lastAction.source, target: lastAction.target, type: 'follows' }]);
      showToast('Undone via LIFO Stack', `Re-followed ${lastAction.targetName}`, 'undo');
    } else if (lastAction.type === 'JOIN_QUEUE') {
      setQueueItems((prev) => prev.filter((q) => q.id !== lastAction.requestId));
      showToast('Undone via LIFO Stack', `Cancelled queue booking for ${lastAction.instrument}`, 'undo');
    } else if (lastAction.type === 'JOIN_CLUB') {
      setUserClubs((prev) => prev.filter((c) => c !== lastAction.clubName));
      showToast('Undone via LIFO Stack', `Left club: ${lastAction.clubName}`, 'undo');
    }
  };

  // --- Phase 2: Follow / Connect Network ---
  const handleToggleFollow = (targetId) => {
    const existingIndex = edges.findIndex(
      (e) => e.source === currentUser.id && e.target === targetId
    );
    const targetPerson = people.find((p) => p.id === targetId);

    if (existingIndex !== -1) {
      setEdges((prev) => prev.filter((_, idx) => idx !== existingIndex));
      undoStack.push({
        type: 'UNFOLLOW',
        source: currentUser.id,
        target: targetId,
        targetName: targetPerson?.name || 'Scholar',
        description: `Unfollow ${targetPerson?.name}`
      });
      setUndoStackSize(undoStack.size());
      showToast('Unfollowed', `You unfollowed ${targetPerson?.name}. Follower graph updated.`, 'info');
    } else {
      setEdges((prev) => [...prev, { source: currentUser.id, target: targetId, type: 'follows' }]);
      undoStack.push({
        type: 'FOLLOW',
        source: currentUser.id,
        target: targetId,
        targetName: targetPerson?.name || 'Scholar',
        description: `Follow ${targetPerson?.name}`
      });
      setUndoStackSize(undoStack.size());
      showToast(
        'Connected & Following (Phase 2 Graph)',
        `Added directed edge to ${targetPerson?.name}. BFS shortest paths updated.`,
        'success'
      );
    }
  };

  // --- Phase 1: Instrument Booking FIFO Queue ---
  const handleJoinQueue = (inst, startDate, endDate) => {
    const newReq = {
      id: Date.now(),
      instrument: inst.name,
      requester: currentUser.name,
      startDate,
      endDate,
      status: 'In FIFO Queue'
    };

    setQueueItems((prev) => [...prev, newReq]);

    undoStack.push({
      type: 'JOIN_QUEUE',
      requestId: newReq.id,
      instrument: inst.name,
      description: `Booked ${inst.name} (${startDate})`
    });
    setUndoStackSize(undoStack.size());

    showToast(
      'Joined Instrument FIFO Queue',
      `Request added at tail. Requests processed strictly First-In, First-Out.`,
      'success'
    );
  };

  const handleProcessQueue = () => {
    if (queueItems.length === 0) return;
    const [processed, ...remaining] = queueItems;
    setQueueItems(remaining);

    showToast(
      'Processed Next Request (FIFO Dequeue O(1))',
      `Approved ${processed.instrument} booking for ${processed.requester}.`,
      'success'
    );
  };

  // --- Phase 4: Max-Heap Priority Service Requests ---
  const handleExtractPriorityService = () => {
    if (serviceRequests.length === 0) return;
    const sorted = [...serviceRequests].sort((a, b) => b.priority - a.priority);
    const highest = sorted[0];
    const remaining = sorted.slice(1);
    setServiceRequests(remaining);

    showToast(
      'Priority Service Dispatched (Phase 4 Max-Heap)',
      `Handled: "${highest.title}" (Priority ${highest.priority}/10). Extracted in O(log n).`,
      'success'
    );
  };

  const handleAddServiceRequest = (newReq) => {
    setServiceRequests((prev) => [...prev, newReq].sort((a, b) => b.priority - a.priority));
    showToast(
      'Service Request Enqueued into Heap',
      `Inserted with priority ${newReq.priority}/10 into University Max-Heap.`,
      'info'
    );
  };

  // --- Phase 3 & 4: Clubs Join / Leave ---
  const handleToggleJoinClub = (clubName) => {
    if (userClubs.includes(clubName)) {
      setUserClubs((prev) => prev.filter((c) => c !== clubName));
      showToast('Left Club', `Removed from ${clubName}`, 'info');
    } else {
      setUserClubs((prev) => [...prev, clubName]);
      undoStack.push({
        type: 'JOIN_CLUB',
        clubName,
        description: `Joined ${clubName}`
      });
      setUndoStackSize(undoStack.size());
      showToast('Joined Club!', `You are now a member of ${clubName}.`, 'success');
    }
  };

  // --- Account Creation & Switching ---
  const handleSwitchUser = (user) => {
    setCurrentUser(user);
    showToast('Active Profile Switched', `Now viewing ResearchSphere as ${user.name} (${user.role}).`);
  };

  const handleCreateUser = (newUser) => {
    setPeople((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    showToast('Welcome to ResearchSphere!', `Created account for ${newUser.name}.`);
  };

  // Handle navigation from the Faculty DSA Guide Modal
  const handleGuideNavigate = (tab, subMode) => {
    setActiveTab(tab);
    setActiveSubMode(subMode);
  };

  return (
    <div className="app-shell">
      {/* Dark Navy Left Sidebar (Matching Images 1, 3, 4, 6) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveSubMode(null);
        }}
        currentUser={currentUser}
        onOpenSwitchUser={() => setIsUserModalOpen(true)}
      />

      {/* Main Page Area */}
      <main className="app-main">
        {/* Top Navbar */}
        <TopNavbar
          activeTab={activeTab}
          onOpenSearch={() => setIsSearchOpen(true)}
          onUndo={handleUndo}
          undoStackSize={undoStackSize}
          lastUndoAction={undoStack.peek()}
          currentUser={currentUser}
          onOpenDsaGuide={() => setIsDsaGuideOpen(true)}
        />

        {/* View Routing */}
        {activeTab === 'desk' && (
          <ResearchDeskView
            key={`desk-${activeSubMode}`}
            postsLinkedList={postsLinkedList}
            postsArray={postsArray}
            onAddPost={handleAddPost}
            onDeletePost={handleDeletePost}
            currentUser={currentUser}
            topicTree={topicTree}
            onOpenExplore={() => setActiveTab('explore')}
            undoStack={undoStack}
            undoStackSize={undoStackSize}
            queueItems={queueItems}
            onUndo={handleUndo}
            onProcessQueue={handleProcessQueue}
            onJoinQueue={handleJoinQueue}
            initialDeskMode={activeSubMode === 'tree' ? 'tree' : activeSubMode === 'linkedList' || activeSubMode === 'stack' ? 'phase1' : 'feed'}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePeopleView
            people={people}
            currentUser={currentUser}
            onToggleFollow={handleToggleFollow}
            edges={edges}
            onOpenSwitchUser={() => setIsUserModalOpen(true)}
          />
        )}

        {activeTab === 'network' && (
          <ResearchNetworkView
            people={people}
            edges={edges}
            currentUser={currentUser}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            postsLinkedList={postsLinkedList}
            postsArray={postsArray}
            currentUser={currentUser}
            people={people}
            edges={edges}
            onNavigateToNetwork={() => setActiveTab('network')}
          />
        )}

        {activeTab === 'university' && (
          <UniversityView
            key={`univ-${activeSubMode}`}
            universityMembers={universityMembers}
            serviceRequests={serviceRequests}
            onExtractPriorityService={handleExtractPriorityService}
            onAddServiceRequest={handleAddServiceRequest}
            clubs={clubs}
            turnitinSlots={turnitinSlots}
            initialTab={activeSubMode === 'heap' ? 'heap' : 'binarySearch'}
          />
        )}

        {activeTab === 'clubs' && (
          <ClubsView
            key={`clubs-${activeSubMode}`}
            clubs={clubs}
            currentUser={currentUser}
            onToggleJoinClub={handleToggleJoinClub}
            userClubs={userClubs}
            initialTab={activeSubMode === 'optimization' ? 'optimization' : 'search'}
          />
        )}

        {activeTab === 'instruments' && (
          <InstrumentsView
            key={`inst-${activeSubMode}`}
            instruments={instruments}
            currentUser={currentUser}
            onJoinQueue={handleJoinQueue}
            onProcessQueue={handleProcessQueue}
            queueItems={queueItems}
            initialView={activeSubMode === 'queue' ? 'queue' : activeSubMode === 'treeTraversal' ? 'traversal' : 'cards'}
          />
        )}

        {activeTab === 'turnitin' && (
          <TurnitinSlotsView
            key={`turnitin-${activeSubMode}`}
            turnitinSlots={turnitinSlots}
            initialTab={activeSubMode === 'mergeSort' ? 'mergeSort' : 'bst'}
          />
        )}

        {activeTab === 'profile' && (
          <MyProfileView
            currentUser={currentUser}
            postsArray={postsArray}
            userClubs={userClubs}
            instruments={instruments}
            turnitinSlots={turnitinSlots}
            onOpenSwitchUser={() => setIsUserModalOpen(true)}
            onDeletePost={handleDeletePost}
          />
        )}
      </main>

      {/* Faculty DSA Guide Modal */}
      <FacultyDsaGuideModal
        isOpen={isDsaGuideOpen}
        onClose={() => setIsDsaGuideOpen(false)}
        onNavigate={handleGuideNavigate}
      />

      {/* Global ⌘K Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        people={people}
        posts={postsArray}
        instruments={instruments}
        clubs={clubs}
        onSelectResult={(tab) => {
          setActiveTab(tab);
          setIsSearchOpen(false);
        }}
      />

      {/* User Switch & Account Creation Modal */}
      <UserAccountModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        people={people}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onCreateUser={handleCreateUser}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
export default App;
