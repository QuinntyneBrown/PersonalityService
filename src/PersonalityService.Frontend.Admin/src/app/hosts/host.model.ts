export class Host { 
    public id:any;
    public name:string;

    public fromJSON(data: { name:string }): Host {
        let host = new Host();
        host.name = data.name;
        return host;
    }
}
