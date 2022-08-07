import Component from "./Component.js";

export default class Gallery extends Component {
  #items = [];
  #currentItem = 0;
  constructor(data) {
    super(data.view);

    const res = this.elem.querySelectorAll(".image-item");

    res.forEach((itm) => {
      this.#items.push(new Component(itm));
    });
    if ("IntersectionObserver" in window) {
      let lazyBackgroundObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              lazyBackgroundObserver.unobserve(entry.target);
            }
          });
        }
      );

      this.#items.forEach(function (lazyBackground) {
        lazyBackgroundObserver.observe(lazyBackground.elem);
      });
    }

    this.#crossFade();
  }

  start() {
    if (this.animID) return;

    this.#items[this.#currentItem].opacity = 1;
    this.animID = setInterval(() => this.#crossFade(), 3000);
  }

  stop() {
    if (!this.animID) return;
    clearInterval(this.animID);
    this.animID = null;
  }

  update(value) {
    switch (value) {
      case "focus_in":
        if (!this.animID) this.start();
        break;
      case "focus_out":
        if (!this.animID) this.stop();
        break;
    }
  }

  #crossFade() {
    this.#items[this.#currentItem].opacity = 0;
    this.#currentItem++;
    if (this.#currentItem >= this.#items.length) this.#currentItem = 0;
    this.#items[this.#currentItem].opacity = 1;
  }
}
