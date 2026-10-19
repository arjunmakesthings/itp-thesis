#include <array>
#include <cmath>
#include <iostream>
#include <Servo.h>
using namespace std;

constexpr int r = 2;
constexpr int c = 3;
constexpr int max_run = 20;

Servo servo;
const int pins[2][3] = {
  { 2, 3, 5 },
  { 6, 9, 10 }
};

class cell {
public:
  int state;
  cell(int s = 0)
    : state(s) {}
};

struct pos {
  int x;
  int y;
};

cell space[r][c];

// change matrix; we only store integer values.

// helper to render:
void render() {
  // to render the space, we go through each item in the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      servo.attach(pins[x][y]);
      // int val = map(space[x][y].state, 0, 255, 0, 180);
      servo.write(space[x][y].state);
      delay(250);
    }
    // after a row:
  }
}

// given # of rows & columns, make a space.
void make_space() {
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      // int checker = (x + y) % 2;
      // int val = (x == floor(r / 2) && y == floor(c / 2)) ? 255 : 0;
      space[x][y].state = (x == 0 && y == 0) ? 180 : 0;
    }
  }
}

// for updation:
array<pos, 8> get_neighbors(int x, int y) {
  int up = (x - 1 + r) % r;
  int down = (x + 1) % r;
  int left = (y - 1 + c) % c;
  int right = (y + 1) % c;

  return {
    pos{ up, left },     // up-left.
    pos{ up, y },        // up.
    pos{ up, right },    // up-right.
    pos{ x, left },      // left.
    pos{ x, right },     // right.
    pos{ down, left },   // down-left.
    pos{ down, y },      // down.
    pos{ down, right },  // down-right.
  };
}

void update_space() {
  int diff[r][c] = {};
  const int displacement = 5;

  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cell& self = space[x][y];
      array<pos, 8> neighbors = get_neighbors(x, y);

      int has = self.state;

      for (int n = 0; n < 8; n++) {
        if (has <= 0) break;

        pos n_p = neighbors[n];
        cell& neighbor = space[n_p.x][n_p.y];

        if (self.state > neighbor.state) {
          int give = min(displacement, min(has, self.state - neighbor.state));
          diff[x][y] -= give;
          diff[n_p.x][n_p.y] += give;
          has -= give;
        }
      }
    }
  }

  // apply the change set to the space.
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      space[x][y].state += diff[x][y];
    }
  }
}

void setup() {
  Serial.begin(9600);
  make_space();
  delay (100); 
  render();
}

void loop() {
  update_space();
  delay(100); 
  render();
}
