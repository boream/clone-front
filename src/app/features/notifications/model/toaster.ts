export class Toaster {
    id: string;
    type: ToasterType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?:Partial<Toaster>) {
        Object.assign(this, init);
    }
}

export enum ToasterType {
    Success,
    Error,
    Info,
    Warning
}
