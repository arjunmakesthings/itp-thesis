#include <iostream>
#include <vector>
using namespace std; 

vector<int> seed = {0,1,0,1,0};
int i = 10; 

//helper: 
void print_array(vector<int>arr){
	for (int i :arr ){
		cout << i << " "; 
	}
	cout << "\n"; 
}

/*
vector<int> generate(vector<int>arr){
	return arr; 
}
*/

int main(){
	vector<vector <int>> all = {};

	all.push_back(seed); 

	for (int j = 0; j<i; j++){
	}

	//print_array(all[0]); 

	return 0; 
}
