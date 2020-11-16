import { Watermelon } from './watermelon.js';
import { Game } from './game.js';
import { worldTest } from './world.js'

window.addEventListener('DOMContentLoaded', (event) => {
  const transparentCanvas = document.getElementById('transparent-canvas');
  const canvas = document.getElementById('canvas');
  const drawCanvas = document.getElementById('draw-canvas');
  const background = document.getElementById('bg-canvas');
  setCanvasDimensions(transparentCanvas);
  setCanvasDimensions(canvas);
  setCanvasDimensions(drawCanvas);
  setCanvasDimensions(background);
  let ctx = canvas.getContext('2d');

  const game = new Game(transparentCanvas, canvas, drawCanvas);
  
  const playButton = document.getElementById('play-btn');
  playButton.addEventListener('click', ()=>{
      game.togglePlay();
      playButton.innerHTML = game.playing ? 
      "Pause <i class='fas fa-pause'></i>" 
      : 
      "Play <i class='fas fa-play'></i>" ;
  });

  const resetButton = document.getElementById('reset-btn');
  resetButton.addEventListener('click', ()=> {
    game.reset();
    playButton.innerHTML = "Play <i class='fas fa-play'></i>";
  })

  const drawButton = document.getElementById('draw-btn');
  drawButton.addEventListener('click', ()=>{
    transparentCanvas.classList.toggle("drawing");
    game.paintMode = !game.paintMode;
    if(game.paintMode){
      drawButton.classList.add('active');
    } else {
      drawButton.classList.remove('active');
    }
  })

  const helpButton = document.getElementById('help-btn');
  const helpTooltip = document.getElementById('help-tooltip');
  helpButton.addEventListener('click', (e) => {
    e.stopPropagation();
    helpTooltip.classList.toggle("show");
  })

  document.body.addEventListener('click', () => {
    if(helpTooltip.classList.contains("show")){
      helpTooltip.classList.remove("show");
    }
  })

  // worldTest(canvas, game.watermelon);

});

const setCanvasDimensions = (canvas) => {
  let width = 1000//window.innerWidth - 100 || window.clientWidth - 100;
  let height = window.innerHeight - 150 || window.clientHeight - 150;
  canvas.width = width; 
  canvas.height = height;  
}