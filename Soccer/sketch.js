var userPaddle, computerPaddle, ball, edges
var computerScore = 0;
var playerScore = 0;
var gameState = "serve";


function preload(){
  scoreSound = loadSound("score.mp3");
  dieSound = loadSound("die.mp3");
  hitSound = loadSound("hit.mp3");
  //wall_hitSound = loadSound("wall_hit.mp3");

  player1=loadAnimation("player.jpg");   //stand
  player2=loadAnimation("player2.png");  //fall
  //player3=loadImage("player3.png"); //kick

  robot = loadImage("robot.png");
  ballimg = loadImage("ball.png")
}

function setup(){
  createCanvas(700, 700);

  userPaddle = createSprite(690, 200, 10, 70);
  userPaddle.addAnimation('p1',player1); 
  userPaddle.addAnimation('p2',player2); 
  //userPaddle.addAnimation('p3',player3); 

  userPaddle.scale = 0.15;

  computerPaddle = createSprite(10, 200, 10, 70);
  computerPaddle.addAnimation('r',robot); 
  computerPaddle.scale = 0.3;

  ball = createSprite(350,350,10,10);
  ball.addAnimation('b',ballimg); 
  ball.scale = 0.2;

  edges = createEdgeSprites(); 
  edges[0].shapeColor = 'red';
}

function draw() {
  //fill the computer screen with white color
  background("white");
  
  //display Scores
  textSize(20);
  fill('black');
  text(computerScore,300,20);
  text(playerScore, 400,20);
  
  //draw dotted lines
  for (var i = 0; i < 700; i+=20) {
     line(350,i,350,i+10);
  }
  
  if (gameState === "serve") {
    text("Press Space to Serve",270,300);
  }
  
  if (gameState === "over") {
    text("Game Over!",320,200);
    text("Press 'R' to Restart",300,300);
  }
  
  if (keyDown("r")) {
    gameState = "serve";
    computerScore = 0;
    playerScore = 0;
    userPaddle.changeAnimation('p1',player1); 
  }
  
  
  //give velocity to the ball when the user presses play
  //assign random velocities later for fun
  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = -2;
    gameState = "play";
    userPaddle.changeAnimation('p1',player1); 
  }
  
  //make the userPaddle move with the mouse
  userPaddle.y = World.mouseY;
  
  //kick the ball
  if (keyWentDown("k")) {
    //userPaddle.changeAnimation('p',player3); 
  }
    
  if (keyWentUp("k")) {
    userPaddle.changeAnimation('p1',player); 
  }
  
  //make the ball bounce off the user paddle
  if(ball.isTouching(userPaddle)){
    hitSound.play()
    ball.x = ball.x - 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //make the ball bounce off the computer paddle
  if(ball.isTouching(computerPaddle)){
    hitSound.play();
    ball.x = ball.x + 5;
    ball.velocityX = -ball.velocityX;
  }
  
  //place the ball back in the centre if it crosses the screen
  if(ball.x > 700 || ball.x < 0){
    
    if (ball.x < 0) {
      playerScore++;
      scoreSound.play();
      userPaddle.changeAnimation('p2',player2); 
    }
    else {
      computerScore++;
      dieSound.play();
    }
      
    ball.x = 350;
    ball.y = 350;
    ball.velocityX = 0;
    ball.velocityY = 0;
    gameState = "serve";
    
    if (computerScore=== 5 || playerScore === 5){
      gameState = "over";
    }
  }
  
  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[2]) || ball.isTouching(edges[3])) {
    ball.bounceOff(edges[2]); //top
    ball.bounceOff(edges[3]); //bottom
    scoreSound.play(); 
  }
  //console.log(edges)

  //add AI to the computer paddle so that it always hits the ball
  computerPaddle.y = ball.y;
  drawSprites();
}
