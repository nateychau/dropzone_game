# README

## Background
[Dropzone](https://nateychau.github.io/dropzone_game/)

Dropzone is a game where players direct a falling ball to a moving goal by drawing lines to control the direction that the ball falls in. 

## Instructions
While in draw mode, players can draw lines to direct the ball. Switch to draw mode by pressing the draw button, and then click play to start the ball's fall. Draw lines with your mouse under the ball as it falls to direct it into the goal. 


## Technologies Used
- Javascript
- Canvas API

## Features
### Drawing with Canvas API
The line drawing on mouse-click, with real-time preview of the line to be drawn, was achieved by stacking 2 different canvases on top of each other, and by attaching event listeners to the mouse-down, mouse-move, and mouse-up events. When a user is in draw mode, the script listens for a mouse-down event, which sets the draw flag to true. When the draw flag is true, the mouse-move event draws a line on a top level canvas from the starting (mouse-down) position to the current mouse position. On each mouse-move event, the canvas is cleared and a new line is drawn, to prevent the line from the previous frame from persisting. When the mouse-up event occurs, the line on the top level canvas is cleared, and a line (with the exact same start and end points) is drawn on a middle-level canvas, where all previous lines are drawn. The watermelon's animation frames are drawn on the third-level canvas. Layering the canvases this way makes clearing and redrawing the picture from the previous frame much easier. 

Mouse-down event handler
```javascript
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
```

Mouse-move event handler
```javascript
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
```

Mouse-up event handler. A new Path object is created whenever the user draws a line. Properties of the Path object are used to check if the ball has collided with a line during its fall, and the resulting direction that it should fall in if it has.  
```javascript
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
        
        
        this.drawing = false;
        this.newPath = {x: 0, y: 0}

})
```


Potential future features:
- Implementing levels (this would probably involve jewels to collect along a path, and a stationary goal, or a goal with more predictable movement)
- Trampolines for players to add along the path
- Obstacles 
- Free drawing (not restricted to lines. This would probably involve implementing a physics engine like Matter js)
- Build your own level
