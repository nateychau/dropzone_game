import { Trophy } from './trophy.js';
import { Watermelon } from './watermelon.js';
import { Goal } from './goal.js';
import * as Util from './util.js';

export class Level {
  constructor(watermelonCanvas, canvas, level){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.watermelonCanvas = watermelonCanvas;
    this.level = level;

    let goalWidth = 50; 
    let goalX = 500//Math.floor(Math.random() * (this.canvas.width - goalWidth)) + goalWidth/2;
    this.goal = new Goal(goalX, 'placeholder', canvas, goalWidth, 0, level);

    this.watermelon = new Watermelon(50, 20, watermelonCanvas, level)
    this.goal.draw();
    this.watermelon.draw();
    
    
    this.trophies = [];
    this.initializeTrophies();
    this.lines = [];

    this.pointsDisplay = document.getElementById('score-counter');


    this.falling = this.falling.bind(this);
    this.initializeTrophies = this.initializeTrophies.bind(this);
    this.youWin = this.youWin.bind(this);
    this.youLose = this.youLose.bind(this);
  }


  initializeTrophies(){
    let xPos = 150;
    let yPos = 100;
    for (let i = 0; i < 4; i++){
       this.trophies.push(new Trophy(xPos, yPos, this.canvas, this.level));
       xPos += 50; 
       yPos += 50;
    }
  }

  reset(){
    this.watermelon.stop();
    this.watermelon.reset();
    this.lines = [];
    this.watermelon.draw();
    this.goal.draw();
    this.pointsDisplay.innerHTML = `Points: 0`;
    this.initializeTrophies();
  }

  stop(){
    this.watermelon.stop();
  }

  falling(){
    if(
      this.watermelon.yPos + this.watermelon.radius >= this.goal.yPos && 
      Util.isBetween(this.goal.xPos - this.goal.width/2, this.goal.xPos + this.goal.width/2, this.watermelon.xPos)
    ){
      this.youWin();
      return; 
    } else if (this.watermelon.bottom){
      this.youLose();
      return;
    }
    this.watermelon.fallOneFrame(this.lines, this.trophies);
    this.pointsDisplay.innerHTML = `Points: ${this.watermelon.points}`;
    this.goal.draw();
    this.watermelon.falling = window.requestAnimationFrame(this.falling);
  }


  youWin(){
    let win = new Image();
    win.onload = () => {
      // this.watermelonCanvas.style.opacity = 0.5;
      this.ctx.drawImage(win, this.canvas.width/2 - 140, this.canvas.height/2 - 50)
    }
    win.src = 'dist/assets/wintext.png';
  }

  youLose(){
    let lose = new Image();
    lose.onload = () => {
      // this.watermelonCanvas.style.opacity = 0.5;
      this.ctx.drawImage(lose, this.canvas.width/2 - 140, this.canvas.height/2 - 50)
    }
    lose.src = 'dist/assets/losetext.png';
  }
}