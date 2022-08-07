import Header from "./js/components/Header.js";
import Hero from "./js/sections/Hero.js";

window.onload = async () => {
  const header = new Header();

  const heroSection = new Hero(document.querySelector("#hero"));

  window.onscroll = () => {
    header.update("scroll");
  };
  window.onresize = () => {
    header.update("resize");
    heroSection.onresize();
  };

  window.onblur = () => {
    header.update("focus_out");
    // gallery.stop();
  };

  window.onfocus = () => {
    header.update("focus_in");
    // gallery.start();
  };

  window.onresize();
};
