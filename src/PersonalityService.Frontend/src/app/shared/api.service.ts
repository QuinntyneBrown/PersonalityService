import { fetch } from "../utilities";

import { environment } from "../environment";

export class ApiService {
    constructor(private _fetch = fetch) { }

    private static _instance: ApiService;

    public static get Instance() {
        this._instance = this._instance || new this();
        return this._instance;
    }
}
