import PVector from "./math/PVector.js";

export const SPEED = getComputedStyle(
  document.documentElement
).getPropertyValue("--speed");

export const MAX_WIDTH = parseInt(
  getComputedStyle(document.documentElement)
    .getPropertyValue("--max-width")
    .replace("px", "")
);

class Utils {
  static isMobile() {
    return window.innerWidth < 800;
  }
  static randomBetween(min, max, posNeg = false) {
    if (posNeg)
      return (
        Math.ceil(Math.random() * max + min) *
        (Math.round(Math.random()) ? 1 : -1)
      );

    return Math.random() * max + min;
  }
  static genView(from, what) {
    const template = document
      .querySelector(`#${from}-templates`)
      .content.cloneNode(true);
    return template.querySelector(`.${what}-item`);
  }
  static loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener("load", resolve);
      image.addEventListener("error", reject);
      image.src = src;
    });
  }

  static parseMatrix(matString) {
    let out = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    const res = matString
      .replace(/[a-zA-Z]+\(/i, "")
      .replace(")", "")
      .split(", ");

    if (res.length <= 6) return out;
    res.forEach((x, index) => (out[index] = parseFloat(x)));
    return out;
  }

  static getDistance(from, to) {
    return Math.abs(
      Math.sqrt(
        (to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y)
      )
    );
  }

  static getTemplate(name) {
    return document.querySelector(`#${name}-template`).content.cloneNode(true)
      .children;
  }

  static getChildren(fromElem) {
    let out = [];
    for (let i = 0; i < fromElem.children.length; i++) {
      out.push(fromElem.children[i].cloneNode(true));
    }
    return out;
  }

  static getRandomElement(from) {
    return from[parseInt(this.randomBetween(0, from.length - 1))].cloneNode(
      true
    );
  }
}

Math.lerp = (start, end, timeElapsed) => {
  return start * (1 - timeElapsed) + end * timeElapsed;
};

Array.prototype.shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

Math.smoothstep = (start, end, x) => {
  if (x < start) return 0;
  if (x >= end) return 1;

  // Scale/bias into [0..1] range
  x = (x - start) / (end - start);

  return x * x * (3 - 2 * x);
};

export default Utils;
