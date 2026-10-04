"""
Phase 2: Structured Data Representation
Concept: Binary Search Tree (BST) (Python)

Real-world application:
Indexing researchers by publication output to support logarithmic search
and publication range queries [min_pubs, max_pubs].

BST Invariant:
For every node N:
- Keys in N.left < N.key
- Keys in N.right >= N.key

Time Complexities:
- Insert: O(log n) average, O(n) worst case
- Search: O(log n) average, O(n) worst case
- Range Query: O(k + log n) where k is matches count
Space Complexity: O(n)
"""

from typing import Optional, List, Dict, Any
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Researcher, INITIAL_RESEARCHERS

class BSTNode:
    def __init__(self, key: int, researcher: Researcher):
        self.key: int = key  # publication count
        self.researchers: List[Researcher] = [researcher]
        self.left: Optional['BSTNode'] = None
        self.right: Optional['BSTNode'] = None

    def __repr__(self) -> str:
        return f"BSTNode({self.key}: {[r.name for r in self.researchers]})"

class BinarySearchTree:
    def __init__(self, researchers: Optional[List[Researcher]] = None):
        self.root: Optional[BSTNode] = None
        if researchers:
            for r in researchers:
                self.insert(r.publications, r)

    def insert(self, key: int, researcher: Researcher) -> None:
        """Insert a researcher by publication key."""
        new_node = BSTNode(key, researcher)
        if not self.root:
            self.root = new_node
            return

        curr = self.root
        while True:
            if key == curr.key:
                curr.researchers.append(researcher)
                return
            elif key < curr.key:
                if not curr.left:
                    curr.left = new_node
                    return
                curr = curr.left
            else:
                if not curr.right:
                    curr.right = new_node
                    return
                curr = curr.right

    def search(self, key: int) -> Dict[str, Any]:
        """Search for researchers with exactly `key` publications."""
        curr = self.root
        comparisons = 0
        path: List[int] = []

        while curr:
            comparisons += 1
            path.append(curr.key)
            if key == curr.key:
                return {
                    'found': True,
                    'researchers': curr.researchers,
                    'comparisons': comparisons,
                    'path': path,
                }
            elif key < curr.key:
                curr = curr.left
            else:
                curr = curr.right

        return {
            'found': False,
            'researchers': [],
            'comparisons': comparisons,
            'path': path,
        }

    def range_query(self, min_pubs: int, max_pubs: int) -> List[Researcher]:
        """Find all researchers with publications in [min_pubs, max_pubs]."""
        matches: List[Researcher] = []

        def traverse(node: Optional[BSTNode]):
            if not node:
                return
            if node.key > min_pubs:
                traverse(node.left)
            if min_pubs <= node.key <= max_pubs:
                matches.extend(node.researchers)
            if node.key < max_pubs:
                traverse(node.right)

        traverse(self.root)
        return matches

if __name__ == '__main__':
    bst = BinarySearchTree(INITIAL_RESEARCHERS)
    print("=== Demo: Binary Search Tree (Publication Index) ===")

    target = 9
    print(f"\nSearching for researchers with {target} publications...")
    res = bst.search(target)
    print(f"  Found: {res['found']} ({res['comparisons']} comparisons, search path: {res['path']})")
    for r in res['researchers']:
        print(f"  - {r.name} ({r.department}, {r.institution})")

    min_p, max_p = 5, 10
    print(f"\nRange Query [{min_p} to {max_p} publications]:")
    range_scholars = bst.range_query(min_p, max_p)
    for r in range_scholars:
        print(f"  - {r.name}: {r.publications} publications ({r.institution})")
