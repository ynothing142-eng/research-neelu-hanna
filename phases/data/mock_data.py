"""
ResearchSphere Unified Dataset & Data Models in Python
Provides shared mock records and types across all 4 algorithmic phases.
"""

from dataclasses import dataclass
from typing import List, Tuple, Literal

@dataclass
class Researcher:
    id: int
    name: str
    department: str
    institution: str
    publications: int
    citations: int

@dataclass
class Post:
    id: int
    title: str
    date: str
    likes: int
    author_id: int = 1

@dataclass
class Request:
    id: int
    instrument: str
    requester: str
    start: int  # 24-hr integer start hour
    end: int    # 24-hr integer end hour
    status: Literal['Pending', 'Approved', 'Rejected']

# Co-authorship and collaboration edges between researchers
CollaborationEdge = Tuple[int, int]

INITIAL_RESEARCHERS: List[Researcher] = [
    Researcher(id=1, name='Hanna Neelu', department='Data Science', institution='KJU', publications=8, citations=42),
    Researcher(id=2, name='Arjun Kumar', department='Computer Science', institution='KJU', publications=5, citations=27),
    Researcher(id=3, name='Meera Sharma', department='Computer Science', institution='KJU', publications=12, citations=61),
    Researcher(id=4, name='Rahul Thomas', department='Data Science', institution='KJU', publications=9, citations=35),
    Researcher(id=5, name='Ishita Rao', department='Biotechnology', institution='Bengaluru Institute', publications=3, citations=14),
    Researcher(id=6, name='Vikram Das', department='Electronics', institution='Bengaluru Institute', publications=7, citations=30),
    Researcher(id=7, name='Nisha George', department='Computer Science', institution='National Research Lab', publications=10, citations=52),
    Researcher(id=8, name='Kabir Shah', department='Data Science', institution='National Research Lab', publications=4, citations=18),
]

INITIAL_POSTS: List[Post] = [
    Post(id=1, title='Research Project Ideas', date='2026-08-19', likes=12, author_id=1),
    Post(id=2, title='AI Workshop & Neural Networks', date='2026-08-21', likes=28, author_id=3),
    Post(id=3, title='Data Science Discovery', date='2026-08-24', likes=19, author_id=4),
    Post(id=4, title='Instrument Sharing Pilot', date='2026-08-27', likes=35, author_id=7),
    Post(id=5, title='New Research Opportunity', date='2026-09-02', likes=24, author_id=2),
]

INITIAL_REQUESTS: List[Request] = [
    Request(id=1, instrument='GPU Workstation', requester='Hanna Neelu', start=1, end=4, status='Approved'),
    Request(id=2, instrument='GPU Workstation', requester='Arjun Kumar', start=3, end=6, status='Pending'),
    Request(id=3, instrument='3D Printer', requester='Ishita Rao', start=2, end=5, status='Pending'),
    Request(id=4, instrument='3D Printer', requester='Kabir Shah', start=6, end=8, status='Approved'),
    Request(id=5, instrument='Arduino Kit', requester='Rahul Thomas', start=4, end=7, status='Rejected'),
    Request(id=6, instrument='Spectrometer', requester='Vikram Das', start=5, end=9, status='Pending'),
]

INITIAL_EDGES: List[CollaborationEdge] = [
    (1, 2),
    (1, 4),
    (2, 3),
    (3, 4),
    (4, 6),
    (6, 7),
    (7, 8),
]
