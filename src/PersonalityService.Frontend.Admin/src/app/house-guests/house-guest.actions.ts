import { HouseGuest } from "./house-guest.model";

export const houseGuestActions = {
    ADD: "[HouseGuest] Add",
    EDIT: "[HouseGuest] Edit",
    DELETE: "[HouseGuest] Delete",
    HOUSE_GUESTS_CHANGED: "[HouseGuest] HouseGuests Changed"
};

export class HouseGuestEvent extends CustomEvent {
    constructor(eventName:string, houseGuest: HouseGuest) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { houseGuest }
        });
    }
}

export class HouseGuestAdd extends HouseGuestEvent {
    constructor(houseGuest: HouseGuest) {
        super(houseGuestActions.ADD, houseGuest);        
    }
}

export class HouseGuestEdit extends HouseGuestEvent {
    constructor(houseGuest: HouseGuest) {
        super(houseGuestActions.EDIT, houseGuest);
    }
}

export class HouseGuestDelete extends HouseGuestEvent {
    constructor(houseGuest: HouseGuest) {
        super(houseGuestActions.DELETE, houseGuest);
    }
}

export class HouseGuestsChanged extends CustomEvent {
    constructor(houseGuests: Array<HouseGuest>) {
        super(houseGuestActions.HOUSE_GUESTS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { houseGuests }
        });
    }
}
