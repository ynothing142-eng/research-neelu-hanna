/**
 * Data Optimization Algorithms
 * Greedy Interval Scheduling (EFT) vs Naive FCFS and Cross-Phase Synthesis.
 */

export function doRequestsConflict(r1, r2) {
  if (r1.instrument !== r2.instrument) return false;
  return Math.max(r1.start, r2.start) < Math.min(r1.end, r2.end);
}

/**
 * Greedy Interval Scheduling: Earliest Finish Time First
 * Generates step-by-step traces for visualization.
 */
export function runGreedyIntervalScheduling(requests) {
  const steps = [];
  const eligible = requests.filter(r => r.status !== 'Rejected');
  const sorted = [...eligible].sort((a, b) => a.end - b.end);

  const accepted = [];
  const conflicted = [];

  steps.push({
    action: `Filtered out rejected requests. Sorted ${sorted.length} eligible requests by finish time (earliest first).`,
    currentRequest: null,
    accepted: [],
    conflicted: [],
  });

  for (const req of sorted) {
    const conflict = accepted.find(acc => doRequestsConflict(acc, req));

    if (!conflict) {
      accepted.push(req);
      steps.push({
        action: `Accepted Request #${req.id} (${req.instrument}, ${req.start}:00-${req.end}:00). Earliest finish time with zero overlap.`,
        currentRequest: req,
        decision: 'ACCEPTED',
        accepted: [...accepted],
        conflicted: [...conflicted],
      });
    } else {
      conflicted.push(req);
      steps.push({
        action: `Rejected Request #${req.id} (${req.requester}). Overlaps with approved Request #${conflict.id} on ${req.instrument}.`,
        currentRequest: req,
        decision: 'CONFLICT',
        accepted: [...accepted],
        conflicted: [...conflicted],
      });
    }
  }

  return {
    accepted,
    conflicted,
    steps,
    totalAccepted: accepted.length,
    efficiencyRate: `${Math.round((accepted.length / requests.length) * 100)}%`,
  };
}

/**
 * Naive First-Come-First-Served (FCFS) for direct baseline comparison
 */
export function runNaiveFCFS(requests) {
  const eligible = requests.filter(r => r.status !== 'Rejected');
  const accepted = [];
  const conflicted = [];

  for (const req of eligible) {
    const conflict = accepted.find(acc => doRequestsConflict(acc, req));
    if (!conflict) {
      accepted.push(req);
    } else {
      conflicted.push(req);
    }
  }

  return {
    accepted,
    conflicted,
    totalAccepted: accepted.length,
  };
}

/**
 * Synthesize metrics from all phases into a clean integration dashboard
 */
export function synthesizeCrossPhaseDashboard(researchers, requests, graphEdges) {
  // Phase 3: Top cited researcher via heap/sort
  const topScholar = [...researchers].sort((a, b) => b.citations - a.citations)[0];

  // Phase 4: Optimal schedule
  const optimalSched = runGreedyIntervalScheduling(requests);
  const naiveSched = runNaiveFCFS(requests);

  // Phase 2: Collaboration clusters (degrees of connectivity)
  const degreeMap = new Map();
  researchers.forEach(r => degreeMap.set(r.id, 0));
  graphEdges.forEach(([u, v]) => {
    degreeMap.set(u, (degreeMap.get(u) || 0) + 1);
    degreeMap.set(v, (degreeMap.get(v) || 0) + 1);
  });
  let hubId = 1;
  let maxDegree = 0;
  degreeMap.forEach((deg, id) => {
    if (deg > maxDegree) {
      maxDegree = deg;
      hubId = id;
    }
  });
  const hubScholar = researchers.find(r => r.id === hubId) || researchers[0];

  // Instrument demand
  const instrumentCounts = {};
  requests.forEach(r => {
    instrumentCounts[r.instrument] = (instrumentCounts[r.instrument] || 0) + 1;
  });
  const busiestInstrument = Object.entries(instrumentCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    topScholar,
    hubScholar: { ...hubScholar, connections: maxDegree },
    busiestInstrument: { name: busiestInstrument[0], count: busiestInstrument[1] },
    schedulingComparison: {
      greedyAccepted: optimalSched.totalAccepted,
      naiveAccepted: naiveSched.totalAccepted,
      improvement: optimalSched.totalAccepted >= naiveSched.totalAccepted
        ? `Greedy delivers +${optimalSched.totalAccepted - naiveSched.totalAccepted} more bookings than FCFS`
        : 'Equal bookings',
    },
  };
}
