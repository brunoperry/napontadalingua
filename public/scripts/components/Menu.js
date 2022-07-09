import Component from "./Component.js";
import Logo from "./Logo.js";

export default class Menu extends Component {
  constructor(view) {
    super(view);
    const logo = new Logo(this.querySelector(".logo"));

    const btn = this.element.querySelectorAll("a")[1];

    btn.onclick = () => {
      logo.isRunning ? logo.stop() : logo.start();
      console.log("isrunning", logo.isRunning);
    };
  }
}
