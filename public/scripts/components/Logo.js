import PVector from "../PVector.js";
import Component from "./Component.js";
import Particle from "./Particle.js";

export default class Logo extends Component {
  #face;
  #hair = [];

  isRunning = false;
  constructor(view) {
    super(view);

    this.#face = this.querySelector("#face");

    const hairGroup = this.querySelector("#hair").querySelectorAll("path");
    hairGroup.forEach((elem) => {
      this.#hair.push(
        new Particle({
          view: elem,
          scale: new PVector(0, 0),
          mMs: [0.01, 0.02],
        })
      );
    });
  }

  stop() {
    if (!this.animID) return;
    cancelAnimationFrame(this.animID);
    this.animID = null;
    this.isRunning = false;
  }
  start() {
    this.draw();
    this.isRunning = true;
  }

  draw() {
    this.#hair.forEach((h) => {
      h.run();
    });
    this.animID = requestAnimationFrame(() => this.draw());
  }
}
