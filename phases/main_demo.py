"""
ResearchSphere Master Python Demonstration
Executes all 4 Algorithmic Phases sequentially or via interactive menu.
"""

import sys
import os

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.append(BASE_DIR)

for phase_dir in [
    'phase1-core-data-handling',
    'phase2-structured-data',
    'phase3-searching-sorting',
    'phase4-data-optimization'
]:
    p = os.path.join(BASE_DIR, phase_dir)
    if p not in sys.path:
        sys.path.append(p)

import demo_phase1
import demo_phase2
import demo_phase3
import demo_phase4

def run_all():
    print("\n" + "=" * 65)
    print("      RESEARCHSPHERE - COMPLETE DSA MULTI-PHASE DEMONSTRATION     ")
    print("=" * 65 + "\n")
    demo_phase1.run_phase1_demo()
    print("\n")
    demo_phase2.run_phase2_demo()
    print("\n")
    demo_phase3.run_phase3_demo()
    print("\n")
    demo_phase4.run_phase4_demo()
    print("\n" + "=" * 65)
    print("      ALL 4 ALGORITHMIC PHASES EXECUTED & VERIFIED IN PYTHON     ")
    print("=" * 65 + "\n")

def interactive_menu():
    phases = {
        '1': ("Phase 1: Core Data Handling", demo_phase1.run_phase1_demo),
        '2': ("Phase 2: Structured Data Representation", demo_phase2.run_phase2_demo),
        '3': ("Phase 3: Searching & Sorting", demo_phase3.run_phase3_demo),
        '4': ("Phase 4: Data Optimization", demo_phase4.run_phase4_demo),
        '5': ("Run All Phases Sequentially", run_all),
    }

    while True:
        print("\n" + "=" * 60)
        print("          RESEARCHSPHERE - DSA MASTER DEMO MENU            ")
        print("=" * 60)
        for key, (label, _) in phases.items():
            print(f"  [{key}] {label}")
        print("  [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-5) [default: 5]: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nExiting.")
            break

        if choice in ('0', 'q', 'exit'):
            print("Exiting demo. Goodbye!")
            break
        elif choice == '' or choice == '5':
            run_all()
            break
        elif choice in phases:
            print()
            phases[choice][1]()
        else:
            print(f"Invalid option: '{choice}'. Please enter 0-5.")

if __name__ == '__main__':
    args = sys.argv[1:]
    if '--menu' in args or '-m' in args:
        interactive_menu()
    elif len(args) == 1 and args[0] in ('1', '2', '3', '4'):
        actions = {
            '1': demo_phase1.run_phase1_demo,
            '2': demo_phase2.run_phase2_demo,
            '3': demo_phase3.run_phase3_demo,
            '4': demo_phase4.run_phase4_demo,
        }
        actions[args[0]]()
    else:
        # Default behavior: run all sequentially (preserves scriptability / CI)
        run_all()
