import { Watermelon } from './watermelon.js'
import { Path } from './path.js'
import { Goal } from './goal.js'
import * as Util from './util.js';

export class Game{
  constructor(canvas, watermelonCanvas, drawCanvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.drawCanvas = drawCanvas;
    this.drawCtx = drawCanvas.getContext('2d');
    
    this.watermelon = new Watermelon(500, 100, watermelonCanvas);
    this.watermelon.draw();
    this.playing = false; 
    this.paintMode = false;
    this.drawing = false;
    this.newPath = {x: 0, y: 0};

    this.lines = []

    let goalWidth = 50; 
    let goalX = Math.floor(Math.random() * (this.canvas.width - goalWidth)) + goalWidth/2;
    let goalY = this.canvas.height-5; 
    this.goal = new Goal (goalX, goalY, this.canvas, goalWidth);
    this.goal.draw();
    
    this.reset = this.reset.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.getPosition = this.getPosition.bind(this);
    this.falling = this.falling.bind(this);
    this.youWin = this.youWin.bind(this);
    this.youLose = this.youLose.bind(this);
    this.canvasDrawEventHandlers();
  }

  reset(){
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawCtx.clearRect(0, 0, canvas.width, canvas.height);
    this.lines = [];
    this.watermelon.stop();
    this.playing = false;
    this.watermelon.reset();
    this.watermelon.draw();
    let goalWidth = 50; 
    let goalX = Math.floor(Math.random() * (this.canvas.width - goalWidth)) + goalWidth/2;
    let goalY = this.canvas.height-5; 
    this.goal = new Goal (goalX, goalY, this.canvas, goalWidth);
    this.goal.draw();
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
    if(
      this.watermelon.yPos + this.watermelon.radius >= this.goal.yPos && 
      Util.isBetween(this.goal.xPos - this.goal.width/2, this.goal.xPos + this.goal.width/2, this.watermelon.xPos)
    ){
      this.youWin();
      // console.log('You win!');
      return; 
    } else if (this.watermelon.bottom){
      this.youLose();
      return;
    }
    this.watermelon.fallOneFrame(this.lines);
    this.goal.move();
    // this.goal.draw();
    this.watermelon.falling = window.requestAnimationFrame(this.falling);
  }

  getPosition(event){ 
    this.newPath.x = event.clientX - this.canvas.offsetLeft + 12; // to accomadate mouse being a square
    this.newPath.y = event.clientY - this.canvas.offsetTop - 60; 
    // for (let i = this.newPath.x - 10; i <= this.newPath.x+10; i ++){
    //   this.lines[i] ||= {}
    //   for(let j = this.newPath.y - 10; j <= this.newPath.y+10; j++){
    //     this.lines[i][j] = true;
    //   }
    // }
  }

  youWin(){
    let win = new Image();
    win.src = '../dist/assets/winText.png';
    win.onload = () => {
      this.ctx.drawImage(win, this.canvas.width/2 - 140, this.canvas.height/2 - 50);
    }
  }

  youLose(){
    let lose = new Image();
    lose.src = '../dist/assets/losetext.png';
    lose.onload = () => {
      this.ctx.drawImage(lose, this.canvas.width/2 - 140, this.canvas.height/2 - 50)
    }
  }


  canvasDrawEventHandlers(){
    this.canvas.addEventListener('mousedown', (e) => {
      if(!this.paintMode) return 
      this.drawing = true; 
      this.getPosition(e); //get start point for line

      //set start point for line
      this.startPoint = {
        x: this.newPath.x,
        y: this.newPath.y
      }

      //set properties on actual canvas
      this.ctx.lineWidth = 15;
      this.ctx.lineCap = 'round';
      this.ctx.strokeStyle = 'black';

    })

    this.canvas.addEventListener('mousemove', (e) => {
      if(!this.drawing) return

      //clear drawing canvas onmove to simulate one line being drawn 
      //temp drawing is done on draw canvas so that previously drawn lines
      //are not erased
      this.drawCtx.clearRect(0, 0, canvas.width, canvas.height)
      
      //set properties on draw canvas
      this.drawCtx.lineWidth = 15;
      this.drawCtx.lineCap = 'round';
      this.drawCtx.strokeStyle = 'black';
      
      //draw temp line on draw canvas
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(this.startPoint.x, this.startPoint.y);
      this.getPosition(e);
      this.drawCtx.lineTo(this.newPath.x, this.newPath.y);
      this.drawCtx.stroke();
    })
    
    this.canvas.addEventListener('mouseup', (e) => {
      if(!this.drawing) return

      //Use selected points from draw canvas to draw line on real canvas
      this.ctx.beginPath();
      this.ctx.moveTo(this.startPoint.x, this.startPoint.y);
      this.ctx.lineTo(this.newPath.x, this.newPath.y);
      this.ctx.stroke();

      let newLine = new Path(
        this.startPoint.x,
        this.startPoint.y,
        this.newPath.x,
        this.newPath.y
      )
      this.lines.push(newLine);
      

      //NEED TO DRY THIS UP
      // if(this.startPoint.x > this.newPath.x){
      //   for(let i = this.newPath.x; i <= this.startPoint.x; i++){
      //     this.lines[i] ||= {};
      //     if(this.startPoint.y > this.newPath.y){
      //       for(let j = this.newPath.y; j <= this.startPoint.y; j++){
      //         this.lines[i][j] = true;
      //       }
      //     } else {
      //       for(let j = this.startPoint.y; j <=this.newPath.y; j++){
      //         this.lines[i][j] = true;
      //       }
      //     }
      //   }
      // } else {
      //   for(let i = this.startPoint.x; i <= this.newPath.x; i++){
      //     this.lines[i] ||= {};
      //     if(this.startPoint.y > this.newPath.y){
      //       for(let j = this.newPath.y; j <= this.startPoint.y; j++){
      //         this.lines[i][j] = true;
      //       }
      //     } else {
      //       for(let j = this.startPoint.y; j <=this.newPath.y; j++){
      //         this.lines[i][j] = true;
      //       }
      //     }
      //   }
      // }

      this.drawing = false;
      this.newPath = {x: 0, y: 0}
    })
  }

}
