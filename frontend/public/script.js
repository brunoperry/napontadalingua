import Gallery from "./components/Gallery.js";
import Header from "./components/Header.js";

window.onload = async () => {
  new Header();
  new Gallery({
    view: document.querySelector(".gallery"),
  });
};
