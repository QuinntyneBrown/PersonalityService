import { HouseGuestAdd, HouseGuestDelete, HouseGuestEdit, houseGuestActions } from "./house-guest.actions";
import { HouseGuest } from "./house-guest.model";
import { HouseGuestService } from "./house-guest.service";

const template = require("./house-guest-master-detail.component.html");
const styles = require("./house-guest-master-detail.component.scss");

export class HouseGuestMasterDetailComponent extends HTMLElement {
    constructor(
        private _houseGuestService: HouseGuestService = HouseGuestService.Instance	
	) {
        super();
        this.onHouseGuestAdd = this.onHouseGuestAdd.bind(this);
        this.onHouseGuestEdit = this.onHouseGuestEdit.bind(this);
        this.onHouseGuestDelete = this.onHouseGuestDelete.bind(this);
    }

    static get observedAttributes () {
        return [
            "house-guests"
        ];
    }

    connectedCallback() {
        this.innerHTML = `<style>${styles}</style> ${template}`;
        this._bind();
        this._setEventListeners();
    }

    private async _bind() {
        this.houseGuests = await this._houseGuestService.get();
        this.houseGuestListElement.setAttribute("house-guests", JSON.stringify(this.houseGuests));
    }

    private _setEventListeners() {
        this.addEventListener(houseGuestActions.ADD, this.onHouseGuestAdd);
        this.addEventListener(houseGuestActions.EDIT, this.onHouseGuestEdit);
        this.addEventListener(houseGuestActions.DELETE, this.onHouseGuestDelete);
    }

    disconnectedCallback() {
        this.removeEventListener(houseGuestActions.ADD, this.onHouseGuestAdd);
        this.removeEventListener(houseGuestActions.EDIT, this.onHouseGuestEdit);
        this.removeEventListener(houseGuestActions.DELETE, this.onHouseGuestDelete);
    }

    public async onHouseGuestAdd(e) {

        await this._houseGuestService.add(e.detail.houseGuest);
        this.houseGuests = await this._houseGuestService.get();
        
        this.houseGuestListElement.setAttribute("house-guests", JSON.stringify(this.houseGuests));
        this.houseGuestEditElement.setAttribute("house-guest", JSON.stringify(new HouseGuest()));
    }

    public onHouseGuestEdit(e) {
        this.houseGuestEditElement.setAttribute("house-guest", JSON.stringify(e.detail.houseGuest));
    }

    public async onHouseGuestDelete(e) {

        await this._houseGuestService.remove(e.detail.houseGuest.id);
        this.houseGuests = await this._houseGuestService.get();
        
        this.houseGuestListElement.setAttribute("house-guests", JSON.stringify(this.houseGuests));
        this.houseGuestEditElement.setAttribute("house-guest", JSON.stringify(new HouseGuest()));
    }

    attributeChangedCallback (name, oldValue, newValue) {
        switch (name) {
            case "house-guests":
                this.houseGuests = JSON.parse(newValue);

                if (this.parentNode)
                    this.connectedCallback();

                break;
        }
    }

    public get value(): Array<HouseGuest> { return this.houseGuests; }

    private houseGuests: Array<HouseGuest> = [];
    public houseGuest: HouseGuest = <HouseGuest>{};
    public get houseGuestEditElement(): HTMLElement { return this.querySelector("ce-house-guest-edit-embed") as HTMLElement; }
    public get houseGuestListElement(): HTMLElement { return this.querySelector("ce-house-guest-list-embed") as HTMLElement; }
}

customElements.define(`ce-house-guest-master-detail`,HouseGuestMasterDetailComponent);
