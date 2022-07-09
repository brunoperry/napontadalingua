import PVector from "../PVector.js";

class Component {
  #view = null;
  animID = null;
  constructor(view) {
    this.#view = view;
  }

  querySelector(elemID) {
    return this.element.querySelector(elemID);
  }
  display(attr) {
    this.element.style.display = attr;
  }
  opacity(value) {}

  set element(view) {
    this.#view = view;
  }
  get element() {
    return this.#view;
  }

  get display() {
    return this.element.style.display;
  }
  set display(value) {
    console.log(value);
    this.element.style.display = value;
  }

  get opacity() {
    return this.element.style.opacity;
  }
  set opacity(value) {
    this.element.style.opacity = value;
  }

  translate(vec) {
    this.#doTransform(`translate3D(${vec.x}px, ${vec.y}px, ${vec.z}px)`);
  }
  rotate(angle) {}
  scale(value) {
    this.#doTransform(`scale(${value.x})`);
  }
  #doTransform(transf) {
    this.element.style.transform = transf;
  }
}

export class Menu extends Component {
  constructor(view) {
    super(view);
    const logo = new Logo(this.querySelector(".logo-container"));

    const btn = this.element.querySelectorAll("a")[1];

    btn.onclick = () => {
      logo.isRunning ? logo.stop() : logo.start();
      console.log("isrunning", logo.isRunning);
    };
  }
}

export class Hero extends Component {
  constructor(view) {
    super(view);
  }
}

export class Logo extends Component {
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
        })
      );
    });

    // this.#hair.push(new Particle({ view: hairGroup[1] }));
    // console.log(this.#hair.length);

    // window.onscroll = (e) => {
    //   const t = document.scrollTop;
    // };
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

//FX
class Particle extends Component {
  #speed = randomBetween(0.001, 0.00001);

  #delta = 0;
  #scaleVec = new PVector();

  constructor({ view }) {
    super(view);
    console.log(this.#speed);
  }

  run() {
    this.#update();
    this.#display();
    this.#delta++;
  }

  #update() {
    const value = Math.abs(Math.sin(this.#delta * this.#speed));

    console.log(value);
    this.#scaleVec = new PVector(value, value);
  }
  #display() {
    this.scale(this.#scaleVec);
  }
}

//PROTOTYPES
Object.prototype.randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
