import { PersonalityQuestion } from "./personality-question.model";
import { EditorComponent } from "../shared";
import {  PersonalityQuestionDelete, PersonalityQuestionEdit, PersonalityQuestionAdd } from "./personality-question.actions";

const template = require("./personality-question-edit-embed.component.html");
const styles = require("./personality-question-edit-embed.component.scss");

export class PersonalityQuestionEditEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }

    static get observedAttributes() {
        return [
            "personality-question",
            "personality-question-id"
        ];
    }
    
    connectedCallback() {        
        this.innerHTML = `<style>${styles}</style> ${template}`; 
        this._bind();
        this._setEventListeners();
    }
    
    private async _bind() {
        this._titleElement.textContent = this.personalityQuestion ? "Edit Personality Question": "Create Personality Question";

        if (this.personalityQuestion) {                
            this._nameInputElement.value = this.personalityQuestion.name;  
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
        const personalityQuestion = {
            id: this.personalityQuestion != null ? this.personalityQuestion.id : null,
            name: this._nameInputElement.value
        } as PersonalityQuestion;
        
        this.dispatchEvent(new PersonalityQuestionAdd(personalityQuestion));            
    }

    public onDelete() {        
        const personalityQuestion = {
            id: this.personalityQuestion != null ? this.personalityQuestion.id : null,
            name: this._nameInputElement.value
        } as PersonalityQuestion;

        this.dispatchEvent(new PersonalityQuestionDelete(personalityQuestion));         
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "personality-question-id":
                this.personalityQuestionId = newValue;
                break;
            case "personalityQuestion":
                this.personalityQuestion = JSON.parse(newValue);
                if (this.parentNode) {
                    this.personalityQuestionId = this.personalityQuestion.id;
                    this._nameInputElement.value = this.personalityQuestion.name != undefined ? this.personalityQuestion.name : "";
                    this._titleElement.textContent = this.personalityQuestionId ? "Edit PersonalityQuestion" : "Create PersonalityQuestion";
                }
                break;
        }           
    }

    public personalityQuestionId: any;
    public personalityQuestion: PersonalityQuestion;
    
    private get _titleElement(): HTMLElement { return this.querySelector("h2") as HTMLElement; }
    private get _saveButtonElement(): HTMLElement { return this.querySelector(".save-button") as HTMLElement };
    private get _deleteButtonElement(): HTMLElement { return this.querySelector(".delete-button") as HTMLElement };
    private get _nameInputElement(): HTMLInputElement { return this.querySelector(".personality-question-name") as HTMLInputElement;}
}

customElements.define(`ce-personality-question-edit-embed`,PersonalityQuestionEditEmbedComponent);
