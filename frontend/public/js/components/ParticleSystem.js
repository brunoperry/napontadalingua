import Component from "./Component.js";
import Utils from "../Utils.js";
import PVector from "../math/PVector.js";

class ParticleSystem extends Component {
  particles = [];
  #intervalID = null;
  #ratio;
  $tick = 0;
  constructor({ view, ratio, hideEmitter }) {
    super(view);
    ratio ? (this.#ratio = ratio) : (ratio = 100);

    if (hideEmitter) {
      for (let i = 0; i < view.children.length; i++) {
        view.children[i].style.opacity = 0.5;
      }
    }
  }

  start(emit = this.addParticle) {
    if (this.#intervalID) return;
    this.#intervalID = setInterval(() => emit(), this.#ratio);
  }

  stop() {
    if (!this.#intervalID) return;
    clearInterval(this.#intervalID);
    this.#intervalID = null;
  }

  addParticle(p) {
    if (!p) return;
    this.appendChild(p.view);
    this.particles.push(p);
  }
  removeParticle(p, index = null) {
    if (!p) return;
    this.particles.splice(index, 1);
    this.removeChild(p.view);
  }

  onUpdate(overrided = false) {
    super.onUpdate();

    if (overrided) return;

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.onUpdate();
      if (p.isDead()) {
        this.removeParticle(p, i);
      }
    }
  }
}
export class FlameSystem extends ParticleSystem {
  #particlesSVG = [];
  #emitters = [];
  #direction;
  constructor({ view, particleElems, hideEmitter, direction = 0 }) {
    super({ view, hideEmitter });
    particleElems
      ? (this.#particlesSVG = particleElems)
      : (this.#particlesSVG = Utils.getChildren(view));

    this.#direction = direction;

    for (let i = 0; i < this.#particlesSVG.length; i++)
      this.#emitters.push(
        new ParticleSystem({
          view: view,
          ratio: Utils.randomBetween(300, 1000),
          hideEmitter: hideEmitter,
        })
      );
  }

  stop() {
    this.#emitters.forEach((ps) => ps.stop());
  }

  start() {
    this.#emitters.forEach((ps, index) =>
      ps.start(() => this.emitParticle(index))
    );
  }

  onUpdate() {
    this.#emitters.forEach((ps) => ps.onUpdate());
    super.onUpdate();
  }

  emitParticle(i) {
    this.#emitters[i].addParticle(
      new Particle({
        view: Utils.getRandomElement(this.#particlesSVG),
        ttl: parseInt(Utils.randomBetween(30, 60)),
        dir: this.#direction,
        rot: Utils.randomBetween(-1, 1, true),
      })
    );
  }
}
export class SparkSystem extends ParticleSystem {
  #particlesSVG;
  #MAX_PARTICLES;

  #tick = 0;
  constructor({ view, ratio, hideEmitter, particleElems, maxParticles = 200 }) {
    super({ view, ratio, hideEmitter });
    this.#particlesSVG = particleElems;
    this.#MAX_PARTICLES = maxParticles;

    if (hideEmitter) view.innerHTML = "";
  }

  start() {
    for (let i = 0; i < this.#MAX_PARTICLES; i++) {
      this.addParticle(
        new SparkParticle({
          view: Utils.getRandomElement(this.#particlesSVG),
          ttl: Utils.randomBetween(10, 50),
          dir: Utils.randomBetween(270, 360),
          rot: 10,
          scl: 2,
          accl: new PVector(0, 2),
        })
      );
    }
  }

  onUpdate() {
    this.particles.forEach((p) => {
      if (!p.isDead()) p.onUpdate();

      this.#tick++;
      p.moveTo(20, this.#tick);
    });
    super.onUpdate(true);
  }
}

class Particle extends Component {
  #timeToLive;
  #lifetime;

  #direction;
  #pos;
  #rot;
  #scl;

  #velocity;
  #acceleration;
  constructor({
    view,
    dir = 0,
    pos = new PVector(0, 1, 0),
    rot = 0,
    scl = 1,
    vel = new PVector(),
    accl = new PVector(0, -0.1),
    ttl = 10,
  }) {
    super(view);

    this.#direction = dir;
    this.#pos = pos;
    this.#rot = rot;
    this.#scl = scl;

    this.#velocity = vel;
    this.#acceleration = accl;
    this.#timeToLive = ttl;
    this.#lifetime = ttl;
  }

  onUpdate() {
    // this.alpha =
    // this.#scl = this.#timeToLive / this.#lifetime + 1;

    this.#velocity.addVec(this.#acceleration);
    this.#pos.addVec(this.#velocity);
    this.#rot *= 1;

    //local
    this.rotate(this.#rot);

    //world
    this.translate(this.#pos, false);
    this.rotate(this.#direction, false);
    this.scale(this.#scl, false);

    this.#timeToLive -= 2;

    super.onUpdate();
  }

  isDead() {
    return this.#timeToLive < 0;
  }
}
class SparkParticle extends Particle {
  constructor(data) {
    super(data);
  }

  moveTo(destination, timeElapsed) {
    const lerp = Math.smoothstep(0, destination, timeElapsed);
    console.log(lerp);
  }
}
