//2d automata; october 8th, 2026.

//a space is a set of all cells.

class Space {
  //r rows by c columns.
  constructor(r, c) {
    this.contents = [];

    for (let i = 0; i < r; i++) {
      let row = [];
      for (let j = 0; j < c; j++) {
        row.push(new Cell(0));
      }
      this.contents.push(row);
    }
  }
}

class Cell {
  constructor(s) {
    this.state = s;
  }
}

//given an index in a representation of a space, return the indices of its neighbors.
//neighbors that fall off the edge are null (no wrapping).
function get_neighbors(space, r, c) {
  const rows = space.contents.length;
  const cols = space.contents[0].length;
  const at = (i, j) =>
    i >= 0 && i < rows && j >= 0 && j < cols ? [i, j] : null;

  return {
    //up_left: at(r - 1, c - 1),
    up: at(r - 1, c),
    //up_right: at(r - 1, c + 1),
    left: at(r, c - 1),
    right: at(r, c + 1),
    //down_left: at(r + 1, c - 1),
    down: at(r + 1, c),
    //down_right: at(r + 1, c + 1),
  };
}

//given a space, cell-index & its neighbors-indices, compute a new state:
function get_new_state(p_space, cell, neighbors) {
  //count the neighbors that are alive (state 1), skipping off-grid (null) ones.
  const alive_neighbors = Object.values(neighbors)
    .filter((n) => n !== null)
    .map((n) => p_space.contents[n[0]][n[1]].state)
    .filter((s) => s === 1).length;

  //rule: alive if exactly 1 or 2 neighbors are alive, otherwise dead.
  return alive_neighbors === 1 || alive_neighbors === 2 ? 1 : 0;
}

//print a space, one row per line.
function print_space(space) {
  for (const row of space.contents) {
    console.log(row.map((cell) => (cell.state === 1 ? "#" : ".")).join(" "));
  }
}

//compute one generation: every new state comes from the old space (p_space).
function step(p_space) {
  const rows = p_space.contents.length;
  const cols = p_space.contents[0].length;
  const n_space = new Space(rows, cols);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const neighbors = get_neighbors(p_space, r, c);
      n_space.contents[r][c].state = get_new_state(p_space, [r, c], neighbors);
    }
  }

  return n_space;
}

function automata(space, generations) {
  //for a given space, execute an automata.
  console.log("generation 0");
  print_space(space);

  for (let g = 1; g <= generations; g++) {
    space = step(space);
    console.log("\ngeneration " + g);
    print_space(space);
  }
}

let r = 5;
let c = 5;

let space = new Space(r, c);

//seed: the middle cell is alive.
space.contents[Math.floor(r / 2)][Math.floor(c / 2)].state = 1;

automata(space, 10);
