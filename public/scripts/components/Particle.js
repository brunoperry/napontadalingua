import PVector from "../PVector.js";
import Component from "./Component.js";

export default class Particle extends Component {
  #speed = randomBetween(0.02, 0.01);
  #delta = 0;
  #scaleVec = new PVector();

  constructor({ view, mMs }) {
    super(view);
    this.#speed = randomBetween(mMs[0], mMs[1]);
  }

  reset() {}

  run() {
    this.#delta++;
    this.#update();
    this.#display();
  }

  #update() {
    const value = Math.abs(Math.sin(this.#delta * this.#speed));
    this.#scaleVec.x = this.#scaleVec.y = value;
  }
  #display() {
    const val = this.#scaleVec.x;
    const query = `scale(${val}) rotate(${val * 200}deg)`;
    this.transform(query);
    // this.scale(this.#scaleVec);
  }
}

//PROTOTYPES
Object.prototype.randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};
