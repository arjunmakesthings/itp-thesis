//2d automata; visualized in p5; october 08th 2026.

//source automata lives in ../advanced.js.

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(10);
}

//execute until program is stopped:
function draw() {
  automaton();

  const ht = height / r;
  const wt = width / c;

  noStroke();

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      fill(space[i][j].state);
      rect(j * wt, i * ht, wt, ht); //x follows column, y follows row.
    }
  }
}
