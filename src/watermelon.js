import * as Util from './util.js';

export const RADIUS_X = 50;
export const RADIUS_Y = 50;

export class Watermelon {
  constructor(initialX, initialY, canvas){
    //constants
    // this.sprite = new Image();
    // this.sprite.src = "../dist/assets/watermelon.png"
    this.radius = 10;
    
    this.canvas = canvas;
    this.floor = this.canvas.height;
    this.leftWall = 0;
    this.rightWall = this.canvas.width;
    this.bottom = false; 

    //initial position for resetting
    this.initialX = initialX;
    this.initialY = initialY;

    //current position of center
    this.xPos = initialX + this.canvas.offsetLeft;
    this.yPos = initialY + this.canvas.offsetTop;

    //velocity
    this.speedY = 0;
    this.speedX = 0;

    //gravity
    this.gravity = 0.05;
    this.mass = 5;

    this.draw = this.draw.bind(this);
    this.fallOneFrame = this.fallOneFrame.bind(this);
    this.fall = this.fall.bind(this);
    this.stop = this.stop.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
  }

  draw(){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.beginPath()
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.arc(
      this.xPos,
      this.yPos,
      this.radius, 
      0, 
      2*Math.PI
    )
    ctx.stroke();

    // ctx.drawImage(
    //   this.sprite, 
    //   this.xPos - this.xRadius, //get top left corner by subtracting radius from center coordinates
    //   this.yPos - this.yRadius, 
    //   this.xRadius*2, 
    //   this.yRadius*2
    // );
  }

  checkCollision(lines){
    let res = false;
    for(let i = 0; i < lines.length; i++){
      let line = lines[i];
      let distanceBetween = Util.distanceBetweenLineAndCircle(
        line.a, line.b, line.c, this.xPos, this.yPos
      );
      if (
        distanceBetween <= this.radius && 
        this.yPos+this.radius >= Math.min(line.yStart, line.yEnd) && 
        Util.isBetween(line.xStart, line.xEnd, ((this.yPos+this.radius - line.yIntercept)/line.slope))
      ){
        res = line;
      }
    }
    return res; 
  }

  
  fallOneFrame(lines){
    this.draw();
    let oldYPos = this.yPos;
    this.speedY += this.gravity; 
    this.yPos += this.speedY;
    this.xPos += this.speedX;
    if(this.checkCollision(lines)){
      let line = this.checkCollision(lines);
      this.speedX = Util.xMagnitude(line, this.mass) * Math.sign(line.slope);
      // this.speedY = Util.yMagnitude(line, this.mass);
      this.speedY = 0; 
    }
    // else{
    //   this.speedX = 0;
    // }
    if (this.yPos + this.radius > this.floor){
      this.yPos = this.floor - this.radius;
      this.bottom = true; 
    }
    if(this.xPos - this.radius < this.leftWall){
      this.xPos = this.leftWall + this.radius;
    }
    if(this.xPos + this.radius > this.rightWall){
      this.xPos = this.rightWall - this.radius;
    }
    
  }

  fall(lines){
    this.fallOneFrame(lines)
    this.falling = window.requestAnimationFrame(this.fall);
  }

  stop(){
    if(this.falling){
      window.cancelAnimationFrame(this.falling);
    }
  }

  reset(){
    this.bottom = false; 
    this.xPos = this.initialX;
    this.yPos = this.initialY;
    this.speedY = 0;
    this.speedX = 0;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
}