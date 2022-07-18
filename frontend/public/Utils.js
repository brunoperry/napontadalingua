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

  // static set lockScroll(val) {
  // let b = document.body;
  // if (val) {
  //   b.style.height = "100%";
  //   b.style.overflow = "hidden";
  // } else {
  //   b.style.height = "auto";
  //   b.style.overflow = "auto";
  // }
  // }
}

export default Utils;
