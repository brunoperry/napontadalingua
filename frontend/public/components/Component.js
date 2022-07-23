export default class Component {
  #view = null;
  animID = null;
  constructor(view) {
    this.elem = view;
  }

  querySelector(q) {
    return this.#view.querySelector(q);
  }
  querySelectorAll(q) {
    return this.#view.querySelectorAll(q);
  }

  appendChild(elem) {
    this.#view.appendChild(elem);
  }

  addEventListener(type, ev) {
    this.#view.addEventListener(type, ev);
  }

  /********************
   *TRANSFORMS
   ********************/
  translate(pos) {}
  scale(value) {
    this.transform = `scale(${value})`;
  }
  rotate(angle) {}

  /********************
   * GETTERS / SETTERS
   ********************/
  set elem(view) {
    this.#view = view;
  }
  get elem() {
    return this.#view;
  }

  set transform(value) {
    this.#view.style.transform = value;
  }
  get transform() {
    return this.#view.style.transform;
  }

  set opacity(val) {
    this.#view.style.opacity = val;
  }
  get opacity() {
    return this.#view.opacity;
  }

  get style() {
    return this.#view.style;
  }
  set style(stl) {
    this.#view.style[stl[0]] = stl[1];
  }

  set pointerEvents(val) {
    this.#view.style.pointerEvents = val;
  }
  get pointerEvents() {
    return this.#view.pointerEvents;
  }

  get parent() {
    return this.#view.parentElement;
  }

  set x(val) {
    this.#view.offsetLeft = val;
  }
  get x() {
    return this.#view.offsetLeft;
  }

  set y(val) {
    this.#view.style.transform = `translateY(${val}px)`;
  }
  get y() {
    return this.#view.offsetTop;
  }
}
