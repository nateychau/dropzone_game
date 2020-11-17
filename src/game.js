import { Path } from './path.js'
import * as Util from './util.js';
import { Level } from './level.js';

export class Game{
  constructor(drawCanvas, transparentCanvas, watermelonCanvas, trophyCanvas){
    this.drawCanvas = drawCanvas;
    this.drawCtx = drawCanvas.getContext('2d');

    this.watermelonCanvas = watermelonCanvas;

    this.transparentCanvas = transparentCanvas;
    this.transparentCtx = transparentCanvas.getContext('2d');
    
    this.trophyCanvas = trophyCanvas
    this.trophyCtx = trophyCanvas.getContext('2d');

    this.level = new Level(watermelonCanvas, transparentCanvas, trophyCanvas, 1);


    this.playing = false; 
    this.paintMode = false;
    this.drawing = false;

    this.newPath = {x: 0, y: 0};

    //initialize with canvas event handlers
    this.canvasDrawEventHandlers();

    //bind instance methods
    this.reset = this.reset.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
  }

  reset(){
    this.transparentCtx.clearRect(0, 0, this.transparentCanvas.width, this.transparentCanvas.height);
    this.trophyCtx.clearRect(0, 0, this.trophyCanvas.width, this.trophyCanvas.height);
    this.playing = false;
    this.level.reset();
  }

  togglePlay(){
    if(this.playing){
      this.level.stop();
    } else {
      this.level.falling();
    }
    this.playing = !this.playing 
  }

  changeLevel(level){
    this.level = new Level(this.watermelonCanvas, this.transparentCanvas, this.trophyCanvas, level);
    this.reset();
  }

  canvasDrawEventHandlers(){
    this.drawCanvas.addEventListener('mousedown', (e) => {
      if(!this.paintMode) return 
      this.drawing = true; 
      this.newPath = Util.getPosition(e, this.drawCanvas);
      this.startPoint = {
        x: this.newPath.x,
        y: this.newPath.y
      }; //get start point for line

      //set properties on actual canvas
      this.transparentCtx.lineWidth = 15;
      this.transparentCtx.lineCap = 'round';
      this.transparentCtx.strokeStyle = 'black';


    })

    this.drawCanvas.addEventListener('mousemove', (e) => {
      if(!this.drawing) return

      //clear drawing canvas onmove to simulate one line being drawn 
      //temp drawing is done on draw canvas so that previously drawn lines
      //are not erased
      this.drawCtx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height)
      
      //set properties on draw canvas
      this.drawCtx.lineWidth = 15;
      this.drawCtx.lineCap = 'round';
      this.drawCtx.strokeStyle = 'black';
      
      //draw temp line on draw canvas
      this.drawCtx.beginPath();
      this.drawCtx.moveTo(this.startPoint.x, this.startPoint.y);
      this.newPath = Util.getPosition(e, this.drawCanvas);
      this.drawCtx.lineTo(this.newPath.x, this.newPath.y);
      this.drawCtx.stroke();
    })
    
    this.drawCanvas.addEventListener('mouseup', (e) => {
      if(!this.drawing) return
      this.drawCtx.clearRect(0, 0, this.drawCanvas.width, this.drawCanvas.height);
      
      //Use selected points from draw canvas to draw line on real canvas
      this.transparentCtx.beginPath();
      this.transparentCtx.moveTo(this.startPoint.x, this.startPoint.y);
      this.transparentCtx.lineTo(this.newPath.x, this.newPath.y);
      this.transparentCtx.stroke();
      
      let newLine = new Path(
        this.startPoint.x,
        this.startPoint.y,
        this.newPath.x,
        this.newPath.y
        )
      this.level.lines.push(newLine);
      this.drawing = false;
      this.newPath = {
        x: 0,
        y: 0
      }
      // this.startPoint = {
      //   x: 0,
      //   y: 0
      // }


    })
  }

}
