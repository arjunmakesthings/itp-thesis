#include <array>
#include <cmath>
#include <iostream>
using namespace std;

constexpr int r = 10;
constexpr int c = 10;
constexpr int max_run = 2;

class cell {
 public:
  int state;
  cell(int s = 0) : state(s) {}
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
      cout << space[x][y].state << " ";
    }
    // after a row:
    cout << "\n";
  }
}

// given # of rows & columns, make a space.
void make_space() {
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      // int val = (x + y) % 2;
      int val = (x == floor(r / 2) && y == floor(c / 2)) ? 255 : 0;
      space[x][y].state = val;
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
      pos{up, left},     // up-left.
      pos{up, y},        // up.
      pos{up, right},    // up-right.
      pos{x, left},      // left.
      pos{x, right},     // right.
      pos{down, left},   // down-left.
      pos{down, y},      // down.
      pos{down, right},  // down-right.
  };
}

void update_space() {
  int diff[r][c] = {};
  const int displacement = 2;

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
          int give = min({displacement, has, self.state - neighbor.state});
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

// automaton function:
int main() {
  int counter = 0;

  // make space; show it once:
  make_space();

  cout << "generation: " << counter << "\n";
  render();
  cout << "\n";
  while (counter < max_run) {
    update_space();
    counter++;

    cout << "generation: " << counter << "\n";
    render();
    cout << "\n";
  }

  return 0;
}
