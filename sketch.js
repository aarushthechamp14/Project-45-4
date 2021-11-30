var player,playerImg;
var coin ,coinImage, obstacle, obstacleImage;
var scoresGroup, obstacleGroup;
var ground,backgroundImg,background1;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameOver,gameOverImg;

function preload(){

 
  coinImage = loadImage("coin.png");
  obstacleImage = loadImage("obstacle.png");
  playerImg = loadAnimation("run_kid-1.png,run_kid-2.png,run_kid-3.png,run_kid-4.png,run_kid-5.png,run_kid-6.png,run_kid-7.png,run_kid-8.png,run_kid-9.png,run_kid-10.png,run_kid-11.png,run_kid-12.png")
  backgroundImg = loadImage("background1.png")
  gameOverImg = loadImage("gameOver.jpg")
  
 
}



function setup() {

  background1 = createSprite(670,180);
  background1.addImage(backgroundImg)
  background1.scale = 1
  
  player = createSprite(100,300);
  player.addAnimation(playerImg);
  player.scale = 0.2;
  //player.setCollider('rectangle',0,0,200,200)
  //player.debug=flase

 
  
  ground = createSprite(1000,360,1400,20);
  ground.velocityX = -6;
  ground.visible = false;

 

 
  
 
  scoresGroup = createGroup();
  obstacleGroup = createGroup();

  gameOver = createSprite(670,290);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;

  
  
  
  
}


function draw() {
  createCanvas(1340,580);
 


  
  
  player.collide(ground);


  

  if (gameState===PLAY){
    if(player.isTouching(scoresGroup)){
      score = score + 1 ;
      }

      if(keyDown("space") && player.y >= 270){
        player.velocityY = -20;
      }
      
      player.velocityY = player.velocityY + 1;

      if(player.isTouching(scoresGroup)){
        scoresGroup.destroyEach();
      }

     
      
    

      scores();
      obstacles();

      if(player.isTouching(obstacleGroup)){
        gameState = END;
        
      }
      
  }else if(gameState === END){
   
    

    ground.velocityX = 0;
    //scoresGroup.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    scoresGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    scoresGroup.setLifetimeEach(-1);

    gameOver.visible = true;

  }
  
  if(ground.width/2){
    ground.x = 650;
  }
  
 
  drawSprites();
   
  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score,160,50)
}

function scores(){
 if(frameCount % 200 === 0){
   coin = createSprite(1300,Math.round(random(120,200)));
   coin.addImage(coinImage);
      coin.scale = 0.3;
   coin.velocityX = -6;
   coin.lifetime = 220;
   
   scoresGroup.add(coin);
 }
  
}

function obstacles(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(1300,310);
    obstacle.addImage(obstacleImage);
    obstacle.setCollider('rectangle',0,0,200,200)
    obstacle.debug=false
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 170;
    
    obstacleGroup.add(obstacle);
  }
  
}



