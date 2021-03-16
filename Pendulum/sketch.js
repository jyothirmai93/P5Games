let swingX = 0;
let swingY = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  swingX = sin(frameCount/50)*100;
  swingY = cos(frameCount/25)*10;
  
  line(200,100, 200 + swingX, 300 + swingY);
  ellipse(200 + swingX, 300 + swingY, 30,30);
}