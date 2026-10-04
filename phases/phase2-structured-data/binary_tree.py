"""
Phase 2: Structured Data Representation
Concept: Binary Tree & Traversals (Python)

Real-world application:
Academic discipline classification and hierarchy exploration:
- In-Order (Left, Root, Right): Generates sorted/alphabetic order.
- Pre-Order (Root, Left, Right): Serializes hierarchy from root downwards.
- Post-Order (Left, Right, Root): Bottom-up citation rollups and cleanup.
- Level-Order (Breadth-First Queue): Explores tier-by-tier.

Time Complexity: O(n) for all 4 traversals
Space Complexity: O(h) recursion stack (h = height), O(n) queue for level-order
"""

from typing import TypeVar, Generic, Optional, List
from collections import deque

T = TypeVar('T')

class BinaryTreeNode(Generic[T]):
    def __init__(self, value: T, left: Optional['BinaryTreeNode[T]'] = None, right: Optional['BinaryTreeNode[T]'] = None):
        self.value: T = value
        self.left: Optional['BinaryTreeNode[T]'] = left
        self.right: Optional['BinaryTreeNode[T]'] = right

    def __repr__(self) -> str:
        return f"TreeNode({self.value})"

def in_order_traversal(root: Optional[BinaryTreeNode[T]]) -> List[T]:
    """In-Order: Left -> Root -> Right"""
    result: List[T] = []
    def traverse(node: Optional[BinaryTreeNode[T]]):
        if not node:
            return
        traverse(node.left)
        result.append(node.value)
        traverse(node.right)
    traverse(root)
    return result

def pre_order_traversal(root: Optional[BinaryTreeNode[T]]) -> List[T]:
    """Pre-Order: Root -> Left -> Right"""
    result: List[T] = []
    def traverse(node: Optional[BinaryTreeNode[T]]):
        if not node:
            return
        result.append(node.value)
        traverse(node.left)
        traverse(node.right)
    traverse(root)
    return result

def post_order_traversal(root: Optional[BinaryTreeNode[T]]) -> List[T]:
    """Post-Order: Left -> Right -> Root"""
    result: List[T] = []
    def traverse(node: Optional[BinaryTreeNode[T]]):
        if not node:
            return
        traverse(node.left)
        traverse(node.right)
        result.append(node.value)
    traverse(root)
    return result

def level_order_traversal(root: Optional[BinaryTreeNode[T]]) -> List[T]:
    """Level-Order: Breadth-first traversal using a queue"""
    if not root:
        return []
    result: List[T] = []
    queue: deque[BinaryTreeNode[T]] = deque([root])
    while queue:
        curr = queue.popleft()
        result.append(curr.value)
        if curr.left:
            queue.append(curr.left)
        if curr.right:
            queue.append(curr.right)
    return result

if __name__ == '__main__':
    # Build demo academic tree:
    #         KJU
    #        /   \
    #      CS     DS
    #     /
    #   Bio
    bio = BinaryTreeNode("Biotechnology")
    cs = BinaryTreeNode("Computer Science", left=bio)
    ds = BinaryTreeNode("Data Science")
    root = BinaryTreeNode("KJU (Institution)", left=cs, right=ds)

    print("=== Demo: Binary Tree Traversals ===")
    print("In-Order:    ", " -> ".join(in_order_traversal(root)))
    print("Pre-Order:   ", " -> ".join(pre_order_traversal(root)))
    print("Post-Order:  ", " -> ".join(post_order_traversal(root)))
    print("Level-Order: ", " -> ".join(level_order_traversal(root)))
