import Component from "./Component.js";
import Logo from "./Logo.js";

export default class Header extends Component {
  #logo = null;
  constructor() {
    super(document.querySelector("header"));

    this.#logo = new Logo(this.querySelector(".logo"));
  }
}
