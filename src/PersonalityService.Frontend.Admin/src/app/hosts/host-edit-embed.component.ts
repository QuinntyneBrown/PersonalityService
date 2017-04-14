import { Host } from "./host.model";
import { EditorComponent } from "../shared";
import {  HostDelete, HostEdit, HostAdd } from "./host.actions";

const template = require("./host-edit-embed.component.html");
const styles = require("./host-edit-embed.component.scss");

export class HostEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    static get observedAttributes() {
        return [
            "host",
            "host-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this._titleElement.textContent = this.host ? "Edit Host": "Create Host";

        if (this.host) {                
            this._nameInputElement.value = this.host.name;  
        } else {
            this._deleteButtonElement.style.display = "none";
        }     
    }

    private _setEventListeners() {
        this._saveButtonElement.addEventListener("click", this.onSave);
        this._deleteButtonElement.addEventListener("click", this.onDelete);
    }

    private disconnectedCallback() {
        this._saveButtonElement.removeEventListener("click", this.onSave);
        this._deleteButtonElement.removeEventListener("click", this.onDelete);
    }

    public onSave() {
        const host = {
            id: this.host != null ? this.host.id : null,
            name: this._nameInputElement.value
        } as Host;
        
        this.dispatchEvent(new HostAdd(host));            
    }

    public onDelete() {        
        const host = {
            id: this.host != null ? this.host.id : null,
            name: this._nameInputElement.value
        } as Host;

        this.dispatchEvent(new HostDelete(host));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "host-id":
                this.hostId = newValue;
                break;
            case "host":
                this.host = JSON.parse(newValue);
                if (this.parentNode) {
                    this.hostId = this.host.id;
                    this._nameInputElement.value = this.host.name != undefined ? this.host.name : "";
                    this._titleElement.textContent = this.hostId ? "Edit Host" : "Create Host";
                }
                break;
        }           
    }

    public hostId: any;
    public host: Host;
    
    private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }
    private get _saveButtonElement(): HTMLElement { return this.querySelector(".save-button") as HTMLElement };
    private get _deleteButtonElement(): HTMLElement { return this.querySelector(".delete-button") as HTMLElement };
    private get _nameInputElement(): HTMLInputElement { return this.querySelector(".host-name") as HTMLInputElement;}
}

customElements.define(`ce-host-edit-embed`,HostEditEmbedComponent);
