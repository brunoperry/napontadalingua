import Menu from "./components/Menu.js";
import Hero from "./components/Hero.js";

window.onload = () => {
  const menu = new Menu(document.querySelector("header"));
  const hero = new Hero(document.querySelector("#hero"));
};
