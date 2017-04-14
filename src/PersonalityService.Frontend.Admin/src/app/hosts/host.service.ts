import { fetch } from "../utilities";
import { Host } from "./host.model";

export class HostService {
    constructor(private _fetch = fetch) { }

    private static _instance: HostService;

    public static get Instance() {
        this._instance = this._instance || new HostService();
        return this._instance;
    }

    public get(): Promise<Array<Host>> {
        return this._fetch({ url: "/api/host/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { hosts: Array<Host> }).hosts;
        });
    }

    public getById(id): Promise<Host> {
        return this._fetch({ url: `/api/host/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { host: Host }).host;
        });
    }

    public add(host) {
        return this._fetch({ url: `/api/host/add`, method: "POST", data: { host }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/host/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
