export default class Component {
  #view = null;
  animID = null;
  constructor(view) {
    this.#view = view;
  }

  querySelector(elemID) {
    return this.element.querySelector(elemID);
  }
  display(attr) {
    this.element.style.display = attr;
  }
  opacity(value) {}

  set element(view) {
    this.#view = view;
  }
  get element() {
    return this.#view;
  }

  get display() {
    return this.element.style.display;
  }
  set display(value) {
    console.log(value);
    this.element.style.display = value;
  }

  get opacity() {
    return this.element.style.opacity;
  }
  set opacity(value) {
    this.element.style.opacity = value;
  }

  translate(vec) {
    this.transform(`translate3D(${vec.x}px, ${vec.y}px, ${vec.z}px)`);
  }
  rotate(angle) {}
  scale(value) {
    this.transform(`scale3d(${value.x},${value.x},${value.x})`);
  }
  transform(transf) {
    this.element.style.transform = transf;
  }
}
