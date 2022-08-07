import { ParticleSystem } from "../math/ParticleSystem.js";
import { SVG } from "./SVG.js";

export default class Logo extends SVG {
  #particlesElems = [];
  #systems = [];

  constructor(view) {
    super(view);

    const containerElement = this.elem.querySelector("#hair");

    const paths = containerElement.children;
    const NUM_PARTICLES = paths.length;
    for (let i = 0; i < NUM_PARTICLES; i++)
      this.#particlesElems.push(paths[i].cloneNode(true));

    for (let i = 0; i < NUM_PARTICLES; i++)
      this.#systems.push(
        new ParticleSystem(containerElement, this.#particlesElems)
      );
    // containerElement.innerHTML = "";
    // this.start();
  }

  stop() {
    if (!this.isRunning) return;
    cancelAnimationFrame(this.animID);
    this.animID = null;
    this.#systems.forEach((ps) => ps.stop());
    this.isRunning = false;
  }
  start() {
    if (this.isRunning) return;
    this.draw();
    this.#systems.forEach((ps) => ps.start());
    this.isRunning = true;
  }
  draw() {
    this.#systems.forEach((ps) => {
      ps.run();
    });

    this.animID = requestAnimationFrame(() => this.draw());
  }
}
