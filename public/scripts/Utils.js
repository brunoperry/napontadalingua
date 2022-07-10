export default class Utils {
  static distance(a, b) {
    return Math.sqrt(b.x - a.x + (b.y - a.y));
  }
  static getIcon(name) {
    const iconsTemplate = document.querySelector("#icons").content;

    let ico = iconsTemplate.querySelector(`.icon-${name}`);
    return ico.cloneNode(true);

    // var targetContainer = document.querySelector('#container');
    // targetContainer.appendChild(document.importNode(content, true));

    // var $span = $(targetContainer).find("div:last-of-type").find("span");
    // $span.text(parseInt($span.text() + 1));
  }
}
