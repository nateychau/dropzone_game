const THICCNESS = 5;

export class Path {
  constructor(xStart, yStart, xEnd, yEnd, pathObj){
    this.xStart = xStart;
    this.yStart = yStart; 
    this.xEnd = xEnd; 
    this.yEnd = yEnd;
    this.xChange = Math.abs(xEnd - xStart);
    this.yChange = Math.abs(yEnd - yStart);

    this.slope = (yEnd - yStart)/(xEnd - xStart);
    this.yIntercept = yStart - (this.slope * xStart);

    this.a = yStart - yEnd;
    this.b = xEnd - xStart; 
    this.c = (yStart * (xStart - xEnd)) + (xStart * (yEnd - yStart));

    this.length = Math.sqrt( ((xEnd-xStart)**2) + ((yEnd-yStart)**2)) //distance 
  }
}