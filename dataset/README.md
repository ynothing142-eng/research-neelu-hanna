# ResearchSphere Unified Dataset

This subfolder houses the **single source of truth** dataset for the entire ResearchSphere project across all 4 algorithmic phases.

## Directory Contents

| File | Format | Description |
| :--- | :--- | :--- |
| [`schema.sql`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/schema.sql) | SQL (MySQL DDL/DML) | Relational database schema with `CREATE TABLE` and `INSERT INTO` statements. |
| [`dataset.py`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/dataset.py) | Python 3 | Dataclasses, lists of records, and formatted terminal inspection script. |
| [`dataset.js`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/dataset.js) | JavaScript ES Module | Frontend dataset exports for React 18 visualizations. |
| [`researchers.json`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/researchers.json) | JSON | Raw JSON records for all 8 researchers. |
| [`posts.json`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/posts.json) | JSON | Raw JSON records for all 5 activity feed posts. |
| [`requests.json`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/requests.json) | JSON | Raw JSON records for all 6 equipment reservation requests. |
| [`collaborations.json`](file:///c:/Users/Rajesh%20dhami%20D/Downloads/researchsphere-analytics-main/dataset/collaborations.json) | JSON | Co-authorship edges between researchers. |

---

## Interactive Inspection

To inspect the entire dataset formatted in the terminal:
```bash
python dataset/dataset.py
```
