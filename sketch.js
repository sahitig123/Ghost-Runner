var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var play = 1
var end = 0 
var gameState = play
var doorsGroup
var climbersGroup
var invisibleBlockGroup

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.addImage("ghost",ghostImg);
  ghost.scale = 0.35

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}

function draw() {
  background(200);
  
  if(gameState === play){
  if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("SPACE")){
    ghost.velocityY = -10
  }
  ghost.velocityY = ghost.velocityY + 0.8

  if(keyDown("LEFT_ARROW")){
    ghost.velocityX = ghost.velocityX - 3
  }

  if(keyDown("RIGHT_ARROW")){
    ghost.velocityX = ghost.velocityX + 3
  }

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisibleBlockGroup.isTouching(ghost) ||ghost.y>600 ){
    ghost.destroy();
    gameState = end
  }
    spawnObstacles();
    drawSprites();

}
if(gameState===end){
  stroke("yellow"); 
  fill("yellow"); 
  textSize(30); 
  text("Game Over", 230,250)
}
    
}

function spawnObstacles(){
  if(frameCount%250==0){
    door=createSprite(200,-50)
    door.addImage("door",doorImg)
    door.velocityY = 1

    climber=createSprite(200,10)
    climber.addImage("climber",climberImg)
    climber.velocityY = 1

    invisibleBlock=createSprite(200,15)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.velocityY = 1

    door.x=Math.round(random(120,400))
    climber.x=door.x
    invisibleBlock.x=climber.x

    door.lifetime = 600
    climber.lifetime = 600
    invisibleBlock.lifetime = 600

    ghost.depth = door.depth
    ghost.depth = ghost.depth +1

    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
  }
}