//2d automata; visualized in p5; october 08th 2026.

//source automata lives in ./js.js.

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(10);
}

//execute until program is stopped:
function draw() {
  background(255);

  automaton(space);

  const rows = space.length;
  const cols = space.length;
  const ht = height / rows;
  const wt = width / cols;

  stroke(200);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      fill(space[i][j].state > 0 ? 0 : 255);
      rect(j * wt, i * ht, wt, ht); //x follows column, y follows row.
    }
  }
}
