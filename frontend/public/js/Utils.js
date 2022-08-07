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
  static randomBetween(min, max) {
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

  static getDistance(from, to) {
    return Math.abs(
      Math.sqrt(
        (to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y)
      )
    );
  }

  static BestCandidate(numPoints, w, h) {
    let out = [];

    const NUM_SAMPLES = 10;
    const NUM_POINTS = numPoints;
    const WIDTH = w;
    const HEIGHT = h;

    let activeCandidateX = [];
    let activeCandidateY = [];

    const findClosestPoint = (rX, rY) => {
      let closestPoint = [];
      let closestDistance = Infinity;
      for (let i = 0; i < activeCandidateX.length; i++) {
        const distance = this.getDistance(
          { x: rX, y: rY },
          { x: activeCandidateX[i], y: activeCandidateY[i] }
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestPoint[0] = activeCandidateX[i];
          closestPoint[1] = activeCandidateY[i];
        }
      }

      return closestPoint;
    };

    const getBestCandidate = () => {
      let bestDistance = 0;
      let bestCandidateX, bestCandidateY;
      for (let i = 0; i < NUM_SAMPLES; i++) {
        const candidateX = parseInt(Math.random() * WIDTH);
        const candidateY = parseInt(Math.random() * HEIGHT);
        const closestPoint = findClosestPoint(candidateX, candidateY);
        const distance = this.getDistance(
          { x: closestPoint[0], y: closestPoint[1] },
          { x: candidateX, y: candidateY }
        );
        if (distance > bestDistance) {
          bestDistance = distance;
          bestCandidateX = candidateX;
          bestCandidateY = candidateY;
        }
      }
      return [bestCandidateX, bestCandidateY];
    };

    const rX = parseInt(Math.random() * WIDTH);
    const rY = parseInt(Math.random() * HEIGHT);

    out.push(new PVector(rX, rY));
    activeCandidateX.push(rX);
    activeCandidateY.push(rY);

    for (let i = 1; i < NUM_POINTS; i++) {
      const bestCandidate = getBestCandidate();
      activeCandidateX.push(bestCandidate[0]);
      activeCandidateY.push(bestCandidate[1]);
      out.push(new PVector(bestCandidate[0], bestCandidate[1]));
    }

    return out;
  }

  static getTemplate(name) {
    return document.querySelector(`#${name}-template`).content.cloneNode(true)
      .children;
  }
}

export default Utils;
