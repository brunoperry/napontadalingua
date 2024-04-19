class Hair {
  #elem;
  #speed;
  constructor(elem) {
    this.#elem = elem;
    this.#speed = Math.random() * 0.5 + 0.1;

    const bbox = elem.getBBox();
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    elem.style.transformOrigin = `${cx}px ${cy}px`;
  }

  update(delta) {
    let val = 0.85 + 0.35 * Math.sin(this.#speed * delta);
    this.#elem.style.transform = `scale(${val})`;
  }
}

class NPLMenu extends HTMLElement {
  #lastScrollYPos;
  #isHidden = false;
  #THRESHOLD = 20;

  #logoHair = [];
  #animID = null;
  constructor() {
    super();

    const elems = Array.from(this.querySelector("#hair").children);
    elems.forEach((elem) => {
      this.#logoHair.push(new Hair(elem));
    });

    this.#playLogoAnim();
    window.addEventListener("blur", () => this.#stopLogoAnim());
    window.addEventListener("focus", () => this.#playLogoAnim());
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
    this.#playLogoAnim();
  }
  hide() {
    this.style.transform = `translateY(-100%)`;
    this.#isHidden = true;
    this.#stopLogoAnim();
  }

  #playLogoAnim() {
    if (this.#isHidden) return;
    this.#animID = requestAnimationFrame(() => this.#playLogoAnim());
    this.#logoHair.forEach((hair) => {
      hair.update(performance.now() / 100);
    });

    console.log("playLogoAnim");
  }
  #stopLogoAnim() {
    if (this.#animID) cancelAnimationFrame(this.#animID);
    this.#animID = null;
    console.log("stopLogoAnim");
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
