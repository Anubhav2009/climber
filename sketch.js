var back,backImage;
var climber,climberImage;
var boulder,boulderImage;
var gold,goldImage;
var boulderGroup,goldGroup;
var PLAY=1,END=0;
var gameState=PLAY;
var score=0;
function preload(){
backImage=loadImage("mountain.jpg");
climberImage=loadImage("climber.png");
boulderImage=loadImage("boulder.png");
goldImage=loadImage("gold.png");
}

function setup(){
createCanvas(800,800);
back=createSprite(400,400,800,800);
climber=createSprite(50,598,10,10);
back.addImage(backImage);
climber.addImage(climberImage);
back.velocityY=2;
back.scale=1.5;
climber.scale=0.2;
boulderGroup=new Group();
goldGroup=new Group();
//climber.debug=true;
}

function draw(){
background("black");

if(gameState===PLAY){
if(back.y>500){
	back.y=400;
}
if(keyDown("w")){
climber.velocityY=-2;
}
if(keyDown("a")){
	climber.x=climber.x-2;
	}
	if(keyDown("d")){
		climber.x=climber.x+2;
		}

		climber.velocityY=climber.velocityY+0.6;
		spawnObstacles();
		spawnGold();
		if(climber.isTouching(goldGroup)){
			goldGroup.destroyEach();
			score=score+50;
		}
		drawSprites();
		text("Score=" +score,200,50);
		if(climber.isTouching(boulderGroup)|| climber.y>800){
			gameState=END;
		}
}
else if(gameState===END){
	climber.destroy();
	boulderGroup.destroyEach();
	boulderGroup.setVelocityYEach(0);
	back.velocityY=0;
	back.destroy();
	background("black");
	textSize(12);
	stroke("red");
	text("Game over",400,400);
}
}

function spawnObstacles() {
	if(frameCount%60===0){
		boulder=createSprite(Math.round(random(0,800)),0,20,20);
		boulder.addImage(boulderImage);
		boulder.scale=0.02
        boulder.velocityY=2;
		boulderGroup.add(boulder);
		boulder.lifetime=400;
		//boulder.debug=true;
	}
}
function spawnGold() {
	if(frameCount%100===0){
		gold=createSprite(Math.round(random(0,800)),0,20,20);
		gold.addImage(goldImage);
		gold.scale=0.1;
        gold.velocityY=5;
		goldGroup.add(gold);
		gold.lifetime=400;
		
	}
}
