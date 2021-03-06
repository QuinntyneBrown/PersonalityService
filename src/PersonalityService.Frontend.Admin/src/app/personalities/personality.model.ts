export class Personality { 

    public id:any;
    
    public name: string;

    public firstname: string;

    public lastname: string;

    public imageUrl: string;

    public abstract: string;

    public bio: string;

    public github: string;

    public linkedIn: string;

    public twitter: string;
    
    public static fromJSON(data: any): Personality {

        let personality = new Personality();

        personality.name = data.name;

        personality.firstname = data.firstname;

        personality.lastname = data.lastname;

        personality.imageUrl = data.imageUrl;

        personality.abstract = data.abstract;

        personality.bio = data.bio;

        personality.github = data.github;

        personality.linkedIn = data.linkedIn;

        personality.twitter = data.twitter;

        return personality;
    }
}
