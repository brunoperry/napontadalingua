class Hair {
  constructor(elem) {
    elem.style.animationDuration = `${Math.random() * 2 + 0.2}s`;
    elem.style.animationDelay = `${Math.random() * 2 + 0.2}s`;

    const bbox = elem.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    elem.style.transformOrigin = `${cx}px ${cy}px`;
  }
}

class NPLMenu extends HTMLElement {
  #lastScrollYPos;
  #isHidden = false;
  #THRESHOLD = 20;

  constructor() {
    super();

    const elems = Array.from(this.querySelector("#hair").children);
    elems.forEach((elem) => {
      new Hair(elem);
    });
  }

  connectedCallback() {
    document.addEventListener("scroll", () => this.#onScroll());
  }

  #onScroll() {
    const wY = window.scrollY;
    if (this.#lastScrollYPos < wY) {
      if (wY - this.#lastScrollYPos >= this.#THRESHOLD && !this.#isHidden) {
        this.hide();
      }
    } else if (this.#isHidden) this.show();
    this.#lastScrollYPos = wY;
  }

  show() {
    this.style.transform = `translateY(0)`;
    this.#isHidden = false;
  }
  hide() {
    this.style.transform = `translateY(-100%)`;
    this.#isHidden = true;
  }
}
customElements.define("npl-menu", NPLMenu);

class NPLGallery extends HTMLElement {
  #items;
  #currentItem = 0;
  #intervalID = null;
  #timming = 3000;
  constructor() {
    super();
  }

  connectedCallback() {
    this.#items = this.querySelectorAll(".item");
    this.#items[this.#currentItem].style.opacity = 1;

    this.#timming = this.getAttribute("interval");

    this.play();
  }

  play() {
    if (this.#intervalID) return;

    this.#intervalID = setInterval(() => {
      this.#items[this.#currentItem].style.opacity = 0;
      this.#currentItem = (this.#currentItem + 1) % this.#items.length;
      this.#items[this.#currentItem].style.opacity = 1;
    }, this.#timming);
  }
  stop() {
    if (!this.#intervalID) return;
    clearInterval(this.#intervalID);
    this.#intervalID = null;
  }
}
customElements.define("npl-gallery", NPLGallery);
