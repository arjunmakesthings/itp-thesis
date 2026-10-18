#include <Servo.h>

// 2-d automata hardware build: configuration test.
// layout (rows x cols), each number is the servo's output pin:
//   2,  3,  5
//   6,  9, 10

const int ROWS = 2;
const int COLS = 3;

const int pins[ROWS][COLS] = {
  {2, 3, 5},
  {6, 9, 10}
};

const int ANGLE_OFF = 0;
const int ANGLE_ON = 90;
const int STEP_MS = 3;           // delay per degree: 90 degrees takes ~0.45 s
const int STAGGER_MS = 300;      // pause between servos at startup
const int PAUSE_MS = 1000;       // pause between phases of the loop

Servo servos[ROWS][COLS];
int angles[ROWS][COLS];

// helper: sweep a cell's servo to a target angle, 1 degree at a time
void move_cell(int r, int c, int target) {
  int a = angles[r][c];
  int dir = (target > a) ? 1 : -1;

  while (a != target) {
    a += dir;
    servos[r][c].write(a);
    delay(STEP_MS);
  }
  angles[r][c] = target;
}

// helper: run one pass over the grid, top left -> bottom right
void sweep_all(int target) {
  for (int r = 0; r < ROWS; r++) {
    for (int c = 0; c < COLS; c++) {
      Serial.print("cell (");
      Serial.print(r);
      Serial.print(", ");
      Serial.print(c);
      Serial.print(") -> pin ");
      Serial.print(pins[r][c]);
      Serial.print(", ");
      Serial.print(target);
      Serial.println(" deg");

      move_cell(r, c, target);
    }
  }
}

void setup() {
  Serial.begin(9600);

  // zero the servos one at a time to avoid a single big current spike
  for (int r = 0; r < ROWS; r++) {
    for (int c = 0; c < COLS; c++) {
      angles[r][c] = ANGLE_OFF;
      servos[r][c].write(ANGLE_OFF);
      servos[r][c].attach(pins[r][c]);
      delay(STAGGER_MS);
    }
  }
  delay(PAUSE_MS);
}

void loop() {
  sweep_all(ANGLE_ON);
  delay(PAUSE_MS);

  sweep_all(ANGLE_OFF);
  delay(PAUSE_MS);
}
