import { fetch } from "../utilities";
import { PersonalityQuestion } from "./personality-question.model";

export class PersonalityQuestionService {
    constructor(private _fetch = fetch) { }

    private static _instance: PersonalityQuestionService;

    public static get Instance() {
        this._instance = this._instance || new PersonalityQuestionService();
        return this._instance;
    }

    public get(): Promise<Array<PersonalityQuestion>> {
        return this._fetch({ url: "/api/personalityquestion/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { personalityQuestions: Array<PersonalityQuestion> }).personalityQuestions;
        });
    }

    public getById(id): Promise<PersonalityQuestion> {
        return this._fetch({ url: `/api/personalityquestion/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { personalityQuestion: PersonalityQuestion }).personalityQuestion;
        });
    }

    public add(personalityQuestion) {
        return this._fetch({ url: `/api/personalityquestion/add`, method: "POST", data: { personalityQuestion }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/personalityquestion/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
