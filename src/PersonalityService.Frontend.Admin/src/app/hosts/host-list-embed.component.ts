import { Host } from "./host.model";

const template = require("./host-list-embed.component.html");
const styles = require("./host-list-embed.component.scss");

export class HostListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "hosts"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.hosts.length; i++) {
            let el = this._document.createElement(`ce-host-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.hosts[i]));
            this.appendChild(el);
        }    
    }

    hosts:Array<Host> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "hosts":
                this.hosts = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-host-list-embed", HostListEmbedComponent);
