//2-d cellular automata; october 08th, 2026.

//definitions:
//a cell is an object with properties. currently: state.
class Cell {
  constructor(s) {
    this.state = s;
  }
}

//a space is a collection of cells.
function make_space(_r, _c) {
  let _sp = [];
  for (let i = 0; i < _c; i++) {
    const row = [];
    for (let j = 0; j < _r; j++) {
      row.push(new Cell(0));
    }
    _sp.push(row);
  }
  return _sp;
}

//given an index in a representation of a space, return the indices of its neighbors.
function get_neighbors(_s, _r, _c) {
  const rows = _s.length;
  const cols = _s[0].length;
  const at = (i, j) =>
    i >= 0 && i < rows && j >= 0 && j < cols ? [i, j] : null;

  //wrapping:
  //  const at = (i, j) => [((i % rows) + rows) % rows, ((j % cols) + cols) % cols];

  return {
    //up_left: at(_r - 1, _c - 1),
    up: at(_r - 1, _c),
    //up_right: at(_r - 1, _c + 1),
    left: at(_r, _c - 1),
    right: at(_r, _c + 1),
    //down_left: at(_r + 1, _c - 1),
    down: at(_r + 1, _c),
    //down_right: at(_r + 1, _c + 1),
  };
}

//given a space & a cell, evaluate all neighbor states & return a new state for the cell.
function get_new_state(_p_sp, _idx) {
  let columns = _p_sp[0].length;

  let c_r = Math.floor(_idx / columns);
  let c_c = _idx % columns;
  let cell = _p_sp[c_r][c_c];

  let neighbors = get_neighbors(_p_sp, c_r, c_c);

  console.log(neighbors);
}

//given a space of cells, execute an automaton for n times;
function automaton(_sp, _n) {
  let p_sp = _sp;
  let n_sp = _sp;

  //mutate sp.
  //go over the whole previous space:
  let rows = p_sp.length;
  let columns = p_sp[0].length;

  for (let i = 0; i < rows; i++) {
    const new_row = [];
    for (let j = 0; j < columns; j++) {
      let cell_idx = i * columns + j;
      console.log("cell: " + cell_idx);

      n_sp[i][j].state = get_new_state(p_sp, cell_idx);
    }
  }

  //show new space n_sp.
}

let r = 2;
let c = 2;

//given dimensions [r, c], make a space.
let space = make_space(r, c);

let n = 10;

automaton(space, n);
