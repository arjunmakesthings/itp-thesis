/*
2-d automata; advanced; with the option of being on a finite or infinite plane.
*/

#include <algorithm>
#include <array>
#include <cmath>
#include <iostream>
using namespace std;

constexpr int r = 3;
constexpr int c = 3;
constexpr int max_run = 2;

// neighbors stuff:
constexpr int neighborhood = 8;
constexpr bool infinite_plane = false;

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

// given # of rows & columns, make a space. this function also defines the seed.
void make_space() {
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      int val = 1;
      // int val = (x == floor(r / 2) && y == floor(c / 2)) ? 255 : 0;
      space[x][y].state = val;
    }
  }
}

// neighbors; wrapping on an infinite plane, not wrapping on a finite one:
array<pos, neighborhood> get_neighbors(int x, int y) {
  int up = 0;
  int down = 0;
  int left = 0;
  int right = 0;

  if (infinite_plane == true) {
    // infinite plane:
    up = (x - 1 + r) % r;
    down = (x + 1) % r;
    left = (y - 1 + c) % c;
    right = (y + 1) % c;
  } else {
    // finite plane:
    up = x - 1;
    down = x + 1;
    left = y - 1;
    right = y + 1;
  }

  if (neighborhood == 4) {
    // return von-neumann neighborhood.
    return {
        pos{up, y},     // up.
        pos{x, left},   // left.
        pos{x, right},  // right.
        pos{down, y},   // down.
    };
  } else {
    // return moore neighborhood.
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
}

// mutate the global space.
void update_space() {
  int diff[r][c] = {};  // temporary difference-matrix; starts at zero.

  const int displacement = 1;  // rate at which things are disseminated.
  const int capacity = 0;      // a cell can store a certain amount of energy.

  // go over each cell:
  for (int x = 0; x < r; x++) {
    for (int y = 0; y < c; y++) {
      cell& self = space[x][y];

      cout << "cell(" << x << ", " << y << ")" << "\n";

      int has = self.state;

      if (has > capacity) {
        // we have stuff to give:

        // for each neighbor, go over them & decide displacement in diff_matrix.
        array<pos, neighborhood> neighbors = get_neighbors(x, y);

        for (int n = 0; n < neighborhood; n++) {
          pos n_p = neighbors[n];

          cout << "neighbor being checked: " << n_p.x << ", " << n_p.y;

          // finite plane logic: skip neighbors off the edge.
          if (!infinite_plane &&
              (n_p.x < 0 || n_p.x >= r || n_p.y < 0 || n_p.y >= c)) {
            cout << " -> " << "out of bounds" << "\n";
            continue;
          }

          // in bounds:
          cell& neighbor = space[n_p.x][n_p.y];

          cout << " -> " << "valid neighbor: " << n_p.x << ", " << n_p.y
               << "\n";

          // cout << "neighbor(" << x << ", " << y << ")";

          if (self.state > neighbor.state) {
            // i have stuff to give:
            // arduino has its own two-value min; hence the nesting.
            int give = min(displacement, min(has, self.state - neighbor.state));
            diff[x][y] -= give;
            diff[n_p.x][n_p.y] += give;
            has -= give;
          }
        }
      }
    }
  }

  // apply the change, and mutate the space:
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

  // for debug; single run:
  //update_space();

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