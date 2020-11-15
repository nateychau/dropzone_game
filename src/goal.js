export class Goal {
  constructor(xPos, yPos, canvas, width, speed, level){
    this.xPos = xPos; 
    this.yPos = yPos; 
    this.width = width;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.direction = 0;
    this.speed = speed
    this.spriteAdjust = 0;

    this.sprite = new Image();
    this.sprite.onload = () => {
      this.ctx.drawImage(this.sprite, this.xPos+this.xOffset, this.yPos-this.width + this.yOffset, this.width, this.width-this.spriteAdjust);
    }
    switch(level){
      case 1:
        this.sprite.src = '../dist/assets/hoop.png';
        this.xOffset = -25;
        this.yOffset = 5;
        break;
      case 2: 
        this.sprite.src = '../dist/assets/hole.png';
        this.xOffset = -25;
        this.yOffset = 5;
        break;
      case 3: 
        this.sprite.src = '../dist/assets/bat.png'; 
        this.xOffset = -25;
        this.yOffset = 35;
        this.spriteAdjust = 25
        break;
      case 4: 
        this.sprite.src = '../dist/assets/net.png';
        this.xOffset = -24;
        this.yOffset = 10;
        break;
    }

    this.draw = this.draw.bind(this);
  }


  draw(){ 
    this.ctx = canvas.getContext('2d');
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'rgba(255,255,255,0)';
    this.ctx.lineWidth = 5; 
    this.ctx.moveTo(this.xPos - this.width/2, this.yPos);
    this.ctx.lineTo(this.xPos+this.width/2, this.yPos);
    this.ctx.stroke();
    this.ctx.drawImage(this.sprite, this.xPos + this.xOffset, this.yPos-this.width + this.yOffset, this.width, this.width-this.spriteAdjust);
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