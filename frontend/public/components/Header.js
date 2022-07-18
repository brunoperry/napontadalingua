import Utils, { MAX_WIDTH } from "../Utils.js";
import Component from "./Component.js";
import Logo from "./Logo.js";
import Menu from "./Menu.js";

export default class Header extends Component {
  #logo = null;
  #nav = null;

  #isHidden = false;
  #isMobile = false;
  constructor() {
    super(document.querySelector("header"));

    this.querySelector(".showhide-menu-button").onclick = () => {
      this.#nav.openClose();
    };
    this.#logo = new Logo(this.querySelector(".logo"));
    this.#nav = new Menu(this.querySelector("nav"));

    let lastScrollPos = window.scrollY;
    const THRESHHOLD = 20;
    window.onscroll = () => {
      const wY = window.scrollY;
      if (lastScrollPos < wY) {
        if (wY - lastScrollPos >= THRESHHOLD && !this.#isHidden) {
          this.transform =
            "translateY(calc(var(--header-height) * -1)) translateX(-50%)";
          this.#isHidden = true;
        }
      } else if (this.#isHidden) {
        this.transform = "translateY(0) translateX(-50%)";
        this.#isHidden = false;
      }
      lastScrollPos = wY;
    };

    window.onresize = () => {
      let prev = this.#isMobile;
      this.#isMobile = Utils.isMobile();
      if (prev === this.#isMobile) return;

      if (!this.#isMobile) {
        const el = this.#nav.querySelector(".networks");
        this.elem.appendChild(el);
      } else {
        const el = this.querySelector(".networks");
        this.#nav.appendChild(el);
      }
    };
    window.onresize();
  }
}
