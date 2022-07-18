import Component from "./Component.js";
import SPEED from "../Utils.js";

export default class Gallery extends Component {
  #items = [];
  #currentItemIndex = 0;
  constructor(data) {
    super(data.view);
    const itms = this.querySelectorAll(".item");
    itms.forEach((itm) => {
      this.#items.push(new Component(itm));
    });

    this.#items[this.#currentItemIndex].opacity = 1;
    setInterval(() => {
      this.#items[this.#currentItemIndex].opacity = 0;
      this.#currentItemIndex++;
      if (this.#currentItemIndex >= this.#items.length)
        this.#currentItemIndex = 0;
      this.#items[this.#currentItemIndex].opacity = 1;
    }, 3000);
  }
}
