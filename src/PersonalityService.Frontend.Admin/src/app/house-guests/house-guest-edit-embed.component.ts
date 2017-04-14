import { HouseGuest } from "./house-guest.model";
import { EditorComponent } from "../shared";
import {  HouseGuestDelete, HouseGuestEdit, HouseGuestAdd } from "./house-guest.actions";

const template = require("./house-guest-edit-embed.component.html");
const styles = require("./house-guest-edit-embed.component.scss");

export class HouseGuestEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    static get observedAttributes() {
        return [
            "house-guest",
            "house-guest-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this._titleElement.textContent = this.houseGuest ? "Edit House Guest": "Create House Guest";

        if (this.houseGuest) {                
            this._nameInputElement.value = this.houseGuest.name;  
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
        const houseGuest = {
            id: this.houseGuest != null ? this.houseGuest.id : null,
            name: this._nameInputElement.value
        } as HouseGuest;
        
        this.dispatchEvent(new HouseGuestAdd(houseGuest));            
    }

    public onDelete() {        
        const houseGuest = {
            id: this.houseGuest != null ? this.houseGuest.id : null,
            name: this._nameInputElement.value
        } as HouseGuest;

        this.dispatchEvent(new HouseGuestDelete(houseGuest));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "house-guest-id":
                this.houseGuestId = newValue;
                break;
            case "houseGuest":
                this.houseGuest = JSON.parse(newValue);
                if (this.parentNode) {
                    this.houseGuestId = this.houseGuest.id;
                    this._nameInputElement.value = this.houseGuest.name != undefined ? this.houseGuest.name : "";
                    this._titleElement.textContent = this.houseGuestId ? "Edit HouseGuest" : "Create HouseGuest";
                }
                break;
        }           
    }

    public houseGuestId: any;
    public houseGuest: HouseGuest;
    
    private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }
    private get _saveButtonElement(): HTMLElement { return this.querySelector(".save-button") as HTMLElement };
    private get _deleteButtonElement(): HTMLElement { return this.querySelector(".delete-button") as HTMLElement };
    private get _nameInputElement(): HTMLInputElement { return this.querySelector(".house-guest-name") as HTMLInputElement;}
}

customElements.define(`ce-house-guest-edit-embed`,HouseGuestEditEmbedComponent);
