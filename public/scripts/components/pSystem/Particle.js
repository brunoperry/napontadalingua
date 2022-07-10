import Component from "../Component.js";

export default class Particle extends Component {
  constructor({ view, pos }) {
    super(view);

    this.x = pos.x;
    this.y = pos.y;
  }
}

// import PVector from "../../math/PVector.js";
// import Component from "../Component.js";

// export default class Particle extends Component {
//   #speed = randomBetween(0.02, 0.01);
//   #delta = 90;
//   #scaleVec = new PVector();

//   constructor({ view, mMs }) {
//     super(view);
//     this.#speed = randomBetween(mMs[0], mMs[1]);
//   }

//   reset() {}

//   run() {
//     this.#delta++;
//     this.#update();
//     this.#display();
//   }

//   #update() {
//     const value = Math.abs(Math.sin(this.#delta * this.#speed));
//     this.#scaleVec.x = this.#scaleVec.y = value;
//   }
//   #display() {
//     const val = this.#scaleVec.x;
//     const query = `scale(${val}) rotate(${this.#delta}deg)`;
//     this.transform(query);
//     // this.scale(this.#scaleVec);
//   }
// }

// //PROTOTYPES
Object.prototype.randomBetween = (min, max) => {
  return Math.random() * (max - min) + min;
};
