import Gallery from "./components/Gallery.js";
import Header from "./components/Header.js";

window.onload = async () => {
  // const uiData = await fetch("ui");
  // const res = await uiData.json();

  new Header();

  new Gallery({
    view: document.querySelector(".gallery"),
  });

  // new Menu(document.querySelector("#menu"));

  // new Gallery(document.querySelector("#home .gallery"));
};

// const openCloseMenu = () => {
//   const navElem = document.querySelector("header").querySelector("nav");
//   navElem.getBoundingClientRect().x < 0
//     ? (navElem.style.transform = "translateX(0)")
//     : (navElem.style.transform = "translateX(-100%)");
// };

// class Menu {
//   #nav;
//   #logo;
//   #networks;
//   #menuButton;
//   #overlay;

//   #MAX_WIDTH = 900;
//   constructor(view) {
//     this.#menuButton = view.querySelector("button");
//     this.#menuButton.onclick = () => this.openClose();
//     this.#nav = view.querySelector("nav");
//     this.#logo = view.querySelector(".logo");
//     this.#networks = view.querySelector(".networks");
//     this.#overlay = view.querySelector(".overlay");

//     window.onresize = () => {
//       const w = window.innerWidth;
//       if (w <= this.#MAX_WIDTH) {
//         this.#nav.className = "mobile";
//         this.#menuButton.style.display = "initial";
//       } else {
//         this.#menuButton.style.display = "none";
//         this.#overlay.style.opacity = 0;
//         this.#nav.style.transform = "translateX(0)";
//         this.#nav.className = "";
//       }
//     };

//     window.onresize();
//   }

//   openClose() {
//     if (this.#nav.getBoundingClientRect().x < 0) {
//       this.#overlay.style.opacity = 0.5;
//       this.#nav.style.transform = "translateX(0)";
//     } else {
//       this.#overlay.style.opacity = 0;
//       this.#nav.style.transform = "translateX(-100%)";
//     }
//   }
// }

// class Gallery {
//   #items = [];
//   currentItem = 0;
//   #animID = null;
//   constructor(view, type = Gallery.Types.SLIDE_SHOW) {
//     this.#items = view.querySelectorAll(".item");
//     this.#items.forEach((itm, index) => {
//       if (index !== this.currentItem) itm.style.opacity = 0;
//     });

//     switch (type) {
//       case Gallery.Types.SLIDE_SHOW:
//         this.#doSlideShow();
//         break;
//       default:
//         break;
//     }
//   }

//   static get Types() {
//     return {
//       SLIDE_SHOW: 0x000,
//     };
//   }

//   #doSlideShow() {
//     if (this.#animID) {
//       clearInterval(this.#animID);
//       this.currentItem = 0;
//       this.#animID = null;
//     }
//     this.#animID = setInterval(() => {
//       this.#items[this.currentItem].style.opacity = 0;
//       this.currentItem++;
//       if (this.currentItem >= this.#items.length) this.currentItem = 0;
//       this.#items[this.currentItem].style.opacity = 1;
//     }, 4000);
//   }
// }
