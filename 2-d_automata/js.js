//2d automata; october 8th, 2026.

//a space is a set of all cells.

class Space {
  constructor(r, c) {
    this.contents = [];

    for (let j = 0; j < c; j++) {
      let row = [];
      for (let i = 0; i < r; i++) {
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

let r = 3;
let c = 2;

let space = new Space(r, c);

automata(space);

//given an index in a representation of a space, return the indices of its neighbors.
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
  let c_state = p_space.contents[cell[0]][cell[1]].state;
  let n = neighbors;

  let alive_neighbors = 0;

  n = Object.values(neighbors);

  //console.log(n);

  for (let i = 0; i < n.length; i++) {
    if (n[i] !== null) {
      if (p_space.contents[n[i][0]][n[i][0]].state == 1) {
        //if all neighbors are 1:
        c_state = 0;
      }
      //console.log(p_space.contents[n[i][0]][n[i][0]].state);
    }
  }


}

function automata(space) {
  //for a given space, execute an automata.

  let p_space = space;
  space = []; 

  //in each row:
  for (let r = 0; r < p_space.contents.length; r++) {
    //console.log("row: " + r);
    //for each cell:
    for (let n = 0; n < p_space.contents[r].length; n++) {
      //console.log("cell: " + p_space.contents[r][n].state);
      //find its neighbors:
      let neighbors = get_neighbors(p_space, r, n);

      //compute new state:
      get_new_state(p_space, [r, n], neighbors);
    }
  }
}
