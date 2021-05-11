var score = 0; 
var PLAY = 1, END = 0;
var gameState = PLAY;  
var backgroundImg,girl,girlImg,butterfly,butterflyImg,bee,beeImg;

function preload(){
backgroundImg = loadImage("images/garden.webp");
girlImg = loadImage("images/girl.png");
butterflyImg = loadImage("images/butterfly.png");
beeImg = loadImage("images/bee.png");
}

function setup(){
  canvas = createCanvas(1200,650);

  girl = createSprite(200,670,50,80);
  girl.addImage(girlImg);
  

  ground = createSprite(650, 670, 1300, 20);
  ground.visible = false;

  restart = createSprite(650,350,50,50);

  butterfliesGroup = new Group();
  beesGroup = new Group();
}

function draw(){
  background(backgroundImg);

  text("Score: "+ score, 1000, 50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  

    if(keyDown("space") && girl.y >= 159) {
      girl.velocityY = -12;
    }
  
    girl.velocityY = girl.velocityY + 0.8;
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    girl.collide(ground);

    if(beesGroup.isTouching(girl)){
      gameState = END;
  }

  restart.visible = false;

  spawnButterflies();
  spawnBees();
}

  else if (gameState === END) {
  
  ground.velocityX = 0;
  girl.velocityY = 0;
  beesGroup.setVelocityXEach(0);
 
  beesGroup.setLifetimeEach(-1);

  restart.visible = true;
  
  if(mousePressedOver(restart)) {
    reset();
  }
  }
  

  drawSprites();
  
}

function spawnButterflies(){
  if(frameCount % 60 === 0 ){
  butterfly = createSprite(1200,350,50,50);
  butterfly.addImage("butterfly",butterflyImg);
  butterfly.scale = +0.2;

  var x = Math.round(random(500,1300));
  var y = Math.round(random(400,550));

  butterfly.velocityX = -(6 + 3*score/100);
  
  butterfly.lifetime = 300;  
  butterfliesGroup.add(butterfly);
  }
}

function spawnBees(){
  if(frameCount % 60 === 0 ){
  bee = createSprite(1200,350,50,50);
  bee.addImage("bee",beeImg);
  bee.scale = +0.2;

  var x = Math.round(random(500,1300));
  var y = Math.round(random(400,550));

  bee.velocityX = -(6 + 3*score/100);
  
  bee.lifetime = 300;  
  beesGroup.add(bee);
  }
}

function reset(){
  gameState = PLAY;
  
  beesGroup.destroyEach();

  score = 0;
  
}