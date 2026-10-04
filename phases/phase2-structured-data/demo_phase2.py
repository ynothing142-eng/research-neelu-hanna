"""
Phase 2 Interactive Terminal Demo
Demonstrates all Structured Data Representation concepts sequentially.
"""

import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
sys.path.append(os.path.dirname(__file__))

from hierarchy import StructuredHierarchyManager
from binary_tree import BinaryTreeNode, in_order_traversal, level_order_traversal
from binary_search_tree import BinarySearchTree
from graph_traversal import CollaborationGraph
from data.mock_data import INITIAL_RESEARCHERS, INITIAL_EDGES

def run_phase2_demo():
    print("=" * 60)
    print("   RESEARCHSPHERE · PHASE 2: STRUCTURED DATA REPRESENTATION   ")
    print("=" * 60)

    # 1. Hierarchy
    print("\n[Concept 1: Multi-Level Academic Hierarchy]")
    mgr = StructuredHierarchyManager(INITIAL_RESEARCHERS)
    tree = mgr.build_hierarchy()
    for inst, data in tree.items():
        print(f"Institution: {inst} (Depts: {list(data.departments.keys())})")

    # 2. Binary Tree Traversals
    print("\n[Concept 2: Binary Tree Traversals]")
    bio = BinaryTreeNode("Biotech")
    cs = BinaryTreeNode("Computer Science", left=bio)
    ds = BinaryTreeNode("Data Science")
    root = BinaryTreeNode("KJU (Root)", left=cs, right=ds)
    print(f"Level-Order (BFS queue): {' -> '.join(level_order_traversal(root))}")
    print(f"In-Order (Left-Root-Right): {' -> '.join(in_order_traversal(root))}")

    # 3. Binary Search Tree
    print("\n[Concept 3: Binary Search Tree (Publication Index)]")
    bst = BinarySearchTree(INITIAL_RESEARCHERS)
    search_target = 7
    res = bst.search(search_target)
    print(f"Search for {search_target} publications: Found={res['found']} ({res['comparisons']} comparisons)")
    for r in res['researchers']:
        print(f"  Scholar: {r.name} ({r.department})")

    # 4. Collaboration Network Graph
    print("\n[Concept 4: Graph Representation & BFS / DFS]")
    graph = CollaborationGraph(INITIAL_EDGES)
    bfs_order, _ = graph.bfs(1)
    dfs_order = graph.dfs(1)
    print(f"BFS Order from #1 (Shortest path exploration): {bfs_order}")
    print(f"DFS Order from #1 (Deep cluster exploration):   {dfs_order}")

    path = graph.shortest_path(1, 8)
    print(f"Shortest path from Researcher #1 to #8: {' -> '.join(str(n) for n in path)}")

    print("=" * 60)
    print("Phase 2 verification complete: All concepts executed successfully!")
    print("=" * 60)

if __name__ == '__main__':
    run_phase2_demo()
