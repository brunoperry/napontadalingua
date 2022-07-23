import Component from "./Component.js";

export class SVG extends Component {
  constructor(view) {
    super(view);
  }

  get fillColor() {
    return this.elem.style.fillColor;
  }
  set fillColor(color) {
    this.elem.style.fillColor = color;
  }
}
