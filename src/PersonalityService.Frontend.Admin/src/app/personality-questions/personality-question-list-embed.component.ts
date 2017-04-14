import { PersonalityQuestion } from "./personality-question.model";

const template = require("./personality-question-list-embed.component.html");
const styles = require("./personality-question-list-embed.component.scss");

export class PersonalityQuestionListEmbedComponent extends HTMLElement {
    constructor(
        private _document: Document = document
    ) {
        super();
    }


    static get observedAttributes() {
        return [
            "personality-questions"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
    }

    private async _bind() {        
        for (let i = 0; i < this.personalityQuestions.length; i++) {
            let el = this._document.createElement(`ce-personality-question-item-embed`);
            el.setAttribute("entity", JSON.stringify(this.personalityQuestions[i]));
            this.appendChild(el);
        }    
    }

    personalityQuestions:Array<PersonalityQuestion> = [];

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "personality-questions":
                this.personalityQuestions = JSON.parse(newValue);
                if (this.parentElement)
                    this.connectedCallback();
                break;
        }
    }
}

customElements.define("ce-personality-question-list-embed", PersonalityQuestionListEmbedComponent);
