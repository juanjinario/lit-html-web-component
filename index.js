import { css, html, render, LitElement } from "lit-element";

class AppElement extends LitElement {
  hello = "web0";

  // For css the name must to be styles()
  static get styles() {
    return css`
      :host {
        border: 1px solid white;
        display: block;
        padding: 1rem;
      }
      p {
        color: var(--primary-color, blue);
      }
      ::slotted(span) {
        font-size: 2rem;
      }
    `;
  }

  // For props the name must to be properties()
  static get properties() {
    return {
      name: { type: String },
    };
  }

  constructor() {
    super();
    console.log("inicializando...");
  }

  render() {
    return html`
      <slot></slot>
      <p part="paragraph">${this.hello} ${this.name}</p>
      <button @click="${this.clickMe}">Click me!</button>
    `;
  }

  clickMe(e) {
    console.log(e);
    const message = new CustomEvent("poc:message", {
      // bubbles is for expand the event for the DOM
      bubbles: true,
      detail: {
        msg: "Hellow from inside",
      },
      /* 
        The read-only composed property of the Event interface returns a boolean value which indicates 
        whether or not the event will propagate across the shadow DOM boundary into the standard DOM. 
      */
      composed: true,
    });
    this.dispatchEvent(message);
  }
}

customElements.define("app-element", AppElement);

customElements.whenDefined("app-element").then(() => {
  console.log("App element was defined");
});
