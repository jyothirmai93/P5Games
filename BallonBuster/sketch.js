var playground, playgroundAn;
var red, redAn, green, greenAn, blue, blueAn, pink, pinkAn;
var bow, bowAn, arrow, arrowAn;
var score;

function preload() {
  //Preloading animations
  playgroundAn = loadAnimation("background0.png");

  redAn = loadAnimation("red_balloon0.png");
  greenAn = loadAnimation("green_balloon0.png");
  blueAn = loadAnimation("blue_balloon0.png");
  pinkAn = loadAnimation("pink_balloon0.png");

  bowAn = loadAnimation("bow0.png");
  arrowAn = loadAnimation("arrow0.png");

}

function setup() {
  createCanvas(500, 500);
  background("black");
  score = 0;
  //Creating background
  playground = createSprite();
  playground.addAnimation("move", playgroundAn);
  playground.scale = 3;

  // creating bow to shoot arrow
  bow = createSprite(450, 250, 20, 50);
  bow.addAnimation('shoot', bowAn);
  
   
  rg = new Group();
  bg = new Group();
  pg = new Group();
  gg = new Group();
  ag = new Group();

}

function draw() {

  // moving ground
  playground.velocityX = -3
  if (playground.x < 0) {
    playground.x = playground.width / 2;
  }

  //moving bow
  bow.y = World.mouseY
  //space-creates arrow
  if (keyDown("space")) {
    createArrow();
  }
  
  //create balloon randomly
  var select_balloon = Math.round(random(1,4 ));
  
  if (frameCount%80 === 0) {
    if (select_balloon == 1) {
      redF();
    } else if (select_balloon == 2) {
      greenF();
    } else if (select_balloon == 3) {
      blueF();
    } else {
      pinkF();
    }
  }
  
 if(ag.isTouching(pg)){
    pg.destroyEach();
    ag.destroyEach();
    score = score+1;
  }
  
  if(ag.isTouching(rg)){
    rg.destroyEach();
    ag.destroyEach();
    score = score+1;
  }
  
  if(ag.isTouching(bg)){
    bg.destroyEach();
    ag.destroyEach();
    score = score+1;
  }
  
  if(ag.isTouching(gg)){
    gg.destroyEach();
    ag.destroyEach();
    score = score+1;
  }
     
  drawSprites();
  text("Score: "+ score, 400,50);

}

function createArrow() {
  arrow = createSprite(450, 300);
  arrow.addAnimation("shoot", arrowAn);
  arrow.scale = 0.25;
  arrow.velocityX = -5;
  arrow.y = bow.y;
  arrow.lifetime = 200;
  ag.add(arrow); 

}


function redF() {
  var r = createSprite(0,Math.round(random(20, 370)), 10, 10);
  r.addAnimation('fly',redAn);
  r.velocityX = 3;
  r.lifetime = 200;
  r.scale = 0.1
  rg.add(r); 

}

function blueF() {
  var b = createSprite(0,Math.round(random(20, 370)), 10, 10);
  b.addAnimation('fly',blueAn);
  b.velocityX = 3;
  b.lifetime = 200;
  b.scale = 0.1;
  bg.add(b); 
}

function greenF() {
  var g = createSprite(0,Math.round(random(20, 370)), 10, 10);
  g.addAnimation('fly',greenAn);
  g.velocityX = 3;
  g.lifetime = 200;
  g.scale = 0.1
  gg.add(g); 
}

function pinkF() {
  var p = createSprite(0,Math.round(random(20, 370)), 10, 10);
  p.addAnimation('fly',pinkAn);
  p.velocityX = 3;
  p.lifetime = 200;
  p.scale = 1.2;
  pg.add(p); 

}
