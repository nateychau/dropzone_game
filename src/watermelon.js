export const RADIUS_X = 124//134;
export const RADIUS_Y = 90//100;

export class Watermelon {
  constructor(initialX, initialY, canvas){
    //constants
    this.sprite = new Image();
    this.sprite.src = "../dist/assets/watermelon.png"
    this.xRadius = RADIUS_X;
    this.yRadius = RADIUS_Y;
    
    this.canvas = canvas;
    this.floor = this.canvas.height - this.yRadius + 15;

    //current position
    this.xPos = initialX;
    this.yPos = initialY;

    //velocity
    this.speedY = 0;
    this.speedX = 0;

    //gravity
    this.gravity = 0.09;

    this.draw = this.draw.bind(this);
    this.fallOneFrame = this.fallOneFrame.bind(this);
    this.fall = this.fall.bind(this);
    this.stop = this.stop.bind(this);
  }

  draw(){
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.drawImage(this.sprite, this.xPos, this.yPos, 134, 100);
  }
  
  fallOneFrame(lines){
    this.draw();
    let oldYPos = this.yPos;
    this.speedY += this.gravity; 
    this.yPos += this.speedY;

    let yInt = Math.floor(this.yPos);
    let xInt = Math.floor(this.xPos)+30; //add and subtract 30 to accomodate for pic being offset
    let width = []
    for (let i = xInt; i<xInt+this.xRadius-30; i++){
      width.push(i.toString());
    }
    let xCheck;
    let xLines = Object.keys(lines);
    for(let i = 0; i < width.length; i++){
      if (xLines.includes(width[i])){
        xCheck = width[i]; //find first possible x position that is overlapping with watermelon 
        break;
      }
    }
    if (
     xCheck &&
      //check if y coordinate for first possible overlapping x coordinate is 
      //overlapping watermelon
      yInt + this.yRadius - 15 > Math.min(...Object.keys(lines[xCheck])) 
    ){
      this.yPos = oldYPos;
    }
    if (this.yPos > this.floor){
      this.yPos = this.floor;
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
    this.xPos = 50;
    this.yPos = 50;
    this.speedY = 0;
    this.speedX = 0;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }
}