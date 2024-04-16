import Transform from "./Transform.js";

export default class Component extends Transform {
  #elem = null;
  animID = null;

  constructor(view) {
    super();
    this.#elem = view;
  }

  querySelector(q) {
    return this.#elem.querySelector(q);
  }
  querySelectorAll(q) {
    return this.#elem.querySelectorAll(q);
  }

  appendChild(elem) {
    this.#elem.appendChild(elem);
  }
  removeChild(elem) {
    this.#elem.removeChild(elem);
  }

  addEventListener(type, ev) {
    this.#elem.addEventListener(type, ev);
  }

  onUpdate() {
    this.style.transform = this.transformMatrix;
  }

  /********************
   * GETTERS / SETTERS
   ********************/
  set view(elem) {
    this.#elem = elem;
  }
  get view() {
    return this.#elem;
  }

  set alpha(val) {
    this.style.opacity = val;
  }
  get alpha() {
    return this.style.opacity;
  }

  set opacity(val) {
    this.style.opacity = val;
  }
  get opacity() {
    return this.style.opacity;
  }

  get style() {
    return this.#elem.style;
  }
  set style(stl) {
    this.#elem.style[stl[0]] = stl[1];
  }

  get computedStyle() {
    return window.getComputedStyle(this.#elem);
  }

  set pointerEvents(val) {
    this.#elem.style.pointerEvents = val;
  }
  get pointerEvents() {
    return this.#elem.pointerEvents;
  }

  get parent() {
    return this.#elem.parentElement;
  }

  set width(val) {
    this.#elem.style.width = val;
  }
  get width() {
    return this.elem;
  }

  set height(val) {
    this.#elem.style.height = val;
  }
  get height() {
    return this.#elem.offsetHeight;
  }

  set transform(val) {
    this.style.transform = val;
  }
  get transform() {
    return this.style.transform;
  }
}
