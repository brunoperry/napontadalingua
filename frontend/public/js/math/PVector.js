export default class PVector {
  x;
  y;
  z;
  w;
  constructor(x = 0.0, y = 0.0, z = 0.0, w = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  //OPERATORS
  addVec(vec) {
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    this.z = this.z + vec.z;
    this.w = this.w + vec.w;
  }
  mulVec(vec) {
    this.x = this.x * vec.x;
    this.y = this.y * vec.y;
    this.z = this.z * vec.z;
    this.w = this.w * vec.w;
  }

  addNum(num) {
    this.x = this.x + num;
    this.y = this.y + num;
    this.z = this.z + num;
    this.w = this.w + num;
  }
  mulNum(num) {
    this.x = this.x * num;
    this.y = this.y * num;
    this.z = this.z * num;
    this.w = this.w * num;
  }

  get(asArray = false) {
    if (asArray) return [this.x, this.y, this.z, this.w];
    return new PVector(this.x, this.y, this.z, this.w);
  }
}
