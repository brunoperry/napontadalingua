import { PMatrix } from "../math/PMatrix.js";
import PVector from "../math/PVector.js";

export default class Transform {
  #rMatrix;
  #tMatrix;
  #sMatrix;

  #matrix;
  #local = false;

  constructor() {
    this.#tMatrix = new PMatrix();
    this.#rMatrix = new PMatrix();
    this.#sMatrix = new PMatrix();

    this.#matrix = new PMatrix();
  }

  rotate(angle, localOrientation = true) {
    this.#rMatrix.rotateZ(angle);

    localOrientation
      ? (this.#matrix = this.#matrix.mulMM(this.#matrix, this.#rMatrix))
      : (this.#matrix = this.#matrix.mulMM(this.#rMatrix, this.#matrix));
  }
  translate(pos, localOrientation = true) {
    this.#tMatrix.translate(pos);

    localOrientation
      ? (this.#matrix = this.#matrix.mulMM(this.#matrix, this.#tMatrix))
      : (this.#matrix = this.#matrix.mulMM(this.#tMatrix, this.#matrix));
  }
  scale(val) {
    this.#sMatrix.scale(val);
    this.#matrix = this.#matrix.mulMM(this.#matrix, this.#sMatrix);
  }

  get transformMatrix() {
    const out = this.#matrix.get(true);
    this.#matrix = new PMatrix();
    return out;
  }

  set position(pos) {
    this.translate(pos);
  }
  get position() {
    const m = this.#tMatrix.get();
    return new PVector(m[12], m[13], m[14]);
  }

  set rotation(angle) {
    this.rotate(angle);
  }
  get rotation() {
    const m = this.#tMatrix.get();
    return (Math.atan2(m[5], m[0]) * 180) / Math.PI;
  }

  set scaling(val) {
    this.scale(val);
  }
  get scaling() {
    return new PVector(this.#sMatrix[0], this.#sMatrix[6], this.#sMatrix[11]);
  }

  set x(val) {
    this.translate(new PVector(val));
  }
  get x() {
    return this.#tMatrix.get()[12];
  }
  set y(val) {
    this.translate(new PVector(0, val));
  }
  get y() {
    return this.#tMatrix.get()[13];
  }
  set z(val) {
    this.translate(new PVector(0, 0, val));
  }
  get z() {
    return this.#tMatrix.get()[14];
  }

  set localOrientation(val) {
    this.#local = val;
  }
  get localOrientation() {
    return this.#local;
  }
}
