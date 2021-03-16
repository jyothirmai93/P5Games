class Bubble {
  
  constructor() { 
    var allInstances = [];
    
    var radius = random(10,100);
    this.x = random(0, width);
    this.y = random(0, height);
    this.width = radius;
    this.height = radius;
    this.color = "white";
    this.velocityX = random(-5, +5);
    this.velocityY= random(-5, +5);      
  }
  display(){
      stroke(255);
      fill(this.color);
      ellipse(this.x, this.y, this.width, this.height);
    }
    
    move(){
      this.x = this.x + this.velocityX;
      this.y = this.y + this.velocityY;
    }
}