import Component from "./Component.js";

export default class Gallery extends Component {
  #items = [];
  #currentItemIndex = 0;
  constructor(data) {
    super(data.view);

    const res = this.elem.querySelectorAll(".image-item");

    res.forEach((itm) => {
      this.#items.push(new Component(itm));
    });
    this.#crossFade();
  }

  #crossFade() {
    this.#items[this.#currentItemIndex].opacity = 1;
    this.animID = setInterval(() => {
      this.#items[this.#currentItemIndex].opacity = 0;
      this.#currentItemIndex++;
      if (this.#currentItemIndex >= this.#items.length)
        this.#currentItemIndex = 0;
      this.#items[this.#currentItemIndex].opacity = 1;
    }, 6000);
  }
}
