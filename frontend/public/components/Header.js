import Utils, { SPEED } from '../Utils.js';
import Component from './Component.js';
import Logo from './Logo.js';
import Menu from './Menu.js';

export default class Header extends Component {
  #logo = null;
  #menu = null;

  #isHidden = false;
  #isMobile = false;

  #THRESHOLD = 20;
  #lastScrollYPos;

  constructor() {
    super(document.querySelector('header'));

    this.querySelector('.showhide-menu-button').onclick = () => {
      this.#menu.openClose();
    };

    this.#logo = new Logo(this.querySelector('.logo'));
    this.#menu = new Menu(
      this.querySelector('.menu'),
      this.querySelector('.overlay')
    );

    window.onscroll = () => this.#onScroll();
    window.onresize = () => this.#onResize();

    window.onresize();
  }

  show() {
    this.transform = 'translateY(0)';
    this.#isHidden = false;
    this.#logo.start();
  }
  hide() {
    this.transform = 'translateY(calc(var(--header-height) * -1))';
    this.#isHidden = true;
    setTimeout(() => this.#logo.stop(), SPEED);
  }

  #onScroll() {
    const wY = window.scrollY;
    if (this.#lastScrollYPos < wY) {
      if (wY - this.#lastScrollYPos >= this.#THRESHOLD && !this.#isHidden) {
        this.hide();
      }
    } else if (this.#isHidden) this.show();
    this.#lastScrollYPos = wY;
  }

  #onResize() {
    let prev = this.#isMobile;
    this.#isMobile = Utils.isMobile();
    if (prev === this.#isMobile) return;

    if (!this.#isMobile) {
      const el = this.#menu.querySelector('.networks');
      this.elem.appendChild(el);
    } else {
      const el = this.querySelector('.networks');
      this.#menu.appendChild(el);
    }
  }
}
