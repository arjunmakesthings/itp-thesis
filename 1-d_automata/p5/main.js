/*
to visualize 1-d automata.

which is computed in ../ js.js.
*/

let cells = [];

function setup() {
	// createCanvas(1000, 562); //in 16:9 aspect ratio.
	createCanvas(800, 800); //square.

	make_grid();
	frameRate(1);
}

function make_grid() {
	let col_len = seed.length;
	let row_len = i + 1;

	let w = floor(width / col_len);
	let h = floor(height / row_len);

	stroke(0);
	fill(255);

	let y = 0;

	while (y < height) {
		let row = [];

		for (let x = 0; x < width; x += w) {
			row.push(new Cell(x, y, w, h));
		}

		cells.push(row);
		y += h;
	}
}

let instr = -1;

let computed = run();

function draw() {
	instr++;

	if (instr >= computed.length) {
		instr = -1;
		background(255);
	} else if (instr > -1){
		for (let j = 0; j < computed[instr].length; j++) {
			cells[instr][j].display(computed[instr][j]);
		}
	}
}

class Cell {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	display(c) {
		stroke(0);
		strokeWeight(1);
		fill(c == 1 ? 255 : 0);
		rect(this.x, this.y, this.w, this.h);
	}
}
