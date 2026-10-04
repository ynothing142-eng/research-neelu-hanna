/**
 * ResearchSphere Data Store & Data Structure Models
 * Single unified data store powering all 4 phases and all UI views.
 */

// --- Phase 1: Singly Linked List for Posts ---
export class PostNode {
  constructor(post, next = null) {
    this.post = post;
    this.next = next;
  }
}

export class PostLinkedList {
  constructor(initialPosts = []) {
    this.head = null;
    this.size = 0;
    // Insert initial posts so head is the most recent
    for (let i = initialPosts.length - 1; i >= 0; i--) {
      this.insertHead(initialPosts[i]);
    }
  }

  insertHead(post) {
    const newNode = new PostNode(post, this.head);
    this.head = newNode;
    this.size++;
    return {
      node: newNode,
      operation: 'Insert Head',
      complexity: 'O(1)',
      explanation: 'New post node attached directly to head pointer without traversing.'
    };
  }

  deleteById(postId) {
    if (!this.head) return null;
    let steps = 1;

    if (this.head.post.id === postId) {
      const removed = this.head.post;
      this.head = this.head.next;
      this.size--;
      return {
        removed,
        steps: 1,
        complexity: 'O(1) (head node)',
        explanation: 'Head node bypassed by updating head pointer to head.next.'
      };
    }

    let curr = this.head;
    while (curr.next && curr.next.post.id !== postId) {
      curr = curr.next;
      steps++;
    }

    if (curr.next) {
      const removed = curr.next.post;
      curr.next = curr.next.next;
      this.size--;
      return {
        removed,
        steps,
        complexity: 'O(n)',
        explanation: `Traversed ${steps} nodes to locate target and updated predecessor next pointer.`
      };
    }

    return null;
  }

  // Iterative Traversal (Method 1 in Dashboard)
  iterativeCount() {
    const t0 = performance.now();
    let count = 0;
    let curr = this.head;
    const nodes = [];
    while (curr) {
      count++;
      nodes.push(curr.post);
      curr = curr.next;
    }
    const t1 = performance.now();
    return {
      count,
      runtimeMs: Math.max(0.005, Number((t1 - t0).toFixed(4))),
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      nodes
    };
  }

  // Recursive Traversal (Method 2 in Dashboard)
  recursiveCount() {
    const t0 = performance.now();
    const nodes = [];

    const helper = (node, depth = 0) => {
      if (!node) return depth;
      nodes.push(node.post);
      return helper(node.next, depth + 1);
    };

    const count = helper(this.head, 0);
    const t1 = performance.now();
    return {
      count,
      runtimeMs: Math.max(0.005, Number((t1 - t0).toFixed(4))),
      timeComplexity: 'O(n)',
      recursionDepth: count,
      spaceComplexity: 'O(n) (call stack)',
      nodes
    };
  }

  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.post);
      curr = curr.next;
    }
    return arr;
  }
}

// --- Phase 1: LIFO Stack for Undo System ---
export class UndoStack {
  constructor() {
    this.stack = [];
  }

  push(action) {
    this.stack.push({
      ...action,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1] || null;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  size() {
    return this.stack.length;
  }

  toArray() {
    return [...this.stack];
  }
}

// --- Phase 1: FIFO Queue for Instrument Booking ---
export class FIFOBookingQueue {
  constructor(initialRequests = []) {
    this.items = [...initialRequests];
  }

  enqueue(request) {
    this.items.push(request);
    return {
      item: request,
      position: this.items.length,
      complexity: 'O(1)',
      message: `Enqueued request #${request.id} at tail of queue.`
    };
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const dequeued = this.items.shift();
    return {
      item: dequeued,
      complexity: 'O(1) amortized',
      message: `Processed request #${dequeued.id} from head of queue.`
    };
  }

  peek() {
    return this.items[0] || null;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  toArray() {
    return [...this.items];
  }
}

// --- Phase 2: Binary Tree Node for Research Topics ---
export class TopicTreeNode {
  constructor(name, count = 0, left = null, right = null) {
    this.name = name;
    this.count = count;
    this.left = left;
    this.right = right;
  }
}

export function buildResearchTopicBinaryTree() {
  /**
   * Structure as required:
   *                    Science
   *                   /       \
   *              Physics       Biology
   *             /      \       /     \
   *        Photonics  Quantum  Genetics  Ecology
   */
  const photonics = new TopicTreeNode('Photonics', 0);
  const quantum = new TopicTreeNode('Quantum', 0);
  const genetics = new TopicTreeNode('Genetics', 0);
  const ecology = new TopicTreeNode('Ecology', 0);

  const physics = new TopicTreeNode('Physics', 0, photonics, quantum);
  const biology = new TopicTreeNode('Biology', 0, genetics, ecology);

  const science = new TopicTreeNode('Science', 9, physics, biology);
  return science;
}

// --- Phase 2: Turnitin BST Node ---
export class TurnitinBSTNode {
  constructor(slot) {
    this.slot = slot;
    this.id = slot.id;
    this.left = null;
    this.right = null;
  }
}

export class TurnitinBST {
  constructor(initialSlots = []) {
    this.root = null;
    initialSlots.forEach(s => this.insert(s));
  }

  insert(slot) {
    const newNode = new TurnitinBSTNode(slot);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let curr = this.root;
    while (curr) {
      if (slot.id < curr.id) {
        if (!curr.left) {
          curr.left = newNode;
          break;
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = newNode;
          break;
        }
        curr = curr.right;
      }
    }
  }

  search(id) {
    const steps = [];
    let curr = this.root;
    let comparisons = 0;
    while (curr) {
      comparisons++;
      if (id === curr.id) {
        steps.push({ id: curr.id, action: `Target Slot ID #${id} matched! Found in BST.`, matched: true });
        return { found: true, slot: curr.slot, steps, comparisons };
      } else if (id < curr.id) {
        steps.push({ id: curr.id, action: `${id} < ${curr.id} -> Search left subtree.`, matched: false });
        curr = curr.left;
      } else {
        steps.push({ id: curr.id, action: `${id} > ${curr.id} -> Search right subtree.`, matched: false });
        curr = curr.right;
      }
    }
    steps.push({ id: null, action: `Slot ID #${id} not found in BST.`, matched: false });
    return { found: false, slot: null, steps, comparisons };
  }

  inOrderTraversal() {
    const result = [];
    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);
      result.push(node.slot);
      traverse(node.right);
    };
    traverse(this.root);
    return result;
  }
}

// --- Initial Dataset: 9 Feed Posts (matching the uploaded screenshots) ---
export const INITIAL_POSTS = [
  {
    id: 1,
    author: 'Sweety',
    authorHandle: 'SW',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-09-03 09:52:47',
    type: 'ARTICLE',
    topic: 'Science',
    title: 'Data analysis',
    content: 'Hi',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 86,
    comments: 14,
    bookmarked: false
  },
  {
    id: 2,
    author: 'Ranjna',
    authorHandle: 'RA',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-08-27 09:59:02',
    type: 'ARTICLE',
    topic: 'Science',
    title: 'Research on Big Data Analytics',
    content: 'Hi! Research on Big Data Analytics',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 86,
    comments: 14,
    bookmarked: false
  },
  {
    id: 3,
    author: 'Hanna Neelu',
    authorHandle: 'HA',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-08-26 19:50:40',
    type: 'ARTICLE',
    topic: 'Science',
    title: 'This is my first post',
    content: 'This is my first post in this platform!!',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 86,
    comments: 14,
    bookmarked: false
  },
  {
    id: 4,
    author: 'Hanna Neelu',
    authorHandle: 'HA',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-08-26 19:42:09',
    type: 'ARTICLE',
    topic: 'Science',
    title: 'My First Research Post',
    content: 'This is my first research post on ResearchSphere.',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 86,
    comments: 14,
    bookmarked: false
  },
  {
    id: 5,
    author: 'Hanna Neelu',
    authorHandle: 'HA',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-08-19 21:15:53',
    type: 'RESEARCH OPPORTUNITY',
    topic: 'Science',
    title: 'Research Project Ideas',
    content: 'Looking for students interested in collaborative data science research.',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 86,
    comments: 14,
    bookmarked: false
  },
  {
    id: 6,
    author: 'Arjun Kumar',
    authorHandle: 'AR',
    role: 'Student',
    affiliation: 'ResearchSphere',
    date: '2026-08-19 21:15:53',
    type: 'EVENT',
    topic: 'Physics',
    title: 'AI Workshop',
    content: 'A workshop on introductory artificial intelligence will be conducted for students.',
    tags: ['Research', 'Collaboration', 'Open Data'],
    likes: 45,
    comments: 8,
    bookmarked: false
  },
  {
    id: 7,
    author: 'Dr. Meera Sharma',
    authorHandle: 'MS',
    role: 'Faculty',
    affiliation: 'KJU Department of CS',
    date: '2026-08-15 14:20:00',
    type: 'ARTICLE',
    topic: 'Biology',
    title: 'Neural Networks in Genomic Sequencing',
    content: 'Exploring how deep convolutional and recurrent models accelerate DNA motif discovery.',
    tags: ['Genetics', 'Deep Learning', 'Computational Biology'],
    likes: 112,
    comments: 29,
    bookmarked: false
  },
  {
    id: 8,
    author: 'Dr. Rahul Thomas',
    authorHandle: 'RT',
    role: 'Faculty',
    affiliation: 'KJU Department of Data Science',
    date: '2026-08-10 11:00:00',
    type: 'ARTICLE',
    topic: 'Photonics',
    title: 'Photonics & Quantum Sensing Calibration',
    content: 'Experimental verification of optical phase precision in low-temperature laser interferometry.',
    tags: ['Photonics', 'Quantum', 'Optics'],
    likes: 64,
    comments: 12,
    bookmarked: false
  },
  {
    id: 9,
    author: 'Kabir Shah',
    authorHandle: 'KS',
    role: 'Researcher',
    affiliation: 'National Research Lab',
    date: '2026-08-05 16:30:00',
    type: 'OPEN DATA',
    topic: 'Science',
    title: 'Benchmark Dataset for High-Throughput Screening',
    content: 'Open-access experimental dataset featuring 10,000 spectrometer trials for reproducible studies.',
    tags: ['Open Data', 'Benchmarks', 'Chemistry'],
    likes: 93,
    comments: 19,
    bookmarked: false
  }
];

// --- Initial Researchers & People ---
export const INITIAL_PEOPLE = [
  {
    id: 1,
    name: 'Hanna Neelu',
    handle: 'hanna',
    initials: 'HA',
    role: 'Student',
    department: 'Data Science',
    institution: 'KJU',
    bio: 'Undergraduate researcher exploring graph algorithms and collaborative networks.',
    publications: 8,
    citations: 42,
    followingCount: 1,
    followersCount: 1,
    isFollowing: false,
    topics: ['Data Science', 'Algorithms', 'Open Data']
  },
  {
    id: 2,
    name: 'Arjun Kumar',
    handle: 'arjun',
    initials: 'AR',
    role: 'Student',
    department: 'Computer Science',
    institution: 'KJU',
    bio: 'Master candidate working on neural graph routing and peer-to-peer compute.',
    publications: 5,
    citations: 27,
    followingCount: 3,
    followersCount: 2,
    isFollowing: true, // followed by Hanna
    topics: ['AI', 'Networking', 'Robotics']
  },
  {
    id: 3,
    name: 'Dr. Meera Sharma',
    handle: 'meera',
    initials: 'MS',
    role: 'Faculty',
    department: 'Computer Science',
    institution: 'KJU',
    bio: 'Associate Professor specializing in distributed systems and computational biology.',
    publications: 12,
    citations: 61,
    followingCount: 4,
    followersCount: 14,
    isFollowing: false,
    topics: ['Distributed Systems', 'Genetics', 'Graph Theory']
  },
  {
    id: 4,
    name: 'Dr. Rahul Thomas',
    handle: 'rahul',
    initials: 'RT',
    role: 'Faculty',
    department: 'Data Science',
    institution: 'KJU',
    bio: 'Lead investigator at Quantum Optics & Data Lab. Hardware lab steward.',
    publications: 9,
    citations: 35,
    followingCount: 2,
    followersCount: 8,
    isFollowing: false,
    topics: ['Photonics', 'Quantum Computing', 'Data Mining']
  },
  {
    id: 5,
    name: 'Ishita Rao',
    handle: 'ishita',
    initials: 'IR',
    role: 'Researcher',
    department: 'Biotechnology',
    institution: 'Bengaluru Institute',
    bio: 'Postdoctoral fellow researching cellular protein dynamics and CRISPR telemetry.',
    publications: 3,
    citations: 14,
    followingCount: 5,
    followersCount: 3,
    isFollowing: false,
    topics: ['Biotechnology', 'CRISPR', 'Ecology']
  },
  {
    id: 6,
    name: 'Vikram Das',
    handle: 'vikram',
    initials: 'VD',
    role: 'Student',
    department: 'Electronics',
    institution: 'Bengaluru Institute',
    bio: 'Hardware prototyping specialist focusing on Arduino IoT sensor arrays.',
    publications: 7,
    citations: 30,
    followingCount: 2,
    followersCount: 4,
    isFollowing: false,
    topics: ['Embedded Systems', 'IoT', 'Hardware']
  },
  {
    id: 7,
    name: 'Nisha George',
    handle: 'nisha',
    initials: 'NG',
    role: 'Researcher',
    department: 'Computer Science',
    institution: 'National Research Lab',
    bio: 'Senior research scientist researching algorithmic optimization and scheduling.',
    publications: 10,
    citations: 52,
    followingCount: 6,
    followersCount: 19,
    isFollowing: false,
    topics: ['Scheduling', 'Optimization', 'Parallel Computing']
  },
  {
    id: 8,
    name: 'Kabir Shah',
    handle: 'kabir',
    initials: 'KS',
    role: 'Researcher',
    department: 'Data Science',
    institution: 'National Research Lab',
    bio: 'Open science advocate and maintainer of high-throughput spectral datasets.',
    publications: 4,
    citations: 18,
    followingCount: 1,
    followersCount: 5,
    isFollowing: false,
    topics: ['Open Science', 'Spectrometry', 'Statistics']
  }
];

// --- Initial Network Graph Edges (Who follows whom) ---
export const INITIAL_EDGES = [
  { source: 1, target: 2, type: 'follows' },
  { source: 2, target: 1, type: 'follows' },
  { source: 1, target: 4, type: 'follows' },
  { source: 2, target: 3, type: 'follows' },
  { source: 3, target: 4, type: 'follows' },
  { source: 4, target: 6, type: 'follows' },
  { source: 6, target: 7, type: 'follows' },
  { source: 7, target: 8, type: 'follows' },
  { source: 3, target: 7, type: 'follows' }
];

// --- Instruments (Matching Image 3) ---
export const INITIAL_INSTRUMENTS = [
  {
    id: 'inst-1',
    name: '3D Printer',
    status: 'AVAILABLE',
    description: '3D printer for research prototypes and academic projects.',
    addedBy: 'Dr. Rahul Thomas',
    notice: 'Booking required before use.',
    category: 'Fabrication & Prototyping',
    currentQueue: [
      { id: 101, requester: 'Ishita Rao', startDate: '2026-10-05', endDate: '2026-10-08', status: 'Pending' },
      { id: 102, requester: 'Kabir Shah', startDate: '2026-10-10', endDate: '2026-10-12', status: 'Pending' }
    ]
  },
  {
    id: 'inst-2',
    name: 'Arduino Kit',
    status: 'AVAILABLE',
    description: 'Arduino development kit for research and IoT projects.',
    addedBy: 'Dr. Meera Sharma',
    notice: 'Students must return all components.',
    category: 'Fabrication & Prototyping',
    currentQueue: [
      { id: 103, requester: 'Rahul Thomas', startDate: '2026-10-06', endDate: '2026-10-09', status: 'Pending' }
    ]
  },
  {
    id: 'inst-3',
    name: 'Digital Microscope',
    status: 'MAINTENANCE',
    description: 'Digital microscope for laboratory research and observation.',
    addedBy: 'Dr. Meera Sharma',
    notice: 'Only authorized users can request this instrument.',
    category: 'Precision Analytics',
    currentQueue: []
  },
  {
    id: 'inst-4',
    name: 'GPU Workstation',
    status: 'AVAILABLE',
    description: 'Dual RTX 4090 cluster configured for deep learning and graph neural network training.',
    addedBy: 'Dr. Rahul Thomas',
    notice: 'High compute clearance required.',
    category: 'Precision Analytics',
    currentQueue: [
      { id: 104, requester: 'Hanna Neelu', startDate: '2026-10-04', endDate: '2026-10-07', status: 'Approved' },
      { id: 105, requester: 'Arjun Kumar', startDate: '2026-10-08', endDate: '2026-10-11', status: 'Pending' }
    ]
  },
  {
    id: 'inst-5',
    name: 'Spectrometer',
    status: 'AVAILABLE',
    description: 'High precision optical spectrometer for material analysis and light dispersion testing.',
    addedBy: 'Vikram Das',
    notice: 'Requires lab safety orientation.',
    category: 'Precision Analytics',
    currentQueue: [
      { id: 106, requester: 'Vikram Das', startDate: '2026-10-09', endDate: '2026-10-14', status: 'Pending' }
    ]
  }
];

// --- University Members (Sorted by University ID for Binary Search) ---
export const UNIVERSITY_MEMBERS = [
  { id: 101, name: 'Hanna Neelu', role: 'Student', department: 'Data Science', gpa: 3.92, activeTurnitinSlots: [201], clubs: ['AI & Data Science Society'] },
  { id: 102, name: 'Arjun Kumar', role: 'Student', department: 'Computer Science', gpa: 3.78, activeTurnitinSlots: [203], clubs: ['Robotics Club', 'AI & Data Science Society'] },
  { id: 103, name: 'Dr. Meera Sharma', role: 'Faculty', department: 'Computer Science', gpa: 'N/A (Faculty)', activeTurnitinSlots: [], clubs: ['Ethics in Computing'] },
  { id: 104, name: 'Dr. Rahul Thomas', role: 'Faculty', department: 'Data Science', gpa: 'N/A (Faculty)', activeTurnitinSlots: [], clubs: ['Quantum Computing Circle'] },
  { id: 105, name: 'Ishita Rao', role: 'Student', department: 'Biotechnology', gpa: 3.85, activeTurnitinSlots: [202], clubs: ['Biotech Research Collective'] },
  { id: 106, name: 'Vikram Das', role: 'Student', department: 'Electronics', gpa: 3.65, activeTurnitinSlots: [205], clubs: ['Robotics Club'] },
  { id: 107, name: 'Nisha George', role: 'Faculty', department: 'Computer Science', gpa: 'N/A (Faculty)', activeTurnitinSlots: [], clubs: ['AI & Data Science Society'] },
  { id: 108, name: 'Kabir Shah', role: 'Student', department: 'Data Science', gpa: 3.71, activeTurnitinSlots: [204], clubs: ['Climate Systems Lab'] }
];

// --- University Service Requests (Priority Heap) ---
export const INITIAL_SERVICE_REQUESTS = [
  { id: 'SR-1', title: 'Emergency Lab Chemical Ventilation Check', priority: 10, category: 'Safety', requester: 'Dr. Meera Sharma', status: 'Urgent' },
  { id: 'SR-2', title: 'Thesis Defense Final Plagiarism Clearance', priority: 9, category: 'Graduation', requester: 'Hanna Neelu', status: 'High' },
  { id: 'SR-3', title: 'National Science Foundation Grant Submission Signoff', priority: 8, category: 'Grants', requester: 'Dr. Rahul Thomas', status: 'High' },
  { id: 'SR-4', title: 'GPU Server Hardware Diagnostic Clearance', priority: 6, category: 'IT', requester: 'Arjun Kumar', status: 'Medium' },
  { id: 'SR-5', title: 'Student Travel Subsidy for Conference', priority: 4, category: 'Finance', requester: 'Ishita Rao', status: 'Normal' },
  { id: 'SR-6', title: 'Official Academic Transcript Attestation', priority: 2, category: 'Registrar', requester: 'Vikram Das', status: 'Low' }
];

// --- Clubs (Phase 3 Linear Search & Phase 4 Greedy Scheduling) ---
export const INITIAL_CLUBS = [
  {
    id: 1,
    name: 'AI & Data Science Society',
    category: 'Machine Learning',
    lead: 'Dr. Meera Sharma',
    members: 142,
    meetingDay: 'Wednesday',
    description: 'Deep dive into machine learning architectures, Kaggle competitions, and big data analysis.',
    tags: ['AI', 'Data', 'Python', 'Neural Networks'],
    roomRequest: { id: 'REQ-CL-1', room: 'Seminar Hall A', start: 9, end: 11, title: 'AI Ethics & Workshop' }
  },
  {
    id: 2,
    name: 'Robotics Club',
    category: 'Hardware & Embedded',
    lead: 'Vikram Das',
    members: 89,
    meetingDay: 'Thursday',
    description: 'Hands-on construction of autonomous rovers, drones, and Arduino IoT microcontrollers.',
    tags: ['Robotics', 'Arduino', 'Hardware', 'Sensors'],
    roomRequest: { id: 'REQ-CL-2', room: 'Seminar Hall A', start: 10, end: 13, title: 'Autonomous Drone Showcase' }
  },
  {
    id: 3,
    name: 'Quantum Computing Circle',
    category: 'Physics & Compute',
    lead: 'Dr. Rahul Thomas',
    members: 54,
    meetingDay: 'Monday',
    description: 'Exploring quantum gates, Qiskit circuits, optical qubits, and cryogenic algorithms.',
    tags: ['Quantum', 'Physics', 'Qiskit', 'Photonics'],
    roomRequest: { id: 'REQ-CL-3', room: 'Seminar Hall A', start: 11, end: 12.5, title: 'Qiskit Quantum Circuit Lab' }
  },
  {
    id: 4,
    name: 'Biotech Research Collective',
    category: 'Life Sciences',
    lead: 'Ishita Rao',
    members: 76,
    meetingDay: 'Friday',
    description: 'Translational genomics, CRISPR Cas9 workflows, and computational ecology protocols.',
    tags: ['Biotech', 'Genetics', 'Biology', 'CRISPR'],
    roomRequest: { id: 'REQ-CL-4', room: 'Seminar Hall A', start: 12.5, end: 14, title: 'Genomics Data Hack' }
  },
  {
    id: 5,
    name: 'Ethics in Computing',
    category: 'Policy & Society',
    lead: 'Dr. Meera Sharma',
    members: 65,
    meetingDay: 'Tuesday',
    description: 'Critique of algorithmic bias, automated surveillance, and open source intellectual property.',
    tags: ['Ethics', 'Policy', 'Society', 'Governance'],
    roomRequest: { id: 'REQ-CL-5', room: 'Seminar Hall A', start: 13.5, end: 16, title: 'AI Bias in Healthcare Debate' }
  },
  {
    id: 6,
    name: 'Climate Systems Lab',
    category: 'Environmental Science',
    lead: 'Kabir Shah',
    members: 48,
    meetingDay: 'Saturday',
    description: 'Satellite telemetry, carbon modeling, and open-source sensor deployments for environmental metrics.',
    tags: ['Climate', 'Ecology', 'Open Data', 'Sensors'],
    roomRequest: { id: 'REQ-CL-6', room: 'Seminar Hall A', start: 14.5, end: 17, title: 'Satellite Telemetry Analysis' }
  }
];

// --- Turnitin Plagiarism Slots (Phase 2 BST & Phase 3 Merge Sort) ---
export const INITIAL_TURNITIN_SLOTS = [
  {
    id: 201,
    studentId: 101,
    studentName: 'Hanna Neelu',
    paperTitle: 'Graph Traversal Efficiency in Social Research Networks',
    deadline: '2026-10-15',
    deadlineEpoch: 1760486400,
    similarityScore: 4,
    status: 'Verified (Clean)',
    slotTime: '09:00 AM'
  },
  {
    id: 202,
    studentId: 105,
    studentName: 'Ishita Rao',
    paperTitle: 'Cellular Motif Recognition via Convolutional Ensembles',
    deadline: '2026-10-18',
    deadlineEpoch: 1760745600,
    similarityScore: 9,
    status: 'Verified (Clean)',
    slotTime: '10:30 AM'
  },
  {
    id: 203,
    studentId: 102,
    studentName: 'Arjun Kumar',
    paperTitle: 'High-Throughput Peer Computing in Campus Grids',
    deadline: '2026-10-12',
    deadlineEpoch: 1760227200,
    similarityScore: 14,
    status: 'Under Review',
    slotTime: '01:00 PM'
  },
  {
    id: 204,
    studentId: 108,
    studentName: 'Kabir Shah',
    paperTitle: 'Open Chemical Spectrum Benchmarks for Reproducibility',
    deadline: '2026-10-22',
    deadlineEpoch: 1761091200,
    similarityScore: 6,
    status: 'Verified (Clean)',
    slotTime: '02:30 PM'
  },
  {
    id: 205,
    studentId: 106,
    studentName: 'Vikram Das',
    paperTitle: 'Low-Power IoT Microcontroller Communication Arrays',
    deadline: '2026-10-10',
    deadlineEpoch: 1760054400,
    similarityScore: 8,
    status: 'Verified (Clean)',
    slotTime: '04:00 PM'
  }
];
