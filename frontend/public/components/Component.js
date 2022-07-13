export default class Component {
  #view = null;
  constructor(view) {
    this.elem = view;
  }

  querySelector(q) {
    return this.#view.querySelector(q);
  }

  set elem(view) {
    this.#view = view;
  }
  get elem() {
    return this.#view;
  }
}
