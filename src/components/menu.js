class Menu extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <a class="header-nav-a" href="/catalog/catalog.html">Catálogo</a>
    <a class="header-nav-a" href="/construction/construction.html">Trending</a>
    <a class="header-nav-a" href="/construction/construction.html">Proyecto</a>

    `;
  }
}

customElements.define("menu-component", Menu);
