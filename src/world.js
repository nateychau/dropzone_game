export const worldTest = (canvas, watermelon) => {

  let Engine = Matter.Engine, 
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies, 
  Body = Matter.Body,
  Vertices = Matter.Vertices

  const engine = Engine.create();
  
  let render = Render.create({
    element: document.body,
    canvas: canvas,
    engine: engine,
    options: {
      wireframes: false
    }
  })
  
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
  var watermelon = Bodies.rectangle(
    watermelon.xPos, //center x 
    watermelon.yPos, //center y
    watermelon.xRadius*2, //width
    watermelon.yRadius*2, //height
    {
      chamfer: {
        radius: 50
      },
      render: { 
        sprite: {
          xScale: .6,
          yScale: .6,
          texture: "../dist/assets/watermelon.png"
        }
      }
    }
  )
  
  // add all of the bodies to the world
  World.add(engine.world, [boxA, boxB, ground, watermelon]);
  
  // run the engine
  Engine.run(engine);
  
  // run the renderer
  Render.run(render);
}

//CODE FOR FREE FORM DRAWING

// canvasDrawEventHandlers(){
  //   this.canvas.addEventListener('mousedown', (e) => {
  //     if(!this.paintMode) return 
  //     this.drawing = true;
  //     this.getPosition(e);

  //     //
  //     this.ctx.beginPath();
  //     this.ctx.lineWidth = 15;
  //     this.ctx.lineCap = 'round';
  //     this.ctx.strokeStyle = 'black';
  //     this.ctx.lineTo(this.newPath.x, this.newPath.y);
  //     this.ctx.stroke();
  //   })

  //   this.canvas.addEventListener('mousemove', (e) => {
  //     if(!this.drawing) return

  //     this.ctx.beginPath();
  //     // this.ctx.lineWidth = 15;
  //     // this.ctx.lineCap = 'round';
  //     // this.ctx.strokeStyle = 'black';
  //     this.ctx.moveTo(this.newPath.x, this.newPath.y);
  //     this.getPosition(e);
  //     this.ctx.lineTo(this.newPath.x, this.newPath.y);
  //     this.ctx.stroke();
  //   })
    
  //   this.canvas.addEventListener('mouseup', () => {
  //     this.drawing = false;
  //     this.newPath = {x: 0, y: 0}
  //   })
  // }