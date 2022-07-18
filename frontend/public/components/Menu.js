import Utils from "../Utils.js";
import Component from "./Component.js";

export default class Menu extends Component {
  #isOpen = false;
  #overlay = null;
  constructor(view) {
    super(view);

    this.#overlay = new Component(this.parent.querySelector(".overlay"));
    this.#overlay.addEventListener("click", () => this.openClose());
    const buttons = this.querySelectorAll(".menu-button");
    buttons.forEach((btn) => (btn.onclick = () => this.openClose()));
  }

  openClose() {
    this.#isOpen = !this.#isOpen;
    let tV = "";
    let oV = 0;
    let pE = "none";
    Utils.lockScroll = this.#isOpen;
    if (this.#isOpen) {
      tV = "0";
      oV = 1;
      pE = "initial";
    } else {
      tV = "-100%";
    }
    this.transform = `translateX(${tV})`;
    this.#overlay.opacity = oV;
    this.#overlay.pointerEvents = pE;
  }
}
