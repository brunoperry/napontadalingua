import { SparkSystem } from "./js/components/ParticleSystem.js";
import Utils from "./js/Utils.js";

let ps;
let isRunning = false;
let animID = null;

window.onload = () => {
  const emitter = document.querySelector(".particle-emitter");
  ps = new SparkSystem({
    view: emitter,
    particleElems: Utils.getChildren(emitter),
    hideEmitter: true,
    ratio: 3,
    maxParticles: 30,
  });

  document.querySelector("input").oninput = (e) => {
    console.log(e.target.value / 100);
  };
  document.querySelector("button").onclick = (e) => {
    isRunning = !isRunning;

    let textLabel = "";
    if (isRunning) {
      textLabel = "stop";
      start();
    } else {
      textLabel = "run";
      stop();
    }
    e.target.innerHTML = textLabel;
  };
};
const stop = () => {
  cancelAnimationFrame(animID);
  animID = null;
  ps.stop();
  isRunning = false;
};
const start = () => {
  ps.start();
  draw();
  isRunning = true;
};
const draw = () => {
  ps.onUpdate();
  animID = requestAnimationFrame(() => draw());
};
