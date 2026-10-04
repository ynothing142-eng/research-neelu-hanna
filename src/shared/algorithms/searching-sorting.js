/**
 * Searching and Sorting Algorithms
 * Step-by-step generators and benchmark calculations.
 */

// --- Searches ---
export function runLinearSearch(items, keyExtractor, target) {
  const steps = [];
  let comparisons = 0;

  for (let i = 0; i < items.length; i++) {
    comparisons++;
    const val = keyExtractor(items[i]);
    const matched = val === target;

    steps.push({
      currentIndex: i,
      currentValue: val,
      target,
      matched,
      comparisons,
      action: matched
        ? `Index ${i} (${val}) matches target ${target}!`
        : `Index ${i} (${val}) != ${target}. Advancing to next element.`,
    });

    if (matched) {
      return { found: true, index: i, comparisons, steps, item: items[i] };
    }
  }

  return { found: false, index: -1, comparisons, steps, item: null };
}

export function runBinarySearch(sortedItems, keyExtractor, target) {
  const steps = [];
  let low = 0;
  let high = sortedItems.length - 1;
  let comparisons = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    comparisons++;
    const midVal = keyExtractor(sortedItems[mid]);

    if (midVal === target) {
      steps.push({
        low,
        mid,
        high,
        midVal,
        target,
        comparisons,
        action: `Target ${target} found at mid index ${mid}!`,
        found: true,
      });
      return { found: true, index: mid, comparisons, steps, item: sortedItems[mid] };
    } else if (midVal < target) {
      steps.push({
        low,
        mid,
        high,
        midVal,
        target,
        comparisons,
        action: `${midVal} < ${target} -> Target is in upper half. Moving low pointer to ${mid + 1}.`,
        found: false,
      });
      low = mid + 1;
    } else {
      steps.push({
        low,
        mid,
        high,
        midVal,
        target,
        comparisons,
        action: `${midVal} > ${target} -> Target is in lower half. Moving high pointer to ${mid - 1}.`,
        found: false,
      });
      high = mid - 1;
    }
  }

  steps.push({
    low,
    mid: -1,
    high,
    midVal: null,
    target,
    comparisons,
    action: `Search window exhausted (${low} > ${high}). Target ${target} not in dataset.`,
    found: false,
  });

  return { found: false, index: -1, comparisons, steps, item: null };
}

// --- Sorting Step-By-Step Visualizers ---

export function generateBubbleSortSteps(initialArray, keyFn) {
  const arr = [...initialArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      const a = keyFn(arr[j]);
      const b = keyFn(arr[j + 1]);

      if (a > b) {
        swaps++;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          swapped: true,
          comparisons,
          swaps,
          action: `Swapped: ${a} > ${b} at indices ${j} and ${j + 1}.`,
        });
      } else {
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          swapped: false,
          comparisons,
          swaps,
          action: `In order: ${a} <= ${b}. No swap needed.`,
        });
      }
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    swapped: false,
    comparisons,
    swaps,
    action: `Bubble sort finished. All elements are sorted!`,
  });

  return { steps, comparisons, swaps, sorted: arr };
}

export function generateInsertionSortSteps(initialArray, keyFn) {
  const arr = [...initialArray];
  const steps = [];
  let comparisons = 0;
  let shifts = 0;

  for (let i = 1; i < arr.length; i++) {
    const keyItem = arr[i];
    const keyVal = keyFn(keyItem);
    let j = i - 1;

    steps.push({
      array: [...arr],
      activeIndices: [i],
      keyIndex: i,
      comparisons,
      swaps: shifts,
      action: `Selected key ${keyVal} at index ${i} to insert into sorted sublist [0..${i - 1}].`,
    });

    while (j >= 0) {
      comparisons++;
      if (keyFn(arr[j]) > keyVal) {
        shifts++;
        arr[j + 1] = arr[j];
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          keyIndex: j,
          comparisons,
          swaps: shifts,
          action: `Shifted ${keyFn(arr[j])} right to make room for ${keyVal}.`,
        });
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = keyItem;
    steps.push({
      array: [...arr],
      activeIndices: [j + 1],
      keyIndex: j + 1,
      comparisons,
      swaps: shifts,
      action: `Inserted key ${keyVal} at index ${j + 1}.`,
    });
  }

  return { steps, comparisons, swaps: shifts, sorted: arr };
}

export function generateMergeSortSteps(initialArray, keyFn) {
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function mergeSortHelper(items, startIndex = 0) {
    if (items.length <= 1) return items;

    const mid = Math.floor(items.length / 2);
    const left = mergeSortHelper(items.slice(0, mid), startIndex);
    const right = mergeSortHelper(items.slice(mid), startIndex + mid);

    const merged = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      comparisons++;
      if (keyFn(left[i]) <= keyFn(right[j])) {
        merged.push(left[i++]);
      } else {
        swaps++;
        merged.push(right[j++]);
      }
    }

    while (i < left.length) merged.push(left[i++]);
    while (j < right.length) merged.push(right[j++]);

    steps.push({
      array: [...merged],
      activeIndices: [startIndex, startIndex + merged.length - 1],
      comparisons,
      swaps,
      action: `Merged sub-arrays into sorted chunk: [${merged.map(keyFn).join(', ')}]`,
    });

    return merged;
  }

  const sorted = mergeSortHelper(initialArray, 0);
  return { steps, comparisons, swaps, sorted };
}

export function generateQuickSortSteps(initialArray, keyFn) {
  const arr = [...initialArray];
  const steps = [];
  let comparisons = 0;
  let swaps = 0;

  function quickSortHelper(low, high) {
    if (low < high) {
      const pivot = arr[high];
      const pivotVal = keyFn(pivot);
      let i = low - 1;

      steps.push({
        array: [...arr],
        activeIndices: [high],
        pivotIndex: high,
        comparisons,
        swaps,
        action: `Partitioning range [${low}..${high}] with pivot ${pivotVal}.`,
      });

      for (let j = low; j < high; j++) {
        comparisons++;
        if (keyFn(arr[j]) <= pivotVal) {
          i++;
          swaps++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          steps.push({
            array: [...arr],
            activeIndices: [i, j],
            pivotIndex: high,
            comparisons,
            swaps,
            action: `Swapped index ${i} (${keyFn(arr[i])}) and ${j} (${keyFn(arr[j])}) to be <= pivot.`,
          });
        }
      }

      swaps++;
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      const pi = i + 1;

      steps.push({
        array: [...arr],
        activeIndices: [pi],
        pivotIndex: pi,
        comparisons,
        swaps,
        action: `Placed pivot ${pivotVal} at its final sorted position index ${pi}.`,
      });

      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    }
  }

  quickSortHelper(0, arr.length - 1);
  return { steps, comparisons, swaps, sorted: arr };
}

// --- Binary Heap (Min / Max) ---
export class BinaryHeap {
  constructor(isMaxHeap = true, keyFn = (x) => x) {
    this.isMax = isMaxHeap;
    this.keyFn = keyFn;
    this.items = [];
  }

  compare(a, b) {
    const valA = this.keyFn(a);
    const valB = this.keyFn(b);
    return this.isMax ? valA > valB : valA < valB;
  }

  insert(item) {
    this.items.push(item);
    let i = this.items.length - 1;

    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.items[i], this.items[parent])) {
        [this.items[i], this.items[parent]] = [this.items[parent], this.items[i]];
        i = parent;
      } else {
        break;
      }
    }
  }

  extract() {
    if (this.items.length === 0) return null;
    if (this.items.length === 1) return this.items.pop();

    const root = this.items[0];
    this.items[0] = this.items.pop();
    let i = 0;
    const n = this.items.length;

    while (true) {
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      let target = i;

      if (left < n && this.compare(this.items[left], this.items[target])) {
        target = left;
      }
      if (right < n && this.compare(this.items[right], this.items[target])) {
        target = right;
      }

      if (target !== i) {
        [this.items[i], this.items[target]] = [this.items[target], this.items[i]];
        i = target;
      } else {
        break;
      }
    }

    return root;
  }

  peek() {
    return this.items[0] || null;
  }

  toArray() {
    return [...this.items];
  }
}

// --- Benchmark Data Generator ---
export function calculateBenchmarks() {
  const sizes = [10, 50, 100, 250, 500];
  return sizes.map((n) => ({
    n,
    linearSearch: n / 2,
    binarySearch: Math.round(Math.log2(n)),
    bubbleSort: Math.round((n * (n - 1)) / 2),
    mergeSort: Math.round(n * Math.log2(n)),
    quickSort: Math.round(n * Math.log2(n)),
  }));
}
