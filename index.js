import { html, render, LitElement } from 'lit-element';
import {  } from 'lit-element';

class AppElement extends HTMLElement {
    
    name = this.getAttribute('name') || 'NoName';

    constructor() {
        super();
        console.log('inicializando...');
        this.hello = 'web0';
        this.attachShadow({ mode: "open" });
        const template = html`
            <style>
                :host {
                    border: 1px solid white;
                    display: block;
                    padding: 1rem;
                }
                p{
                    color: var(--primary-color, blue);
                }
                ::slotted(span) {
                    font-size: 2rem;
                }
            </style>
            <slot></slot>
            <p part="paragraph">${ this.hello } ${ this.name }</p>
            <button @click="${ this.clickMe }">Click me!</button>
        `;

        // render(template, document.body, this); If it is not active shadow
        render(template, this.shadowRoot, this);
    }

    clickMe(e) {
        console.log(e);
        const message = new CustomEvent("poc:message", {
            // bubbles is for expand the event for the DOM
            bubbles: true,
            detail: {
                msg: 'Hellow from inside'
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
})