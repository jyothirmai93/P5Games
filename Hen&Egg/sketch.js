var gameState = "start"

//score and lifes
var score=0;
var life=3;
var egg,ground,hen,basket;
var backShelf,bottomShelf,edges;

function preload(){
  eggImg = loadImage("egg.png");
  basketImg = loadImage("basket.png");
  henImg = loadImage("hen.png");
  touchSound= loadSound("touch.mp3");
}

function setup(){
  canvas=createCanvas(700,500);
  
  egg=createSprite(200,10);
  egg.addImage(eggImg);
  egg.scale=0.5;
  
  ground =createSprite(200,490,1000,20);
  ground.shapeColor="green";
  
  backShelf =createSprite(200,75,1000,150);
  backShelf.shapeColor="maroon";
  
  bottomShelf=createSprite(200,140,1000,20);
  bottomShelf.shapeColor="brown";
  
  for (var x = 60; x < 670; x=x+70){
    hen=createSprite(x,100,100,100);
    hen.addImage(henImg);
  }
  basket = createSprite(200, 465);
  basket.addImage(basketImg);
  
}


function draw() { 
  background("black");
  edges = createEdgeSprites();

  if(keyDown("space")&&gameState==="start"){
     egg.velocityY=5;
     gameState="play";
    }
    if(keyDown("RIGHT_ARROW")){
      basket.velocityX=6;
    }
  if(keyDown("LEFT_ARROW")){
    basket.velocityX=-6;
  }
  
  basket.bounceOff(edges[0]);
  basket.bounceOff(edges[1]); 
  
  stroke("black");
  textSize(22);
  fill("white");
  text("Score: " +score,10,200);
  if (egg.isTouching(basket)){
   touchSound.play();
   egg.y=10;
   score = score + 10;
   gameState="serve";
  }
  
  fill("red");
  text("Life: " +life,600,200); 
  if (egg.isTouching(ground)){
    egg.y=10;
    life=life-1;
    gameState="serve";
  }


 if (egg.isTouching(bottomShelf)){
   gameState="play";
 }
if(gameState==="serve"){
  egg.x=random(50,670);
}
  
 if (life===0){
   background("lightyellow");
   fill("red");
   textSize(50);
   text("GAME OVER",200,300);
   gameState="over";
   egg.velocityY=0;
 }
  
 if (score>100){
       egg.velocityY=7;
 }
  if (score>200){
        egg.velocityY=9;
  }
  
  if(gameState==="start"){
    textSize(20);
    fill("white");
    text("Use LEFT & RIGHT arrow key to move basket left and right",100,250);
    text("to move the basket left and right.Press space to continue",110,280);
  }
  
  if(gameState === "over"){
     egg.velocityY=0;
     basket.velocityX=0;
     basket.velocityY=0;
     fill("black");
     textSize(20);
     text("Press R to restart game",250,350);
  }
  
  if(keyDown("r")){
    gameState="start";
    reset();
}
  drawSprites();
}

function reset(){
 gameState = "start";
 score=0;
 life=3;
}
