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
}

export default Utils;
