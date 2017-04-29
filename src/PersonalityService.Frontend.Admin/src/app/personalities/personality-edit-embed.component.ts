import { Personality } from "./personality.model";
import { EditorComponent } from "../shared";
import { PersonalityDelete, PersonalityEdit, PersonalityAdd } from "./personality.actions";

const template = require("./personality-edit-embed.component.html");
const styles = require("./personality-edit-embed.component.scss");

export class PersonalityEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    static get observedAttributes() {
        return [
            "personality",
            "personality-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this.abstractEditor = new EditorComponent(this._abstractElement);
        this.bioEditor = new EditorComponent(this._bioElement);

        this._titleElement.textContent = this.personality ? `Edit Personality: ${this.personality.name}`: "Create Personality";

        if (this.personality) {                
            this._nameInputElement.value = this.personality.name != undefined ? this.personality.name : "";
            this._firstnameElement.value = this.personality.firstname != undefined ? this.personality.firstname : "";
            this._lastnameElement.value = this.personality.lastname != undefined ? this.personality.lastname : "";
            this._imageUrlElement.value = this.personality.imageUrl != undefined ? this.personality.imageUrl : "";
            this._githubElement.value = this.personality.github != undefined ? this.personality.github : "";
            this._linkedInElement.value = this.personality.linkedIn != undefined ? this.personality.linkedIn : "";
            this._twitterElement.value = this.personality.twitter != undefined ? this.personality.twitter: "";                
            this.bioEditor.setHTML(this.personality.bio != undefined ? this.personality.bio : "");
            this.abstractEditor.setHTML(this.personality.abstract != undefined ? this.personality.abstract : "");
        } else {
            this._deleteButtonElement.style.display = "none";
        }     
    }

    private _setEventListeners() {
        this._saveButtonElement.addEventListener("click", this.onSave);
        this._deleteButtonElement.addEventListener("click", this.onDelete);
        this._createButtonElement.addEventListener("click", this.onCreate);
    }

    private disconnectedCallback() {
        this._saveButtonElement.removeEventListener("click", this.onSave);
        this._deleteButtonElement.removeEventListener("click", this.onDelete);
        this._createButtonElement.removeEventListener("click", this.onCreate);
    }

    public onSave() {
        const personality = {
            id: this.personality != null ? this.personality.id : null,
            name: this._nameInputElement.value,
            firstname: this._firstnameElement.value,
            lastname: this._lastnameElement.value,
            imageUrl: this._imageUrlElement.value,
            github: this._githubElement.value,
            linkedIn: this._linkedInElement.value,
            twitter: this._twitterElement.value,
            abstract: this.abstractEditor.text,
            bio: this.bioEditor.text
        } as Personality;
        
        this.dispatchEvent(new PersonalityAdd(personality));            
    }

    public onCreate() {        
        this.dispatchEvent(new PersonalityEdit(new Personality()));            
    }

    public onDelete() {        
        const personality = {
            id: this.personality != null ? this.personality.id : null,
            name: this._nameInputElement.value
        } as Personality;

        this.dispatchEvent(new PersonalityDelete(personality));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "personality-id":
                this.personalityId = newValue;
                break;
            case "personality":
                this.personality = JSON.parse(newValue);
                if (this.parentNode) {
                    this.personalityId = this.personality.id;
                    this._nameInputElement.value = this.personality.name != undefined ? this.personality.name : "";
                    this._firstnameElement.value = this.personality.firstname != undefined ? this.personality.firstname : "";
                    this._lastnameElement.value = this.personality.lastname != undefined ? this.personality.lastname : "";
                    this._imageUrlElement.value = this.personality.imageUrl != undefined ? this.personality.imageUrl : "";
                    this._githubElement.value = this.personality.github != undefined ? this.personality.github : "";
                    this._linkedInElement.value = this.personality.linkedIn != undefined ? this.personality.linkedIn : "";
                    this._twitterElement.value = this.personality.twitter != undefined ? this.personality.twitter : "";
                    this.bioEditor.setHTML(this.personality.bio != undefined ? this.personality.bio : "");
                    this.abstractEditor.setHTML(this.personality.abstract != undefined ? this.personality.abstract : "");
                    this._titleElement.textContent = this.personalityId ? `Edit Personality: ${this.personality.name}` : "Create Personality";
                }
                break;
        }           
    }

    public personalityId: any;
    
    public personality: Personality;

    public abstractEditor: EditorComponent;

    public bioEditor: EditorComponent;
    
    private get _createButtonElement(): HTMLElement { return this.querySelector(".personality-create") as HTMLElement; }
    
	private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }

    private get _firstnameElement(): HTMLInputElement { return this.querySelector(".personality-firstname") as HTMLInputElement; }

    private get _lastnameElement(): HTMLInputElement { return this.querySelector(".personality-lastname") as HTMLInputElement; }

    private get _githubElement(): HTMLInputElement { return this.querySelector(".personality-github") as HTMLInputElement; }

    private get _linkedInElement(): HTMLInputElement { return this.querySelector(".personality-linked-in") as HTMLInputElement; }

    private get _twitterElement(): HTMLInputElement { return this.querySelector(".personality-twitter") as HTMLInputElement; }
    
    private get _imageUrlElement(): HTMLInputElement { return this.querySelector(".personality-image-url") as HTMLInputElement; }

    private get _abstractElement(): HTMLInputElement { return this.querySelector(".personality-abstract") as HTMLInputElement; }

    private get _bioElement(): HTMLInputElement { return this.querySelector(".personality-bio") as HTMLInputElement; }
    
	private get _saveButtonElement(): HTMLInputElement { return this.querySelector(".save-button") as HTMLInputElement };
    
	private get _deleteButtonElement(): HTMLInputElement { return this.querySelector(".delete-button") as HTMLInputElement };
    
	private get _nameInputElement(): HTMLInputElement { return this.querySelector(".personality-name") as HTMLInputElement;}
}

customElements.define(`ce-personality-edit-embed`,PersonalityEditEmbedComponent);
