import { Watermelon } from './watermelon.js';
import { Game } from './game.js';
import { worldTest } from './world.js'

window.addEventListener('DOMContentLoaded', (event) => {
  const transparentCanvas = document.getElementById('transparent-canvas');
  const canvas = document.getElementById('canvas');
  const drawCanvas = document.getElementById('draw-canvas');
  setCanvasDimensions(transparentCanvas);
  setCanvasDimensions(canvas);
  setCanvasDimensions(drawCanvas);
  let ctx = canvas.getContext('2d');

  const game = new Game(transparentCanvas, canvas, drawCanvas);
  
  const playButton = document.getElementById('play-btn');
  playButton.addEventListener('click', ()=>{
      game.togglePlay();
      playButton.innerHTML = game.playing ? 'Pause' : 'Play';
  });

  const resetButton = document.getElementById('reset-btn');
  resetButton.addEventListener('click', ()=> {
    game.reset();
    playButton.innerHTML = 'Play';
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

  // worldTest(canvas, game.watermelon);

});

const setCanvasDimensions = (canvas) => {
  let width = window.innerWidth - 100 || window.clientWidth - 100;
  let height = window.innerHeight - 150 || window.clientHeight - 150;
  canvas.width = width; 
  canvas.height = height;  
}