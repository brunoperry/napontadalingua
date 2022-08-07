export default class NPDLImage {
  #pixels;
  constructor(w, h) {
    this.w = w;
    this.h = h;

    this.#pixels = new Array(w, h);
  }

  getPixel(x, y) {
    return this.#pixels[x * y];
  }

  set data(values) {
    this.#pixels = values;
  }
  get data() {
    return this.#pixels;
  }
}
