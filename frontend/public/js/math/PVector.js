export default class PVector {
  x = 0;
  y = 0;
  z = 0;
  constructor(x = 0.0, y = 0.0, z = 0.0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  addVec(vec) {
    this.x = this.x + vec.x;
    this.y = this.y + vec.y;
    this.z = this.z + vec.z;
  }

  addNum(num) {
    this.x = this.x + num;
    this.y = this.y + num;
    this.z = this.z + num;
  }

  get() {
    return new PVector(this.x, this.y, this.z);
  }
}
