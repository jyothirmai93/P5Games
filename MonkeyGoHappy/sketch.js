var END =0;
var PLAY =1;
var gameState = PLAY;
var backImage,backgr;
var monkey, monkey_running;
var ground,ground_Img;
var FoodGroup, bananaImage;
var obstacle,obstaclesGroup, obstacle_Img;
var gameOver;
var score=0;

function preload(){
  backImage=loadImage("jungle.jpg");
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  obstacle_Img = loadImage("stone.png"); 
  gameOverImg = loadImage("game_over_PNG58.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  //creating monkey
  monkey = createSprite(100,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  //creating ground
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() { 
  background(0);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 550,50);
  
  if(gameState===PLAY){
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  ground.velocityX=-(4 + 2*score/100); 
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
   backgr.velocityX=-(4 + 2*score/100);
  
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);
    spawnFood();
    spawnObstacles();  
 
    if(obstaclesGroup.isTouching(monkey)){ 
        gameState = END;
    }
  }else if(gameState === END){
    textSize(30);
    stroke("white")
    fill("black");
    text("Game Over!", 300,220);
    monkey.scale = 0.08;
    monkey.visible = false;
    
    backgr.velocityX = 0;
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    FoodGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityXEach( 0);
    obstaclesGroup.setLifetimeEach(-1);
  }
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    
    banana.velocityX=-(4 + 2*score/100); 
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX=-(4 + 2*score/100); 
    obstacle.addImage(obstacle_Img);
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}