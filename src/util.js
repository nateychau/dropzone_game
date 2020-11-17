
export const isBetween = (a, b, val) => {
  let max = Math.max(a, b);
  let min = Math.min(a, b);
  return min <= val && val <= max;
}

export const distanceBetweenLineAndCircle = (
  a,
  b,
  c,
  xCenter,
  yCenter
) => {
  return (Math.abs(a * xCenter + b * yCenter + c))/Math.sqrt(a * a + b * b)
}


export const xMagnitude = (line, perpendicularForce) => {
  let lineTheta = Math.atan(line.xChange/line.yChange);
  let forceTheta = Math.PI/2 - lineTheta; 
  let xForce = perpendicularForce * Math.cos(forceTheta);
  return xForce
}

export const getPosition = (event, canvas) => { 
  let x = event.clientX - canvas.offsetLeft + 12; 
  let y = event.clientY - canvas.offsetTop - 70; 
  return {x, y};
}

// export const yMagnitude = (line, perpendicularForce) => {
//   let lineTheta = Math.atan(line.xChange/line.yChange);
//   let forceTheta = 90 - lineTheta;
//   let yForce = perpendicularForce * Math.sin(forceTheta);
//   return yForce;
// }