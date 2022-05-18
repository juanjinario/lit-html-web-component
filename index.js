import { css, html, render, LitElement } from "lit-element";

class AppElement extends LitElement {
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
      name: {
        reflect: true,
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.hello = "web0123";
    console.log("inicializando...");
  }

  render() {
    return html`
      <slot></slot>
      <p part="paragraph">${this.hello}</p>
      <p>${this.name}</p>
      <button @click="${this.clickMe}">Click me!</button>
    `;
  }

  clickMe(e) {
    console.log(e);
    // hello only change if name changes, for reflect property in properties section
    this.hello = "holardoooo";
    this.name = 'Name changed';
    const message = new CustomEvent("poc:message", {
      // bubbles is for expand the event for the DOM
      bubbles: true,
      /* 
        The read-only composed property of the Event interface returns a boolean value which indicates 
        whether or not the event will propagate across the shadow DOM boundary into the standard DOM. 
      */
      composed: true,
      detail: {
        msg: "Hellow from inside",
      },
    });
    this.dispatchEvent(message);
  }
}

customElements.define("app-element", AppElement);

customElements.whenDefined("app-element").then(() => {
  console.log("App element was defined");
});
