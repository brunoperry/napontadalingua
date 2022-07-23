import PVector from "../math/PVector.js";
import Utils from "../Utils.js";
import Component from "./Component.js";
import { SVG } from "./SVG.js";

export default class Logo extends SVG {
  #hair = [];
  isRunning = false;

  constructor(view) {
    super(view);

    const hairGroup = this.querySelector("#hair").querySelectorAll("path");
    hairGroup.forEach((hair) => {
      this.#hair.push(
        new Particle({
          view: hair,
          scale: new PVector(),
        })
      );
    });

    this.start();
  }

  stop() {
    if (!this.isRunning) return;
    cancelAnimationFrame(this.animID);
    this.animID = null;
    this.isRunning = false;
  }
  start() {
    if (this.isRunning) return;
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

//FX
class Particle extends Component {
  #speed = Utils.randomBetween(0.01, 0.1);
  #delta = 0;

  timeoutID = null;

  constructor({ view }) {
    super(view);
  }

  run() {
    this.#update();
    this.#delta++;
  }

  #update() {
    const value = Math.abs(Math.sin(this.#delta * this.#speed));

    if (value < 0.3) return;
    this.scale(value);
  }
}
