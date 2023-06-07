class Vector2d {
  public x: number;
  public y: number;
  constructor(a:number,b:number){
    this.x = a;
    this.y = b;
  }
  plusEqual(vector:Vector2d){
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  minusEqual(vector:Vector2d){
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  multiEqual(multiplier:number){
    this.x *= multiplier;
    this.y *= multiplier;
    return this;
  }
  

};

export default Vector2d;
