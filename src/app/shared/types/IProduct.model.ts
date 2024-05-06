import { IMenuItem } from "./IMenu.model";

export interface IProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    dateRelease: Date;
    dateRevision: Date;
    actions?: IMenuItem[];
}

export interface IBackProduct {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}
