/*
advanced 2-d automata; october 17th, 2026.

given a set of cells & their initial state, form a temporary change set & then update the cells. 
*/

//definitions:
//a cell is an object with properties. currently: state.
class Cell {
  constructor(s) {
    this.state = s;
  }
}

//given the number of rows & columns, make a collection of cells.
function make_space(_r, _c) {
  let _sp = [];
  for (let i = 0; i < _r; i++) {
    const row = [];
    for (let j = 0; j < _c; j++) {
      let r = Math.random();

      if (r < 0.5) {
        row.push(new Cell(1000));
      } else {
        row.push(new Cell(0));
      }

      //row.push(
      //  new Cell(
      //    i === Math.floor(_r / 2) && j === Math.floor(_c / 2) ? 5000 : 0,
      //  ),
      //);
    }
    _sp.push(row);
  }
  return _sp;
}

//for everything below, we assume the space is global.

//given a space & position of cell in space, return all its neighbors:
function get_neighbors(_r, _c) {
  //wrapping:
  const at = (i, j) => [((i % r) + r) % r, ((j % c) + c) % c];

  return [
    at(_r - 1, _c - 1), //up-left.
    at(_r - 1, _c), //up.
    at(_r - 1, _c + 1), //up_right.
    at(_r, _c - 1), //left.
    at(_r, _c + 1), //right.
    at(_r + 1, _c - 1), //down_left:
    at(_r + 1, _c), //down.
    at(_r + 1, _c + 1), //down_right:
  ];
}

//render the global space.
function render() {
  for (let i = 0; i < space.length; i++) {
    let line = "";
    for (let j = 0; j < space[0].length; j++) {
      line += space[i][j].state + " ";
    }
    console.log(line);
  }
  console.log("");
}

//given a space, return a matrix of the same shape filled with zeroes.
function make_diff(_sp) {
  return _sp.map((row) => row.map(() => 0));
}

function automaton() {
  let diff_matrix = make_diff(space);

  const displacement = 2;

  //for every cell in the matrix, look at its neighbors & get the change:
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      let cell = space[i][j];
      let neighbors = get_neighbors(i, j);

      //a cell can't give away more than it has:
      let has = cell.state;

      for (let n = 0; n < neighbors.length; n++) {
        //can't give more:
        if (has <= 0) break;

        //for each neighbor, if we have more than the neighbor, give to the neighbor at displacement-rate. else don't do anything.
        let neighbor = space[neighbors[n][0]][neighbors[n][1]];

        if (cell.state > neighbor.state) {
          const give = Math.min(displacement, has, cell.state - neighbor.state);
          diff_matrix[i][j] -= give;
          diff_matrix[neighbors[n][0]][neighbors[n][1]] += give;
          has -= give;
        }
      }
    }
  }

  //once all of that is done, we update the space.
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      space[i][j].state += diff_matrix[i][j];
    }
  }
}

//setup:
const r = 100;
const c = 100;

let space = make_space(r, c);

if (typeof window === "undefined") {
  //show the starting state.
  render();

  //main loop:
  let n = 10;
  let counter = 0;

  while (counter <= n) {
    automaton();
    render();
    counter++;
  }
}
