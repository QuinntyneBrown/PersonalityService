import { HostAdd, HostDelete, HostEdit, hostActions } from "./host.actions";
import { Host } from "./host.model";
import { HostService } from "./host.service";

const template = require("./host-master-detail.component.html");
const styles = require("./host-master-detail.component.scss");

export class HostMasterDetailComponent extends HTMLElement {
    constructor(
        private _hostService: HostService = HostService.Instance	
	) {
        super();
        this.onHostAdd = this.onHostAdd.bind(this);
        this.onHostEdit = this.onHostEdit.bind(this);
        this.onHostDelete = this.onHostDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "hosts"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.hosts = await this._hostService.get();
        this.hostListElement.setAttribute("hosts", JSON.stringify(this.hosts));
    }

    private _setEventListeners() {
        this.addEventListener(hostActions.ADD, this.onHostAdd);
        this.addEventListener(hostActions.EDIT, this.onHostEdit);
        this.addEventListener(hostActions.DELETE, this.onHostDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(hostActions.ADD, this.onHostAdd);
        this.removeEventListener(hostActions.EDIT, this.onHostEdit);
        this.removeEventListener(hostActions.DELETE, this.onHostDelete);
    }

    public async onHostAdd(e) {

        await this._hostService.add(e.detail.host);
        this.hosts = await this._hostService.get();
        
        this.hostListElement.setAttribute("hosts", JSON.stringify(this.hosts));
        this.hostEditElement.setAttribute("host", JSON.stringify(new Host()));
    }

    public onHostEdit(e) {
        this.hostEditElement.setAttribute("host", JSON.stringify(e.detail.host));
    }

    public async onHostDelete(e) {

        await this._hostService.remove(e.detail.host.id);
        this.hosts = await this._hostService.get();
        
        this.hostListElement.setAttribute("hosts", JSON.stringify(this.hosts));
        this.hostEditElement.setAttribute("host", JSON.stringify(new Host()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "hosts":
                this.hosts = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<Host> { return this.hosts; }

    private hosts: Array<Host> = [];
    public host: Host = <Host>{};
    public get hostEditElement(): HTMLElement { return this.querySelector("ce-host-edit-embed") as HTMLElement; }
    public get hostListElement(): HTMLElement { return this.querySelector("ce-host-list-embed") as HTMLElement; }
}

customElements.define(`ce-host-master-detail`,HostMasterDetailComponent);
