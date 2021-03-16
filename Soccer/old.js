 //setup edge sprites
 createEdgeSprites();

 //create a user paddle sprite
 var userPaddle = createSprite(360,200,10,70);
 userPaddle.setAnimation("player"); 
 
 //create a computer paddle sprite
 var computerPaddle = createSprite(32,200,10,70);
 computerPaddle.setAnimation("robot");
 
 //create the pong ball
 var ball = createSprite(200,200,12,12);
 ball.setAnimation("soccerBall");
 
 var computerScore = 0;
 var playerScore = 0;
 var gameState = "serve";
 
 function draw() {
   //fill the computer screen with white color
   background("lightyellow");
   
   //display Scores
   text(computerScore,170,20);
   text(playerScore, 230,20);
   
   //draw dotted lines
   for (var i = 0; i < 400; i+=20) {
      line(200,i,200,i+10);
   }
   
   if (gameState === "serve") {
     text("Press Space to Serve",150,180);
   }
   
   if (gameState === "over") {
     text("Game Over!",170,160);
     text("Press 'R' to Restart",150,180);
   }
   
   if (keyDown("r")) {
     gameState = "serve";
     computerScore = 0;
     playerScore = 0;
     userPaddle.setAnimation("player");
   }
   
   
   //give velocity to the ball when the user presses play
   //assign random velocities later for fun
   if (keyDown("space") && gameState == "serve") {
     ball.velocityX = 5;
     ball.velocityY = 5;
     gameState = "play";
     userPaddle.setAnimation("player");
   }
   
   //make the userPaddle move with the mouse
   userPaddle.y = World.mouseY;
   
   //kick the ball
   if (keyWentDown("k")) {
     userPaddle.setAnimation("player_kick");
   }
     
   if (keyWentUp("k")) {
     userPaddle.setAnimation("player");
   }
   
   //make the ball bounce off the user paddle
   if(ball.isTouching(userPaddle)){
     playSound("hit.mp3");
     ball.x = ball.x - 5;
     ball.velocityX = -ball.velocityX;
   }
   
   //make the ball bounce off the computer paddle
   if(ball.isTouching(computerPaddle)){
     playSound("hit.mp3");
     ball.x = ball.x + 5;
     ball.velocityX = -ball.velocityX;
   }
   
   //place the ball back in the centre if it crosses the screen
   if(ball.x > 400 || ball.x < 0){
     playSound("score.mp3");
     
     if (ball.x < 0) {
       playerScore++;
     }
     else {
       computerScore++;
       userPaddle.setAnimation("player_dive");
     }
       
     ball.x = 200;
     ball.y = 200;
     ball.velocityX = 0;
     ball.velocityY = 0;
     gameState = "serve";
     
     if (computerScore=== 5 || playerScore === 5){
       gameState = "over";
     }
   }
   
   //make the ball bounce off the top and bottom walls
   if (ball.isTouching(topEdge) || ball.isTouching(bottomEdge)) {
     ball.bounceOff(topEdge);
     ball.bounceOff(bottomEdge);
     playSound("wall_hit.mp3"); 
   }
   
   //add AI to the computer paddle so that it always hits the ball
   computerPaddle.y = ball.y;
   drawSprites();
 }
 