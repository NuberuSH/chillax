
const template = document.createElement("template");
template.innerHTML = `
<ul class="hidden md:flex text-2xl text-shadow-1 font-semibold text-white">
<li class="pr-3 pl-0 hover:text-web-boton duration-300 ease-in-out text-center flex items-center"><a
    href='/catalog/catalog.html'>Catálogo</a></li>
<li class="px-3 hover:text-web-boton duration-300 ease-in-out flex items-center"><a
    href='/construction/construction.html'>Trending</a>
</li>
<li class="px-3 hover:text-web-boton duration-300 ease-in-out flex items-center"><a
    href='/construction/construction.html'>Quienes somos</a>
</li>
</ul>
    `;

class Menu extends HTMLElement {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("menu-component", Menu);
