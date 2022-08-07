import Component from "../components/Component.js";
import Utils from "../Utils.js";
import PVector from "./PVector.js";

export class ParticleSystem extends Component {
  #particleElems;
  #particles = [];
  #intervalID = null;
  constructor(view, particles = []) {
    super(view);
    this.#particleElems = particles;
  }

  start() {
    if (this.#intervalID) return;
    this.#intervalID = setInterval(
      () => this.addParticle(),
      parseInt(Utils.randomBetween(100, 1000))
    );
  }

  stop() {
    if (!this.#intervalID) return;
    clearInterval(this.#intervalID);
    this.#intervalID = null;
  }

  addParticle() {
    const rdm = parseInt(
      Utils.randomBetween(0, this.#particleElems.length - 1)
    );
    const p = this.#particleElems[rdm].cloneNode(true);
    this.appendChild(p);
    this.#particles.push(new Particle(p));
  }

  run() {
    for (let i = this.#particles.length - 1; i >= 0; i--) {
      const p = this.#particles[i];
      p.update();
      if (p.isDead()) {
        this.#particles.splice(i, 1);
        this.removeChild(p.elem);
      }
    }
  }
}

class Particle extends Component {
  #timeToLive = parseInt(Utils.randomBetween(30, 50));
  #forceThreshold = Utils.randomBetween(-0.0003, -0.005);

  #position;
  #rotation;
  #scale;
  #velocity;
  #acceleration;
  constructor(view) {
    super(view);

    this.#acceleration = new PVector(0, Utils.randomBetween(-0.01, -0.05));
    this.#velocity = new PVector();
    this.#position = new PVector();
    this.#rotation = -40;
    this.#scale = 1;

    this.Translate(this.#position);
  }

  update() {
    this.#velocity.addVec(this.#acceleration);
    this.#position.addVec(this.#velocity);
    this.#position.addVec(
      new PVector(Math.sin(this.#timeToLive * this.#forceThreshold))
    );
    this.#timeToLive -= 2;

    this.opacity = this.#scale = this.#timeToLive * 0.02;

    this.Rotate(this.#rotation);
    this.Translate(this.#position);
    this.Scale(this.#scale);
  }

  isDead() {
    return this.#timeToLive < 0;
  }
}
