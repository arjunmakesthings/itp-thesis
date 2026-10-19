#include <iostream>
#include <map>
using namespace std;

constexpr int r = 10;
constexpr int c = 10;

class cell
{
public:
  int state;
  cell(int s = 0) : state(s) {}
};

cell space[r][c];

// helper to render:
void render()
{
  // to render the space, we go through each item in the space.
  for (int x = 0; x < r; x++)
  {
    for (int y = 0; y < c; y++)
    {
      cout << space[x][y].state << " ";
    }
    // after a row:
    cout << "\n";
  }
}

int main()
{
  render();
  return 0;
}
