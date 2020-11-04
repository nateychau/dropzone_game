import { Watermelon } from './watermelon.js'

export class Game{
  constructor(canvas, watermelonCanvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    
    this.watermelon = new Watermelon(50, 50, watermelonCanvas);
    this.playing = false; 
    this.paintMode = false;
    this.drawing = false;
    this.newPath = {x: 0, y: 0};

    this.lines = {}


    
    this.reset = this.reset.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.falling = this.falling.bind(this);
    this.canvasDrawEventHandlers();
  }

  reset(){
    this.ctx.clearRect(0,0, canvas.width, canvas.height);
    this.lines = {};
    this.watermelon.stop();
    this.playing = false;
    this.watermelon.reset();
    this.watermelon.draw();
  }

  togglePlay(){
    if(this.playing){
      this.watermelon.stop();
    } else {
      this.falling();
      // this.watermelon.fall(this.lines);
    }
    this.playing = !this.playing 
  }

  falling(){
    this.watermelon.fallOneFrame(this.lines);
    this.watermelon.falling = window.requestAnimationFrame(this.falling);
  }

  getPosition(event){ 
    this.newPath.x = event.clientX - this.canvas.offsetLeft + 12; // to accomadate mouse being a square
    this.newPath.y = event.clientY - this.canvas.offsetTop - 23; 
    for (let i = this.newPath.x - 10; i <= this.newPath.x+10; i ++){
      this.lines[i] ||= {}
      for(let j = this.newPath.y - 10; j <= this.newPath.y+10; j++){
        this.lines[i][j] = true;
      }
    }
  }

  canvasDrawEventHandlers(){
    this.canvas.addEventListener('mousedown', (e) => {
      if(!this.paintMode) return 
      this.drawing = true;
      this.getPosition(e);
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if(!this.drawing) return

      this.ctx.beginPath();
      this.ctx.lineWidth = 15;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = 'black';
      this.ctx.moveTo(this.newPath.x, this.newPath.y);
      this.getPosition(e);
      this.ctx.lineTo(this.newPath.x, this.newPath.y);
      this.ctx.stroke();
    })
    
    this.canvas.addEventListener('mouseup', () => {
      this.drawing = false;
      this.newPath = {x: 0, y: 0}
    })
  }

  

}
