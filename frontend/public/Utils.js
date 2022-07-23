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
}

export default Utils;
