import Gallery from "../components/Gallery.js";
import Section from "./Section.js";

export default class Hero extends Section {
  constructor(view) {
    super(view);
    const gallery = new Gallery({
      view: view.querySelector(".gallery"),
    });
  }

  onresize() {
    super.onresize();
    this.height = `${window.innerHeight}px`;
  }
}
