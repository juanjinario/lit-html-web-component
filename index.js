class AppElement extends HTMLElement {
    
    name = this.getAttribute('name') || 'NoName';

    constructor() {
        super();
        console.log('inicializando...');
        this.hello = 'web0';
        // On active shadow hide the component, without shadow component it is in the light Doom it is visible
        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
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
            <button>Click me!</button>
        `;
        // this.textContent = 'webo';  Only for write text
        this.button = this.shadowRoot.querySelector('button');
        this.button.onclick = (e) => this.clickMe(e);
    }

    clickMe(e) {
        console.log(e);
        const message = new CustomEvent("poc:message", {
            // bubbles is for expand the event for the DOM
            bubbles: true,
            detail: {
                msg: 'Hellow from inside'
            }
        });
        this.dispatchEvent(message);
    }
}

customElements.define("app-element", AppElement);

customElements.whenDefined("app-element").then(() => {
    console.log("App element was defined");
})