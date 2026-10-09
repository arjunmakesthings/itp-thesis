//2d cellular automaton on an infinite lattice (z^2); october 9th, 2026.
//
//formal definition:
//  - lattice:       z^2, unbounded in every direction.
//  - states:        {0, 1} (dead, alive).
//  - neighborhood:  a fixed list of offsets.
//  - local rule:    outer-totalistic, written as b/s (birth/survival).
//  - update:        synchronous; every cell changes at once, based on the previous generation.
//
//only live cells are stored, so the space is infinite and costs memory proportional to the population.

//neighborhoods, as lists of [dx, dy] offsets.
const MOORE = [
  [-1, -1], [0, -1], [1, -1],
  [-1, 0],           [1, 0],
  [-1, 1],  [0, 1],  [1, 1],
];

const VON_NEUMANN = [
  [0, -1],
  [-1, 0], [1, 0],
  [0, 1],
];

//parse a rule like "B3/S23" into { birth: Set, survive: Set }.
function parse_rule(rule) {
  const match = /^B(\d*)\/S(\d*)$/i.exec(rule);
  if (!match) throw new Error("bad rule: " + rule);
  const digits = (s) => new Set([...s].map(Number));
  return { birth: digits(match[1]), survive: digits(match[2]) };
}

const key = (x, y) => x + "," + y;
const unkey = (k) => k.split(",").map(Number);

class Automaton {
  //cells: array of [x, y] live cells.
  constructor(cells, rule = "B3/S23", neighborhood = MOORE) {
    this.live = new Set(cells.map(([x, y]) => key(x, y)));
    this.rule = parse_rule(rule);
    this.neighborhood = neighborhood;
    this.generation = 0;
  }

  //advance one generation.
  step() {
    //for every live cell, tell each of its neighbors "one live neighbor here".
    //dead cells that touch no live cell never appear, and could never be born.
    const counts = new Map();
    for (const k of this.live) {
      const [x, y] = unkey(k);
      for (const [dx, dy] of this.neighborhood) {
        const nk = key(x + dx, y + dy);
        counts.set(nk, (counts.get(nk) || 0) + 1);
      }
    }

    //apply the rule to every cell that has at least one live neighbor.
    //a live cell with zero live neighbors is not in counts, so check survival of 0 separately.
    const next = new Set();
    for (const [k, n] of counts) {
      const alive = this.live.has(k);
      if (alive ? this.rule.survive.has(n) : this.rule.birth.has(n)) {
        next.add(k);
      }
    }
    if (this.rule.survive.has(0)) {
      for (const k of this.live) {
        if (!counts.has(k)) next.add(k);
      }
    }

    this.live = next;
    this.generation++;
  }

  //smallest rectangle containing every live cell, or null if the population is zero.
  bounds() {
    if (this.live.size === 0) return null;
    let min_x = Infinity, max_x = -Infinity, min_y = Infinity, max_y = -Infinity;
    for (const k of this.live) {
      const [x, y] = unkey(k);
      min_x = Math.min(min_x, x);
      max_x = Math.max(max_x, x);
      min_y = Math.min(min_y, y);
      max_y = Math.max(max_y, y);
    }
    return { min_x, max_x, min_y, max_y };
  }

  //print the window around the live cells (with a 1-cell margin).
  print() {
    console.log(
      "generation " + this.generation + ", population " + this.live.size
    );
    const b = this.bounds();
    if (!b) {
      console.log("(empty)");
      return;
    }
    for (let y = b.min_y - 1; y <= b.max_y + 1; y++) {
      let line = "";
      for (let x = b.min_x - 1; x <= b.max_x + 1; x++) {
        line += this.live.has(key(x, y)) ? "# " : ". ";
      }
      console.log(line);
    }
    console.log("");
  }
}

//demo: a glider, which moves one cell diagonally every 4 generations, forever.
const glider = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];

const life = new Automaton(glider, "B3/S23", MOORE);

life.print();
for (let g = 0; g < 8; g++) {
  life.step();
  life.print();
}
