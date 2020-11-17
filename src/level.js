import { Trophy } from './trophy.js';
import { Watermelon } from './watermelon.js';
import { Goal } from './goal.js';
import * as Util from './util.js';

const BasketballTrophies = {
  x: 150,
  y: 100,
  xChange: 50,
  yChange: 50,
}

const GolfTrophies = {
  x: 550,
  y: 180,
  xChange: -50,
  yChange: 50
}

const BaseballTrophies = {
  x: 50,
  y: 100,
  xChange: 100,
  yChange: 50
}

const SoccerTrophies = {
  x: 50, 
  y: 100,
  xChange: 200,
  yChange: 30
}


export class Level {
  constructor(watermelonCanvas, canvas, trophyCanvas, level){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.watermelonCanvas = watermelonCanvas;
    this.trophyCanvas = trophyCanvas;
    this.level = level;

    let goalWidth = 50; 
    let goalX;//Math.floor(Math.random() * (this.canvas.width - goalWidth)) + goalWidth/2;
    switch(level){
      case 1:
        goalX = 500;
        break
      case 2: 
        goalX = 300;
        break
      case 3:
        goalX = 700;
      case 4: 
        goalX = 100;
    }
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
    let xPos, yPos, xChange, yChange;
    switch(this.level){
      case 1:
        xPos = BasketballTrophies.x;
        yPos = BasketballTrophies.y,
        xChange = BasketballTrophies.xChange;
        yChange = BasketballTrophies.yChange;
        break
      case 2: 
        xPos = GolfTrophies.x;
        yPos = GolfTrophies.y;
        xChange = GolfTrophies.xChange;
        yChange = GolfTrophies.yChange;
        break
      case 3: 
        xPos = BaseballTrophies.x;
        yPos = BaseballTrophies.y;
        xChange = BaseballTrophies.xChange;
        yChange = BaseballTrophies.yChange;
        break
      case 4:
        xPos = SoccerTrophies.x;
        yPos = SoccerTrophies.y;
        xChange = SoccerTrophies.xChange;
        yChange = SoccerTrophies.yChange;
        break
    }
    for (let i = 0; i < 4; i++){
      let trophy = new Trophy(xPos, yPos, this.trophyCanvas, this.level)
       this.trophies.push(trophy);
      //  trophy.draw();
      if(this.level === 3 && i >= 1){
        xChange = 50;
        yChange = 70
        if (i === 2) yChange = 20;
      }
      if(this.level === 4 && i > 1){
        yChange += 100;
        xChange *= -1;
      }
      xPos += xChange; 
      yPos += yChange;
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