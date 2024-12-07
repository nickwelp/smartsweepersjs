class Vector2d {
  public x: number;
  public y: number;
  constructor(a:number,b:number){
    this.x = a;
    this.y = b;
  }
  add(vector:Vector2d){
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  subtract(vector:Vector2d){
    if(!vector){
      return this;
    }
    this.x -= vector.x;
    this.y -= vector.y;
    return this;
  }
  multiply(multiplier:number){
    this.x *= multiplier;
    this.y *= multiplier;
    return this;
  }
  divide(divisor:number){
    this.x /= divisor;
    this.y /= divisor;
    return this;
  }
  // also called length of a 2d vector, 
  // hypotenuse of a right triangle
  magnitude(){
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }
  normalize(){
    return this.divide(this.magnitude());
  }
  static dot(vector1:Vector2d,vector2:Vector2d){
    return vector1.x*vector2.x + vector1.y*vector2.y;
  }
  static sign(vector1:Vector2d,vector2:Vector2d){
    if(vector1.y*vector2.x > vector1.x*vector2.y){
      return 1;
    } else {
      return -1;
    }
  }
  public length(v:Vector2d): number{
    return Math.sqrt(v.x*v.x + v.y*v.y);
  }
};

export default Vector2d;
