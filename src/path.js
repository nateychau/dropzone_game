const THICCNESS = 5;

export class Path {
  constructor(xStart, yStart, xEnd, yEnd, pathObj){
    this.xStart = xStart;
    this.yStart = yStart; 
    this.xEnd = xEnd; 
    this.yEnd = yEnd;

    this.length = Math.sqrt( ((xEnd-xStart)**2) + ((yEnd-yStart)**2)) //distance 
  }
}