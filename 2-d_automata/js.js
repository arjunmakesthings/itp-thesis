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

let r = 5;
let c = 10;

let space = new Space(r, c); 

automata(space); 

function automata(space){
  //for a given space, execute an automata.

  //in each row:
  for (let r = 0; r < space.contents.length; r++){
    //for each cell:
    console.log("row: " + r); 
    for (let j = 0; j<space.contents[r].length; j++){
      //find its neighbors:
      let neighbors = []; 
      console.log("cell: " + space.contents[r][j].state); 
    }
  }
}
