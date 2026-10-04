"""
Phase 2: Structured Data Representation
Concept: Structured Academic Hierarchy (Python)

Real-world application:
Academic organizational tree: Institution -> Departments -> Researchers.
Calculates department-level totals for publications and citations.

Time Complexity: O(n) construction from researcher records
Space Complexity: O(n)
"""

from typing import List, Dict
from dataclasses import dataclass, field
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from data.mock_data import Researcher, INITIAL_RESEARCHERS

@dataclass
class DepartmentNode:
    department: str
    researchers: List[Researcher] = field(default_factory=list)

    @property
    def total_publications(self) -> int:
        return sum(r.publications for r in self.researchers)

    @property
    def total_citations(self) -> int:
        return sum(r.citations for r in self.researchers)

@dataclass
class InstitutionNode:
    institution: str
    departments: Dict[str, DepartmentNode] = field(default_factory=dict)

    @property
    def total_researchers(self) -> int:
        return sum(len(d.researchers) for d in self.departments.values())

class StructuredHierarchyManager:
    def __init__(self, researchers: List[Researcher] = INITIAL_RESEARCHERS):
        self.researchers = researchers

    def build_hierarchy(self) -> Dict[str, InstitutionNode]:
        tree: Dict[str, InstitutionNode] = {}

        for r in self.researchers:
            if r.institution not in tree:
                tree[r.institution] = InstitutionNode(institution=r.institution)

            inst_node = tree[r.institution]
            if r.department not in inst_node.departments:
                inst_node.departments[r.department] = DepartmentNode(department=r.department)

            inst_node.departments[r.department].researchers.append(r)

        return tree

if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    mgr = StructuredHierarchyManager()
    hierarchy = mgr.build_hierarchy()
    print("=== Demo: Structured Academic Hierarchy ===")
    for inst_name, inst in hierarchy.items():
        print(f"\n[Institution] {inst_name} ({inst.total_researchers} researchers)")
        for dept_name, dept in inst.departments.items():
            print(f"  +-- [Dept] {dept_name} [{dept.total_publications} pubs, {dept.total_citations} cites]")
            for r in dept.researchers:
                print(f"       * {r.name}: {r.publications} pubs, {r.citations} citations")
