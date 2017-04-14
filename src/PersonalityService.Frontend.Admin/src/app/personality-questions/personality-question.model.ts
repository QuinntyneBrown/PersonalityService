export class PersonalityQuestion { 
    public id:any;
    public name:string;

    public fromJSON(data: { name:string }): PersonalityQuestion {
        let personalityQuestion = new PersonalityQuestion();
        personalityQuestion.name = data.name;
        return personalityQuestion;
    }
}
