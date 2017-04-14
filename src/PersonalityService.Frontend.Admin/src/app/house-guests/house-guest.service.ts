import { fetch } from "../utilities";
import { HouseGuest } from "./house-guest.model";

export class HouseGuestService {
    constructor(private _fetch = fetch) { }

    private static _instance: HouseGuestService;

    public static get Instance() {
        this._instance = this._instance || new HouseGuestService();
        return this._instance;
    }

    public get(): Promise<Array<HouseGuest>> {
        return this._fetch({ url: "/api/houseguest/get", authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { houseGuests: Array<HouseGuest> }).houseGuests;
        });
    }

    public getById(id): Promise<HouseGuest> {
        return this._fetch({ url: `/api/houseguest/getbyid?id=${id}`, authRequired: true }).then((results:string) => {
            return (JSON.parse(results) as { houseGuest: HouseGuest }).houseGuest;
        });
    }

    public add(houseGuest) {
        return this._fetch({ url: `/api/houseguest/add`, method: "POST", data: { houseGuest }, authRequired: true  });
    }

    public remove(options: { id : number }) {
        return this._fetch({ url: `/api/houseguest/remove?id=${options.id}`, method: "DELETE", authRequired: true  });
    }
    
}
