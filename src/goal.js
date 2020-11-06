export class Goal {
  constructor(xPos, yPos, canvas, width, speed){
    this.xPos = xPos; 
    this.yPos = yPos; 
    this.width = width;
    this.canvas = canvas;
    this.direction = -1;
    this.speed = speed

    this.draw = this.draw.bind(this);
  }


  draw(){ 
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5; 
    ctx.moveTo(this.xPos - this.width/2, this.yPos);
    ctx.lineTo(this.xPos+this.width/2, this.yPos);
    ctx.stroke();
  }

  move(){
    this.speed = this.direction;
    this.xPos += this.speed; 
    if (
      this.xPos + this.width/2 >= this.canvas.width ||
      this.xPos - this.width/2 <= 0
    ){
      this.direction *= -1; 
    }
    this.draw();
  }
}