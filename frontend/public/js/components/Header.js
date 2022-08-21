import PVector from "../math/PVector.js";
import Utils, { SPEED } from "../Utils.js";
import Component from "./Component.js";
import Logo from "./Logo.js";
import Menu from "./Menu.js";

export default class Header extends Component {
  #logo = null;
  #menu = null;

  #isHidden = false;
  #isMobile = false;

  #THRESHOLD = 20;
  #lastScrollYPos;

  constructor() {
    super(document.querySelector("header"));

    this.querySelector(".showhide-menu-button").onclick = () => {
      this.#menu.openClose();
    };

    this.#logo = new Logo(this.querySelector(".logo"));
    this.#menu = new Menu(
      this.querySelector(".menu"),
      this.querySelector(".overlay")
    );
  }

  show() {
    this.translate(new PVector());
    this.onUpdate();
    this.#isHidden = false;
    this.#logo.start();
  }
  hide() {
    this.translate(new PVector(0, -this.#logo.height));
    this.onUpdate();
    this.#isHidden = true;
    setTimeout(() => this.#logo.stop(), SPEED);
  }

  update(type) {
    switch (type) {
      case "scroll":
        this.#onScroll();
        break;
      case "resize":
        this.#onResize();
        break;
      case "focus_in":
        this.#logo.start();
        break;
      case "focus_out":
        this.#logo.stop();
        break;
    }
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

  #onResize() {
    this.#logo.onresize();
    let prev = this.#isMobile;
    this.#isMobile = Utils.isMobile();
    if (prev === this.#isMobile) return;
    if (!this.#isMobile && !this.#menu.isOpen) this.#menu.reset();
  }
}
