export class Personality { 

    public id:any;
    
    public name:string;

    public static fromJSON(data: { name:string }): Personality {

        let personality = new Personality();

        personality.name = data.name;

        return personality;
    }
}
