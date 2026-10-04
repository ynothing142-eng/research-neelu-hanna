"""
ResearchSphere Unified Dataset Loader & Interactive Inspector
Single source of truth across all 4 algorithmic phases.
"""

from dataclasses import dataclass
from typing import List, Tuple

@dataclass
class Researcher:
    id: int
    name: str
    department: str
    institution: str
    publications: int
    citations: int
    year_joined: int = 2020

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
    start: int
    end: int
    status: str

# All 8 Researchers (Exact dataset)
RESEARCHERS: List[Researcher] = [
    Researcher(id=1, name='Hanna Neelu', department='Data Science', institution='KJU', publications=8, citations=42, year_joined=2021),
    Researcher(id=2, name='Arjun Kumar', department='Computer Science', institution='KJU', publications=5, citations=27, year_joined=2023),
    Researcher(id=3, name='Meera Sharma', department='Computer Science', institution='KJU', publications=12, citations=61, year_joined=2019),
    Researcher(id=4, name='Rahul Thomas', department='Data Science', institution='KJU', publications=9, citations=35, year_joined=2020),
    Researcher(id=5, name='Ishita Rao', department='Biotechnology', institution='Bengaluru Institute', publications=3, citations=14, year_joined=2024),
    Researcher(id=6, name='Vikram Das', department='Electronics', institution='Bengaluru Institute', publications=7, citations=30, year_joined=2022),
    Researcher(id=7, name='Nisha George', department='Computer Science', institution='National Research Lab', publications=10, citations=52, year_joined=2018),
    Researcher(id=8, name='Kabir Shah', department='Data Science', institution='National Research Lab', publications=4, citations=18, year_joined=2023),
]

# All 5 Posts (Activity Feed)
POSTS: List[Post] = [
    Post(id=1, title='Research Project Ideas', date='2026-08-19', likes=12, author_id=1),
    Post(id=2, title='AI Workshop & Neural Networks', date='2026-08-21', likes=28, author_id=3),
    Post(id=3, title='Data Science Discovery', date='2026-08-24', likes=19, author_id=4),
    Post(id=4, title='Instrument Sharing Pilot', date='2026-08-27', likes=35, author_id=7),
    Post(id=5, title='New Research Opportunity', date='2026-09-02', likes=24, author_id=2),
]

# All 6 Equipment Requests (Lab reservations)
REQUESTS: List[Request] = [
    Request(id=1, instrument='GPU Workstation', requester='Hanna Neelu', start=1, end=4, status='Approved'),
    Request(id=2, instrument='GPU Workstation', requester='Arjun Kumar', start=3, end=6, status='Pending'),
    Request(id=3, instrument='3D Printer', requester='Ishita Rao', start=2, end=5, status='Pending'),
    Request(id=4, instrument='3D Printer', requester='Kabir Shah', start=6, end=8, status='Approved'),
    Request(id=5, instrument='Arduino Kit', requester='Rahul Thomas', start=4, end=7, status='Rejected'),
    Request(id=6, instrument='Spectrometer', requester='Vikram Das', start=5, end=9, status='Pending'),
]

# All 7 Collaboration Edges
COLLABORATION_EDGES: List[Tuple[int, int]] = [
    (1, 2), # Hanna <-> Arjun
    (1, 4), # Hanna <-> Rahul
    (2, 3), # Arjun <-> Meera
    (3, 4), # Meera <-> Rahul
    (4, 6), # Rahul <-> Vikram
    (6, 7), # Vikram <-> Nisha
    (7, 8), # Nisha <-> Kabir
]

def print_dataset_summary():
    """Prints a structured summary of the entire dataset."""
    print("=" * 72)
    print("      RESEARCHSPHERE UNIFIED DATASET (SINGLE SOURCE OF TRUTH)     ")
    print("=" * 72)
    
    print("\n[TABLE 1: RESEARCHERS (8 records)]")
    print(f"{'ID':<4} {'Name':<16} {'Department':<18} {'Institution':<22} {'Pubs':<6} {'Citations':<10}")
    print("-" * 72)
    for r in RESEARCHERS:
        print(f"{r.id:<4} {r.name:<16} {r.department:<18} {r.institution:<22} {r.publications:<6} {r.citations:<10}")

    print("\n[TABLE 2: POSTS / ACTIVITY FEED (5 records)]")
    print(f"{'ID':<4} {'Title':<34} {'Date':<14} {'Likes':<6} {'Author':<10}")
    print("-" * 72)
    for p in POSTS:
        author = next((r.name for r in RESEARCHERS if r.id == p.author_id), "Unknown")
        print(f"{p.id:<4} {p.title:<34} {p.date:<14} {p.likes:<6} {author:<10}")

    print("\n[TABLE 3: EQUIPMENT REQUESTS (6 records)]")
    print(f"{'ID':<4} {'Instrument':<18} {'Requester':<16} {'Time Slot':<12} {'Status':<10}")
    print("-" * 72)
    for req in REQUESTS:
        slot = f"{req.start}:00-{req.end}:00"
        print(f"{req.id:<4} {req.instrument:<18} {req.requester:<16} {slot:<12} {req.status:<10}")

    print("\n[TABLE 4: COLLABORATION EDGES (7 pairs)]")
    for u, v in COLLABORATION_EDGES:
        name_u = next((r.name for r in RESEARCHERS if r.id == u), f"#{u}")
        name_v = next((r.name for r in RESEARCHERS if r.id == v), f"#{v}")
        print(f"  • #{u} {name_u} <──── co-author ────> #{v} {name_v}")
    print("=" * 72 + "\n")

if __name__ == '__main__':
    print_dataset_summary()
