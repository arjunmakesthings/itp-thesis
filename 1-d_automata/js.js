//1-d automata; arjun; august, 2026.

//definition: given a starting condition, as a list of numbers [n], we compute subsequent generations i times for [n]*i.

let seed = [0, 1, 1, 0, 0];
let i = 10;

//impl note: javascript keys have to be declared as a string. 
//definition: if neighbours were 0, produce 1; if neighbours were 1, produce 0.
const rules = {
	"000": 1,
	"100": 0,
	"110": 0,
	"101": 0,
	"010": 1,
	"011": 0,
	"111": 0,
	"001": 0,

	//left boundary: 
	"b00": 1,
	"b10": 0,
	"b11": 0, 
	"b01": 0,

	//right boundary: 
	"00b": 0, 
	"10b": 0, 
	"11b": 0, 
	"01b": 0, 
};

function generate(s) {
	//given a sequence s, return new sequence s_n.
	let s_n = [];

	for (let i = 0; i < s.length; i++) {
		const c = s[i]; 
		const left = i > 0 ? s[i - 1] : "b";
		const right = i < s.length - 1 ? s[i + 1] : "b";

		const seq = `${left}${c}${right}`;

		s_n.push(rules[seq]); 
	}
	return s_n;
}

function run() {
	let all = [];
	all.push(seed);

	for (let n = 0; n < i; n++) {
		all.push(generate(all[n]));
	}
	console.log(all.join("\n")); 

	return all; 
}

run();
