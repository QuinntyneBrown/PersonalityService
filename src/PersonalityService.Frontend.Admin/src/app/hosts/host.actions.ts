import { Host } from "./host.model";

export const hostActions = {
    ADD: "[Host] Add",
    EDIT: "[Host] Edit",
    DELETE: "[Host] Delete",
    HOSTS_CHANGED: "[Host] Hosts Changed"
};

export class HostEvent extends CustomEvent {
    constructor(eventName:string, host: Host) {
        super(eventName, {
            bubbles: true,
            cancelable: true,
            detail: { host }
        });
    }
}

export class HostAdd extends HostEvent {
    constructor(host: Host) {
        super(hostActions.ADD, host);        
    }
}

export class HostEdit extends HostEvent {
    constructor(host: Host) {
        super(hostActions.EDIT, host);
    }
}

export class HostDelete extends HostEvent {
    constructor(host: Host) {
        super(hostActions.DELETE, host);
    }
}

export class HostsChanged extends CustomEvent {
    constructor(hosts: Array<Host>) {
        super(hostActions.HOSTS_CHANGED, {
            bubbles: true,
            cancelable: true,
            detail: { hosts }
        });
    }
}
