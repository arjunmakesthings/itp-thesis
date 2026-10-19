#include <Servo.h>

Servo servo; 

int val = 0; 

const int pins[2][3] = {
  {2,3,5}, 
  {6,9,10}
};  

void setup() {
  servo.attach (pins[0][0]); 
}

void loop() {
  servo.write(0); 
  delay(500); 
  servo.write(90); 
  delay (500); 
}
