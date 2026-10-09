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
      //row.push(new Cell());
      row.push(
        new Cell(
          i === Math.floor(_c / 2) && j === Math.floor(_r / 2) ? 255 : 0,
        ),
      );
    }
    _sp.push(row);
  }
  return _sp;
}

//given an index in a representation of a space, return the indices of its neighbors.
function get_neighbors(_s, _r, _c) {
  const rows = _s.length;
  const cols = _s[0].length;
  //const at = (i, j) =>
  //  i >= 0 && i < rows && j >= 0 && j < cols ? [i, j] : null;

  //wrapping:
  const at = (i, j) => [((i % rows) + rows) % rows, ((j % cols) + cols) % cols];

  return [
    //up_left: at(_r - 1, _c - 1),
    at(_r - 1, _c), //up.
    //up_right: at(_r - 1, _c + 1),
    at(_r, _c - 1), //left.
    at(_r, _c + 1), //right.
    //down_left: at(_r + 1, _c - 1),
    at(_r + 1, _c), //down.
    //down_right: at(_r + 1, _c + 1),
  ];

  //return {
  //  //up_left: at(_r - 1, _c - 1),
  //  up: at(_r - 1, _c),
  //  //up_right: at(_r - 1, _c + 1),
  //  left: at(_r, _c - 1),
  //  right: at(_r, _c + 1),
  //  //down_left: at(_r + 1, _c - 1),
  //  down: at(_r + 1, _c),
  //  //down_right: at(_r + 1, _c + 1),
  //};
}

//given a space & a cell, evaluate all neighbor states & return a new state for the cell.
function get_new_state(_p_sp, _idx) {
  let columns = _p_sp[0].length;

  let c_r = Math.floor(_idx / columns);
  let c_c = _idx % columns;
  let cell = _p_sp[c_r][c_c];

  let neighbors = get_neighbors(_p_sp, c_r, c_c);

  const displacement = 10;

  for (let i = 0; i < neighbors.length; i++) {
    //for each neighbor, if we have more than the neighbor, give displacement the neighbor. else don't do anything.

    let neighbor = _p_sp[neighbors[i][0]][neighbors[i][1]];

    if (cell.state > neighbor.state) {
      space[neighbors[i][0]][neighbors[i][1]].state += 1;
      return cell.state - 1;
    } else {
      return cell.state;
    }
  }
  //console.log(`neighbors of: ${_idx}:`);
  //console.log(neighbors);
  //console.log(alive_count, dead_count);

  return 0;
}

//given a space, render it.
function render(_sp) {
  for (let i = 0; i < _sp.length; i++) {
    let line = "";
    for (let j = 0; j < _sp[0].length; j++) {
      line += _sp[i][j].state + " ";
    }
    console.log(line);
  }
  console.log("");
}

//given a space of cells, execute an automaton till the program is stopped.
function automaton(_sp) {
  let p_sp = _sp;

  let rows = p_sp.length;
  let columns = p_sp[0].length;

  let n_sp = make_space(columns, rows);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      let cell_idx = i * columns + j;
      n_sp[i][j].state = get_new_state(p_sp, cell_idx);
    }
  }

  //show new space n_sp.
  //render(n_sp);

  space = n_sp;
}

let r = 4;
let c = 4;

//given dimensions [r, c], make a space.
let space = make_space(r, c);

console.log(space);

let n = 10;
let counter = 0;

//given a max n, execute the automaton.
while (counter <= n) {
  console.log("generation: " + counter);
  automaton(space);

  //given a space, render it.
  render(space);
  counter++;
}
