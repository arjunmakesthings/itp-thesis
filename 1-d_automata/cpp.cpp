#include <iostream>
#include <vector>
#include <map>
using namespace std; 

vector<int> seed = {0,1,0,1,0};
int i = 10; 

map<vector<int>, int> rules = {
    {{0, 0, 0}, 1},
    {{1, 0, 0}, 0},
    {{1, 1, 0}, 0},
    {{1, 0, 1}, 1},
    {{0, 1, 0}, 1},
    {{0, 1, 1}, 0},
    {{1, 1, 1}, 1},
    {{0, 0, 1}, 0},

    //left boundary:
    {{3, 0, 0}, 1},
    {{3, 1, 0}, 1},
    {{3, 1, 1}, 0},
    {{3, 0, 1}, 0},

    //right boundary:
    {{0, 0, 3}, 1},
    {{1, 0, 3}, 0},
    {{1, 1, 3}, 0},
    {{0, 1, 3}, 1}
};

//helper: 
void print_array(vector<int>arr){
	for (int i :arr ){
		cout << i << " "; 
	}
	cout << "\n"; 
}

vector<int> generate(vector<int>s){
	//given a sequence s, return a new sequence s_n. 
	vector <int> s_n = {};

	for (int j = 0; j<s.size(); j++){
		const int c = s[j];
		const int left = (j > 0) ? s[j-1] : 3;
		const int right = (j < s.size() - 1) ? s[j + 1] : 3; 	

		s_n.push_back(rules[{left, c, right}]); 
	}

	return s_n; 
}

int main(){
	vector<vector <int>> all = {};

	all.push_back(seed); 

	for (int j = 0; j<i-1; j++){
		 all.push_back(generate(all[j]));  
	}

	//print outputs:
	for (int j = 0; j<all.size(); j++){
		cout << "iteration " << j + 1 << ": "; 
		print_array(all[j]); 	
	}	

	return 0; 
}
