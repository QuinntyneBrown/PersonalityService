export class HouseGuest { 
    public id:any;
    public name:string;

    public fromJSON(data: { name:string }): HouseGuest {
        let houseGuest = new HouseGuest();
        houseGuest.name = data.name;
        return houseGuest;
    }
}
