export class Trophy {
  constructor(xPos, yPos, canvas, level){
    this.xPos = xPos;
    this.yPos = yPos; 
    this.value = 5;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.spriteAdjust = 0;
    this.soccerX = 0;
    this.xOffset = -10;
    this.yOffset = -20;

    this.sprite = new Image();
    this.sprite.onload = () => {
      this.ctx.drawImage(this.sprite, this.xPos + this.xOffset, this.yPos + this.yOffset, 20+this.spriteAdjust/1.5 + this.soccerX, 40+this.spriteAdjust)
    }
    switch(level){
      case 1:
        this.sprite.src = 'https://raw.githubusercontent.com/nateychau/dropzone_game/main/dist/assets/larryob.png';
        break;
      case 2: 
        this.sprite.src = 'https://raw.githubusercontent.com/nateychau/dropzone_game/main/dist/assets/usopen.png';
        this.xOffset = -75;
        this.yOffset = -120;
        this.spriteAdjust = 200;
        break;
      case 3: 
        this.sprite.src = 'https://raw.githubusercontent.com/nateychau/dropzone_game/main/dist/assets/mlb.png';
        this.xOffset = -15;
        this.yOffset = -25; 
        this.spriteAdjust = 5;
        break;
      case 4: 
        this.sprite.src = 'https://raw.githubusercontent.com/nateychau/dropzone_game/main/dist/assets/worldcup.png';
        this.xOffset = -170;
        this.yOffset = -145;
        this.spriteAdjust = 250;
        this.soccerX = 150;
        break;
    }

    this.draw = this.draw.bind(this);
  }

  clear(){
    this.ctx.clearRect(this.xPos-20, this.yPos-40, 40, 80)
    //this.ctx.clearRect(this.xPos + this.xOffset, this.yPos + this.yOffset,  20+this.spriteAdjust/1.5 + this.soccerX, 40+this.spriteAdjust)
    this.xPos = null;
    this.yPos = null;
  }

  draw(){
    this.ctx.beginPath()
    this.ctx.strokeStyle = 'red';
    this.ctx.lineWidth = 5;
    this.ctx.arc(
      this.xPos,
      this.yPos,
      1, 
      0, 
      2*Math.PI
    )
    this.ctx.stroke();
  }
}