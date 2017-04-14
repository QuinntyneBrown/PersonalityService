import { PersonalityQuestionAdd, PersonalityQuestionDelete, PersonalityQuestionEdit, personalityQuestionActions } from "./personality-question.actions";
import { PersonalityQuestion } from "./personality-question.model";
import { PersonalityQuestionService } from "./personality-question.service";

const template = require("./personality-question-master-detail.component.html");
const styles = require("./personality-question-master-detail.component.scss");

export class PersonalityQuestionMasterDetailComponent extends HTMLElement {
    constructor(
        private _personalityQuestionService: PersonalityQuestionService = PersonalityQuestionService.Instance	
	) {
        super();
        this.onPersonalityQuestionAdd = this.onPersonalityQuestionAdd.bind(this);
        this.onPersonalityQuestionEdit = this.onPersonalityQuestionEdit.bind(this);
        this.onPersonalityQuestionDelete = this.onPersonalityQuestionDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "personality-questions"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.personalityQuestions = await this._personalityQuestionService.get();
        this.personalityQuestionListElement.setAttribute("personality-questions", JSON.stringify(this.personalityQuestions));
    }

    private _setEventListeners() {
        this.addEventListener(personalityQuestionActions.ADD, this.onPersonalityQuestionAdd);
        this.addEventListener(personalityQuestionActions.EDIT, this.onPersonalityQuestionEdit);
        this.addEventListener(personalityQuestionActions.DELETE, this.onPersonalityQuestionDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(personalityQuestionActions.ADD, this.onPersonalityQuestionAdd);
        this.removeEventListener(personalityQuestionActions.EDIT, this.onPersonalityQuestionEdit);
        this.removeEventListener(personalityQuestionActions.DELETE, this.onPersonalityQuestionDelete);
    }

    public async onPersonalityQuestionAdd(e) {

        await this._personalityQuestionService.add(e.detail.personalityQuestion);
        this.personalityQuestions = await this._personalityQuestionService.get();
        
        this.personalityQuestionListElement.setAttribute("personality-questions", JSON.stringify(this.personalityQuestions));
        this.personalityQuestionEditElement.setAttribute("personality-question", JSON.stringify(new PersonalityQuestion()));
    }

    public onPersonalityQuestionEdit(e) {
        this.personalityQuestionEditElement.setAttribute("personality-question", JSON.stringify(e.detail.personalityQuestion));
    }

    public async onPersonalityQuestionDelete(e) {

        await this._personalityQuestionService.remove(e.detail.personalityQuestion.id);
        this.personalityQuestions = await this._personalityQuestionService.get();
        
        this.personalityQuestionListElement.setAttribute("personality-questions", JSON.stringify(this.personalityQuestions));
        this.personalityQuestionEditElement.setAttribute("personality-question", JSON.stringify(new PersonalityQuestion()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "personality-questions":
                this.personalityQuestions = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<PersonalityQuestion> { return this.personalityQuestions; }

    private personalityQuestions: Array<PersonalityQuestion> = [];
    public personalityQuestion: PersonalityQuestion = <PersonalityQuestion>{};
    public get personalityQuestionEditElement(): HTMLElement { return this.querySelector("ce-personality-question-edit-embed") as HTMLElement; }
    public get personalityQuestionListElement(): HTMLElement { return this.querySelector("ce-personality-question-list-embed") as HTMLElement; }
}

customElements.define(`ce-personality-question-master-detail`,PersonalityQuestionMasterDetailComponent);
