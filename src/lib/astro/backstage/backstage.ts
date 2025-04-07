class AppBackstage extends HTMLDivElement {
  constructor() {
    super();
  }

  connectedCallback() {
    window.addEventListener('load', this.delete, { once: true });
  }

  disconnectedCallback() {}

  get duration() {
    return this.dataset.duration ? Number(this.dataset.duration) : 5000;
  }

  get delay() {
    return this.dataset.delay ? Number(this.dataset.delay) : 75;
  }

  delete = () => {
    setTimeout(() => {
      this.style.transitionDuration = `${this.dataset.duration}ms`;
      this.style.pointerEvents = this.style.touchAction = 'none';
      this.style.opacity = '0';
      setTimeout(() => this.remove(), Number(this.dataset.duration));
    }, Number(this.dataset.delay));
  };
}

customElements.define('app-backstage', AppBackstage, { extends: 'div' });
