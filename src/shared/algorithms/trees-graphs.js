/**
 * Structured Data Representation Algorithms
 * Trees (BST, Traversals) and Graphs (Adjacency Matrix/List, BFS with hops, DFS)
 */

// --- Binary Search Tree ---
export class BSTNode {
  constructor(key, data) {
    this.key = key;
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key, data) {
    const steps = [];
    const newNode = new BSTNode(key, data);

    if (!this.root) {
      this.root = newNode;
      steps.push({ currentKey: key, action: `Tree was empty. Set ${key} as root node.`, path: [key] });
      return { root: this.root, steps };
    }

    let curr = this.root;
    const path = [];

    while (curr) {
      path.push(curr.key);
      if (key === curr.key) {
        steps.push({ currentKey: curr.key, action: `Key ${key} matches existing node. Updated profile.`, path: [...path] });
        curr.data = data;
        return { root: this.root, steps };
      } else if (key < curr.key) {
        steps.push({ currentKey: curr.key, action: `${key} < ${curr.key} -> Branching left`, path: [...path] });
        if (!curr.left) {
          curr.left = newNode;
          path.push(key);
          steps.push({ currentKey: key, action: `Inserted ${key} as left child of ${curr.key}.`, path: [...path] });
          break;
        }
        curr = curr.left;
      } else {
        steps.push({ currentKey: curr.key, action: `${key} > ${curr.key} -> Branching right`, path: [...path] });
        if (!curr.right) {
          curr.right = newNode;
          path.push(key);
          steps.push({ currentKey: key, action: `Inserted ${key} as right child of ${curr.key}.`, path: [...path] });
          break;
        }
        curr = curr.right;
      }
    }

    return { root: this.root, steps };
  }

  search(key) {
    const steps = [];
    let curr = this.root;
    const path = [];
    let comparisons = 0;

    while (curr) {
      comparisons++;
      path.push(curr.key);
      if (key === curr.key) {
        steps.push({
          currentKey: curr.key,
          action: `Found target key ${key}! (${comparisons} comparisons)`,
          path: [...path],
          found: true,
          node: curr,
        });
        return { found: true, node: curr, comparisons, steps, path };
      } else if (key < curr.key) {
        steps.push({
          currentKey: curr.key,
          action: `Target ${key} < ${curr.key} -> Searching left subtree`,
          path: [...path],
          found: false,
        });
        curr = curr.left;
      } else {
        steps.push({
          currentKey: curr.key,
          action: `Target ${key} > ${curr.key} -> Searching right subtree`,
          path: [...path],
          found: false,
        });
        curr = curr.right;
      }
    }

    steps.push({
      currentKey: null,
      action: `Key ${key} not found in BST after ${comparisons} comparisons.`,
      path: [...path],
      found: false,
    });
    return { found: false, node: null, comparisons, steps, path };
  }

  delete(key) {
    const steps = [];
    const deleteHelper = (node, k, path = []) => {
      if (!node) {
        steps.push({ action: `Key ${k} not found to delete.` });
        return null;
      }
      path.push(node.key);

      if (k < node.key) {
        steps.push({ currentKey: node.key, action: `${k} < ${node.key} -> Search left to delete`, path: [...path] });
        node.left = deleteHelper(node.left, k, [...path]);
        return node;
      } else if (k > node.key) {
        steps.push({ currentKey: node.key, action: `${k} > ${node.key} -> Search right to delete`, path: [...path] });
        node.right = deleteHelper(node.right, k, [...path]);
        return node;
      } else {
        // Node found
        steps.push({ currentKey: node.key, action: `Found node ${k} to delete.`, path: [...path] });
        // Case 1: Leaf
        if (!node.left && !node.right) {
          steps.push({ action: `Node ${k} is a leaf. Removing directly.` });
          return null;
        }
        // Case 2: One child
        if (!node.left) return node.right;
        if (!node.right) return node.left;

        // Case 3: Two children (inorder successor)
        let successor = node.right;
        while (successor.left) successor = successor.left;
        steps.push({ action: `Node ${k} has two children. Replacing with inorder successor ${successor.key}.` });
        node.key = successor.key;
        node.data = successor.data;
        node.right = deleteHelper(node.right, successor.key, [...path]);
        return node;
      }
    };

    this.root = deleteHelper(this.root, key);
    return { root: this.root, steps };
  }

  getTraversals() {
    const inorder = [];
    const preorder = [];
    const postorder = [];

    const inOrderHelper = (n) => {
      if (!n) return;
      inOrderHelper(n.left);
      inorder.push({ key: n.key, data: n.data });
      inOrderHelper(n.right);
    };

    const preOrderHelper = (n) => {
      if (!n) return;
      preorder.push({ key: n.key, data: n.data });
      preOrderHelper(n.left);
      preOrderHelper(n.right);
    };

    const postOrderHelper = (n) => {
      if (!n) return;
      postOrderHelper(n.left);
      postOrderHelper(n.right);
      postorder.push({ key: n.key, data: n.data });
    };

    inOrderHelper(this.root);
    preOrderHelper(this.root);
    postOrderHelper(this.root);

    return { inorder, preorder, postorder };
  }
}

// --- Graph (Adjacency List & Matrix) ---
export class CollaborationGraph {
  constructor(nodes, edges) {
    this.nodes = [...nodes];
    this.edges = [...edges];

    // Build Adjacency List
    this.adjList = new Map();
    this.nodes.forEach(n => this.adjList.set(n.id, []));
    this.edges.forEach(([u, v]) => {
      if (this.adjList.has(u) && this.adjList.has(v)) {
        this.adjList.get(u).push(v);
        this.adjList.get(v).push(u);
      }
    });
  }

  getAdjacencyMatrix() {
    const size = this.nodes.length;
    const idToIndex = new Map(this.nodes.map((n, i) => [n.id, i]));
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    this.edges.forEach(([u, v]) => {
      const i = idToIndex.get(u);
      const j = idToIndex.get(v);
      if (i !== undefined && j !== undefined) {
        matrix[i][j] = 1;
        matrix[j][i] = 1;
      }
    });

    return { matrix, labels: this.nodes.map(n => n.name.split(' ')[0]) };
  }

  /**
   * Breadth-First Search with hop counts and queue tracking
   */
  runBFS(startId) {
    const steps = [];
    const visited = new Set([startId]);
    const queue = [startId];
    const order = [];
    const hops = new Map([[startId, 0]]);
    const predecessors = new Map([[startId, null]]);

    steps.push({
      action: `Starting BFS at researcher #${startId}. Enqueued root at hop 0.`,
      currentNode: startId,
      queue: [...queue],
      visited: Array.from(visited),
      hops: Object.fromEntries(hops),
    });

    while (queue.length > 0) {
      const curr = queue.shift();
      order.push(curr);
      const currentHop = hops.get(curr);
      const neighbors = (this.adjList.get(curr) || []).sort((a, b) => a - b);

      steps.push({
        action: `Dequeued #${curr} at hop ${currentHop}. Checking collaborators.`,
        currentNode: curr,
        queue: [...queue],
        visited: Array.from(visited),
        hops: Object.fromEntries(hops),
      });

      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          hops.set(neighbor, currentHop + 1);
          predecessors.set(neighbor, curr);
          queue.push(neighbor);
          steps.push({
            action: `Discovered unvisited collaborator #${neighbor} (Hop ${currentHop + 1}). Added to queue.`,
            currentNode: neighbor,
            queue: [...queue],
            visited: Array.from(visited),
            hops: Object.fromEntries(hops),
          });
        }
      }
    }

    return { order, steps, hops: Object.fromEntries(hops), predecessors };
  }

  /**
   * Compute the exact shortest path between two researchers using BFS predecessors
   */
  getShortestPath(startId, targetId) {
    if (startId === targetId) {
      return { found: true, path: [startId], hops: 0 };
    }
    const { predecessors } = this.runBFS(startId);
    if (!predecessors.has(targetId)) {
      return { found: false, path: [], hops: 0 };
    }
    const path = [];
    let curr = targetId;
    while (curr !== null && curr !== undefined) {
      path.push(curr);
      curr = predecessors.get(curr);
    }
    path.reverse();
    const isValid = path.length > 0 && path[0] === startId;
    return {
      found: isValid,
      path: isValid ? path : [],
      hops: isValid ? path.length - 1 : 0
    };
  }

  /**
   * Depth-First Search with stack tracking
   */
  runDFS(startId) {
    const steps = [];
    const visited = new Set();
    const stack = [startId];
    const order = [];

    steps.push({
      action: `Starting DFS at researcher #${startId}. Pushed to stack.`,
      currentNode: startId,
      stack: [...stack],
      visited: Array.from(visited),
    });

    while (stack.length > 0) {
      const curr = stack.pop();
      if (!visited.has(curr)) {
        visited.add(curr);
        order.push(curr);

        steps.push({
          action: `Popped #${curr} from stack and marked visited. Exploring deep branch.`,
          currentNode: curr,
          stack: [...stack],
          visited: Array.from(visited),
        });

        const neighbors = (this.adjList.get(curr) || []).slice().reverse();
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
      }
    }

    return { order, steps };
  }
}
