export enum ActionType {
    Navigate = 'navigate',
    Dialog = 'dialog',
    Delete = 'delete',
    Custom = 'custom'
}

export interface IMenuItem {
    label: string;
    action: () => void;
    icon?: string;
    route?: string;
    data?: any;
    type: ActionType;
}
  