import { fetch } from "../utilities";
import { Personality } from "./personality.model";
import { environment } from "../environment";

export class PersonalityService {
    constructor(private _fetch = fetch) { }

    private static _instance: PersonalityService;

    public static get Instance() {
        this._instance = this._instance || new PersonalityService();
        return this._instance;
    }

    public get(): Promise<Array<Personality>> {
        return this._fetch({ url: `${environment.baseUrl}api/personality/get`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { personalities: Array<Personality> }).personalities;
        });
    }

    public getById(id): Promise<Personality> {
        return this._fetch({ url: `${environment.baseUrl}api/personality/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { personality: Personality }).personality;
        });
    }

    public add(personality) {
        return this._fetch({ url: `${environment.baseUrl}api/personality/add`, method: `POST`, data: { personality }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `${environment.baseUrl}api/personality/remove?id=${options.id}`, method: `DELETE`, authRequired: true  });
    }
    
}
