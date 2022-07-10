import PVector from "../../math/PVector.js";
import Utils from "../../Utils.js";
import Particle from "./Particle.js";

export default class ParticleSystem {
  #rW = 1300;
  #rH = 1300;

  #NUM_PARTICLES = 10;

  #particlesList = ["symbol01", "symbol02", "symbol03", "symbol04"];
  #particles = [];
  #particlesContainer = null;
  constructor(viewContainer) {
    // console.log(viewContainer.children.length);

    this.#particlesContainer = viewContainer;
    this.#particlesContainer.innerHTML = "";
    // const iconsList = ["symbol01", "symbol02", "symbol03", "symbol04"];
    let icons = [];
    for (let i = 0; i < this.#NUM_PARTICLES; i++) {
      icons.push(
        Utils.getIcon(this.#particlesList[Math.floor(randomBetween(0, 3))])
      );
    }

    this.#build();
  }

  #build() {
    const range = Math.max(this.#rW, this.#rH);
    const minDist = 40;

    let needPoints = true;
    while (needPoints) {
      let x = randomBetween(0, range);
      let y = randomBetween(0, range);
      if (x > this.#rW || y > this.#rH) continue;

      const newPoint = new PVector(x, y);
      let tooClose = false;

      this.#particles.forEach((p) => {
        if (Utils.distance(p, newPoint) < minDist) {
          tooClose = true;
          return;
        }
      });

      if (tooClose) continue;

      const view = Utils.getIcon(
        this.#particlesList[Math.floor(randomBetween(0, 3))]
      );
      //   this.#particles.push(new PVector(x, y));

      const p = new Particle({
        view: view,
        pos: new PVector(x, y),
      });

      this.#particles.push(p);

      this.#particlesContainer.appendChild(p.element);

      if (this.#particles.length === this.#NUM_PARTICLES) needPoints = false;
    }
  }
}
