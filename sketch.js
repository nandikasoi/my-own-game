var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var background, invisibleGround,backgroundImg;
var girl,girlImg;
var orangeImg,bananaImg,appleImg;
var stoneImg,cactusImg;
var bookImg,penImg,clipboardImg,pencilImg;
var fruitsGroup,obstaclesGroup,itemsGroup;
var gameOverImg,restartImg;
var gameOver, restart;

function preload(){
    girlImg = loadImage("girl2.png");
    backgroundImg = loadImage("grassbg.png");
    appleImg = loadImage("fruit3.png");
    bananaImg = loadImage("fruit2.png");
    orangeImg = loadImage("fruit1.png");
    stoneImg = loadImage("obstacle2.png");
    cactusImg = loadImage("obstacle1.png");
    bookImg = loadImage("book.png");
    penImg = loadImage("pen.png");
    clipboardImg = loadImage("clipboard.png");
    pencilImg = loadImage("pencil.png");
    gameOverImg = loadImage("gameOver.png");
    restartImg = loadImage("restart.png");

}

function setup(){
    var canvas = createCanvas(800,600);
    
    background = createSprite(0,0,800,600);
    background.x = background.width/2;

    gameOver = createSprite(400,100);
    gameOver.visible = false;
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3;
    restart = createSprite(400,300);
    restart.visible = false;
    restart.addImage(restartImg);

    invisibleGround = createSprite(200,370,1200,20); 
    invisibleGround.visible = false;
    girl = createSprite(200,300,50,20);

    fruitsGroup = new Group();
    obstaclesGroup = new Group();
    itemsGroup = new Group();

    girl.setCollider("rectangle", 0, 0, girl.width, girl.height);
    girl.debug = true;

}

function draw(){
    //background(0);
    background.addImage(backgroundImg);
    background.scale = 2;
    girl.addImage(girlImg);
    girl.x = 25;
    girl.scale = 0.3;

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        background.velocityX = -6;
      
        if(keyDown("space")){
            girl.velocityY = -10;
        }
        girl.velocityY = girl.velocityY + 0.5;

        if(background.x<0){
            background.x = background.width/2;
        }

        spawnFruits();
        spawnObstacles();
        spawnItems();
      
        if(obstaclesGroup.isTouching(girl)){
            gameOver.visible = true;
            restart.visible = true;
            gameState = END;
            
        }
      }
      else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
        
        //set velcity of each game object to 0
        background.velocityX = 0;
        girl.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        fruitsGroup.setVelocityXEach(0);
        itemsGroup.setVelocityXEach(0);

        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
        fruitsGroup.setLifetimeEach(-1);
        itemsGroup.setLifetimeEach(-1);
        
        if(mousePressedOver(restart)) {
          reset();
        }
      }
    
   
    girl.collide(invisibleGround);
    drawSprites();
    text("Score: " + score, 700, 50);

    

}

function spawnFruits(){
    if(frameCount%80===0){
        var fruit = createSprite(1200,100,20,20);
        var rand = Math.round(random(1,3));
        switch(rand){
            case 1: fruit.addImage(appleImg);
                    break;
            case 2: fruit.addImage(orangeImg);
                    break;
            case 3: fruit.addImage(bananaImg);
                    break;
            default: break;
        }
        fruit.y = Math.round(random(100,140));
        fruit.velocityX = -6;
        fruit.lifetime = 200;
        fruit.scale= 0.3
        fruitsGroup.add(fruit);
    }
}

function spawnObstacles(){
    if(frameCount%80===0){
        var obstacle = createSprite(1200,340,50,50);
        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage(stoneImg);
                    break;
            case 2: obstacle.addImage(cactusImg);
                    break;
            default: break;
        }
        obstacle.velocityX = -6;
        obstacle.lifetime = 200;
        obstacle.scale= 0.2;
        obstaclesGroup.add(obstacle);
    } 
}

function spawnItems(){
    if(frameCount%150===0){
        var item = createSprite(1200,150,20,20);
        var rand = Math.round(random(1,4));
        switch(rand){
            case 1: item.addImage(bookImg);
                    break;
            case 2: item.addImage(penImg);
                    break;
            case 3: item.addImage(pencilImg);
                    break;
            case 4: item.addImage(clipboardImg);
                    break;
            default: break;
        }
        item.velocityX = -4;
        item.lifetime = 300;
        item.scale= 0.25;
        itemsGroup.add(item);
    }
}

function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    fruitsGroup.destroyEach();
    itemsGroup.destroyEach();
    score = 0;
    
  }
