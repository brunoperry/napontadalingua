import Gallery from "./components/Gallery.js";
import Header from "./components/Header.js";

window.onload = async () => {
  const header = new Header();
  const gallery = new Gallery({
    view: document.querySelector(".gallery"),
  });

  window.onscroll = () => {
    header.update("scroll");
  };
  window.onresize = () => {
    header.update("resize");
  };
};
