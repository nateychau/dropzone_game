import { Watermelon } from './watermelon.js';
import { Game } from './game.js';
import { worldTest } from './world.js'

window.addEventListener('DOMContentLoaded', (event) => {
  const drawCanvas = document.getElementById('draw-canvas');
  const transparentCanvas = document.getElementById('transparent-canvas');
  const trophyCanvas = document.getElementById('trophy-canvas');
  const watermelonCanvas = document.getElementById('canvas');
  const background = document.getElementById('bg-canvas');
  setCanvasDimensions(drawCanvas);
  setCanvasDimensions(transparentCanvas);
  setCanvasDimensions(trophyCanvas);
  setCanvasDimensions(watermelonCanvas);
  setCanvasDimensions(background);
  let ctx = canvas.getContext('2d');

  const game = new Game(drawCanvas, transparentCanvas, watermelonCanvas, trophyCanvas);
  

  //------------level buttons--------------------
  // let levels = [];
  // const basketball = document.getElementById('basketball');
  // levels.push(basketball);
  // const golf = document.getElementById('golf');
  // levels.push(golf);
  // const baseball = document.getElementById('baseball');
  // levels.push(baseball);
  // const soccer = document.getElementById('soccer');
  let levels = document.querySelectorAll('.level');
  levels.forEach((level, i) => {
    level.addEventListener('click', (e) => {
      let current = document.querySelector('.current-level');
      current.classList.remove('current-level');
      e.currentTarget.classList.add('current-level');
      game.changeLevel(i+1);
      background.classList = i+1;
    })
  })

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
    drawCanvas.classList.toggle("drawing");
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
  let width = 800//window.innerWidth - 100 || window.clientWidth - 100;
  let height = 400// window.innerHeight - 150 || window.clientHeight - 150;
  canvas.width = width; 
  canvas.height = height;  
}