import { PersonalityQuestion } from "./personality-question.model";

export const personalityQuestionActions = {
    ADD: "[PersonalityQuestion] Add",
    EDIT: "[PersonalityQuestion] Edit",
    DELETE: "[PersonalityQuestion] Delete",
    PERSONALITY_QUESTIONS_CHANGED: "[PersonalityQuestion] PersonalityQuestions Changed"
};

export class PersonalityQuestionEvent extends CustomEvent {
    constructor(eventName:string, personalityQuestion: PersonalityQuestion) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { personalityQuestion }
        });
    }
}

export class PersonalityQuestionAdd extends PersonalityQuestionEvent {
    constructor(personalityQuestion: PersonalityQuestion) {
        super(personalityQuestionActions.ADD, personalityQuestion);        
    }
}

export class PersonalityQuestionEdit extends PersonalityQuestionEvent {
    constructor(personalityQuestion: PersonalityQuestion) {
        super(personalityQuestionActions.EDIT, personalityQuestion);
    }
}

export class PersonalityQuestionDelete extends PersonalityQuestionEvent {
    constructor(personalityQuestion: PersonalityQuestion) {
        super(personalityQuestionActions.DELETE, personalityQuestion);
    }
}

export class PersonalityQuestionsChanged extends CustomEvent {
    constructor(personalityQuestions: Array<PersonalityQuestion>) {
        super(personalityQuestionActions.PERSONALITY_QUESTIONS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { personalityQuestions }
        });
    }
}
