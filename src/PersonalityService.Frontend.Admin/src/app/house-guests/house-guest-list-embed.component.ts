import { HouseGuest } from "./house-guest.model";

const template = require("./house-guest-list-embed.component.html");
const styles = require("./house-guest-list-embed.component.scss");

export class HouseGuestListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "house-guests"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.houseGuests.length; i++) {
            let el = this._document.createElement(`ce-house-guest-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.houseGuests[i]));
            this.appendChild(el);
        }    
    }

    houseGuests:Array<HouseGuest> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "house-guests":
                this.houseGuests = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-house-guest-list-embed", HouseGuestListEmbedComponent);
