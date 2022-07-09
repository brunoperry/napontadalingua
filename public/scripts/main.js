import { Hero, Menu } from "./components.js  ";

window.onload = () => {
  const menu = new Menu(document.querySelector("header"));

  const hero = new Hero(document.querySelector("#hero"));
};
