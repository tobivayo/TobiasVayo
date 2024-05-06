export enum AlertTypes {
    Success = 'alert-success',
    Warning = 'alert-warning',
    Danger = 'alert-danger'
}

export interface IAlert {
    type: AlertTypes;
    message: string;
}