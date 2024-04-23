class NPLBackground extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const particleElems = Array.from(this.querySelectorAll("svg"));
    console.log(particleElems);

    setTimeout(() => {
      const particleElems = Array.from(this.querySelectorAll("svg"));
      console.log(particleElems);
      particleElems.forEach((svg) => {
        this.appendChild(new Particle(svg, this.offsetHeight).view);
      });
    }, 1);
  }
}
customElements.define("npl-background", NPLBackground);

class Particle {
  view;
  constructor(elem, height) {
    this.view = elem;
    console.log(height);

    // Set the transform origin to the center
    elem.style.transformOrigin = "center";

    // Apply the transformations
    elem.style.transform = `translate(${Math.random() * 100}vw, ${
      Math.random() * height
    }px) scale(${2 + Math.random() * 10})`;
  }
}
