import Component from "./Component.js";
import Logo from "./Logo.js";
import Menu from "./Menu.js";

export default class Header extends Component {
  #logo = null;
  #nav = null;
  #networks = null;
  #menu = null;

  #isHidden = false;
  constructor() {
    super(document.querySelector("header"));

    this.querySelector(".menu-button").onclick = () => {
      this.#menu.openClose();
    };

    this.#logo = new Logo(this.querySelector(".logo"));
    this.#menu = new Menu(this.querySelector(".menu"));
    this.#networks = new Component(this.querySelector(".networks"));

    let lastScrollPos = window.scrollY;
    const THRESHHOLD = 15;
    window.onscroll = () => {
      const wY = window.scrollY;
      if (lastScrollPos < wY) {
        if (wY - lastScrollPos >= THRESHHOLD && !this.#isHidden) {
          this.transform = "translateY(-100%)";
          this.#isHidden = true;
        }
      } else if (this.#isHidden) {
        this.transform = "translateY(0)";
        this.#isHidden = false;
      }
      lastScrollPos = wY;
    };
  }
}
