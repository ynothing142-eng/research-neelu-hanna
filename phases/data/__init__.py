import sys
import os

_dir = os.path.dirname(os.path.abspath(__file__))
if _dir not in sys.path:
    sys.path.insert(0, _dir)

from mock_data import (
    Researcher,
    Post,
    Request,
    CollaborationEdge,
    INITIAL_RESEARCHERS,
    INITIAL_POSTS,
    INITIAL_REQUESTS,
    INITIAL_EDGES,
)

__all__ = [
    'Researcher',
    'Post',
    'Request',
    'CollaborationEdge',
    'INITIAL_RESEARCHERS',
    'INITIAL_POSTS',
    'INITIAL_REQUESTS',
    'INITIAL_EDGES',
]
