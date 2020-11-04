import { Watermelon } from './watermelon.js';
import { Game } from './game.js';

window.addEventListener('DOMContentLoaded', (event) => {
  let transparentCanvas = document.getElementById('transparent-canvas');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');

  const game = new Game(transparentCanvas, canvas);
  
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
  })


});