//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var sword, fruit, monster, r, randomFruit;
var swordImage, fruit1, fruit2, fruit3, fruit4, monsterImage, gameOverImage;
var fruitGroup, enemyGroup;
var score;

function preload() {

  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png", "alien2.png")
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png")
  gameOverSound = loadSound("gameover.mp3")
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3")
}



function setup() {
  createCanvas(600, 600);

  //creating sword
  sword = createSprite(40, 200, 20, 20);
  sword.addImage(swordImage);
  sword.scale = 0.7


  //set collider for sword
  //sword.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score = 0;
  fruitGroup = new Group();
  enemyGroup = createGroup();

}

function draw() {
  background("lightblue");

  if (gameState === PLAY) {

    //Call fruits and Enemy function
    fruits();
    Enemy();

    // Move sword with mouse
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    // Increase score if sword touching fruit
    if (fruitGroup.isTouching(sword)) {
      fruitGroup.destroyEach();
      knifeSwooshSound.play();
      score = score + 2;
    }
    // Go to end state if sword touching enemy
    if (enemyGroup.isTouching(sword)) {
      gameState = END;
      gameOverSound.play();
    }
  } 
  else if (gameState === END) {
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
      enemyGroup.setVelocityXEach(0);

      // Change the animation of sword to gameover and reset its position
      sword.addImage(gameOverImage);
      sword.x = 200;
      sword.y = 200;
  }

drawSprites();

//Display score
text("Score : " + score, 300, 30);
}


function Enemy() {
  if (World.frameCount % 200 === 0) {
    monster = createSprite(400, 200, 20, 20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100, 300));
    monster.velocityX=-(8+(score/10));
    monster.setLifetime = 50;

    enemyGroup.add(monster);
  }
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }

    fruit.y = Math.round(random(50, 340));
    fruit.setLifetime = 100;
    
    p = Math.round(random(1,2))
    if(p == 1)
    {
      fruit.x=400;
      fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(p == 2){
      fruit.x=0;
      fruit.velocityX= (7+(score/4));
      }
    }

    fruitGroup.add(fruit);
  }
}