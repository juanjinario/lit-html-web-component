import { css, html, render, LitElement } from "lit-element";

class AppElement extends LitElement {
  // For css the name must to be styles()
  static get styles() {
    return css`
      :host {
        border: 1px solid black;
        display: block;
        margin: 2rem 1rem;
        padding: 1rem;
      }
      nav {
        color: var(--primary-color, blue);
      }
      ::slotted(.header-text) {
        font-size: 2rem;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="holly">
        <header id="holy-header" role="banner">
          <slot name="header"></slot>
        </header>
        <nav id="holy-nav">
          <slot name="nav"></slot>
        </nav>
        </nav>
      </div>
    `;
  }
}

customElements.define("app-element-slots", AppElement);
