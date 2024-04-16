import { FlameSystem } from "./ParticleSystem.js";
import Utils from "../Utils.js";
import { SVG } from "./SVG.js";

export default class Logo extends SVG {
  #flameSystem;
  #hairElements = [];
  #emitter;
  #levelOfDetail = 1;
  constructor(view) {
    super(view);

    this.#emitter = this.view.querySelector("#hair");
    for (let i = 0; i < this.#emitter.children.length; i++) {
      this.#hairElements.push(i);
    }
    this.#hairElements = Array.prototype.shuffle(this.#hairElements);
    this.#flameSystem = new FlameSystem({
      view: this.#emitter,
      particleElems: Utils.getChildren(this.#emitter),
      direction: -42,
    });
  }

  stop() {
    if (!this.isRunning) return;
    cancelAnimationFrame(this.animID);
    this.animID = null;
    this.#flameSystem.stop();
    this.isRunning = false;
  }
  start() {
    if (this.isRunning) return;
    // this.#flameSystem.start();
    // this.#draw();
    this.isRunning = true;
  }
  #draw() {
    this.#flameSystem.onUpdate();
    this.animID = requestAnimationFrame(() => this.#draw());
  }

  onresize() {
    if (window.innerWidth < 956) {
      this.lod = 3;
    } else {
      this.lod = 1;
    }
  }

  set lod(val) {
    if (val === this.#levelOfDetail) return;
    this.#levelOfDetail = val;
    const children = this.#emitter.children;
    for (let i = 0; i < this.#hairElements.length; i++) {
      let sVal = val === 1 ? "scale(1)" : "scale(0.9)";
      children[this.#hairElements[i]].style.transform = sVal;
    }
    if (val === 1) return;
    for (let i = 0; i < this.#hairElements.length; i += val) {
      children[this.#hairElements[i]].style.transform = "scale(1.1)";
    }
  }
  get lod() {
    return this.#levelOfDetail;
  }
}
