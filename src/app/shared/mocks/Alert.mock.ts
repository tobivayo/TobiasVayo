import { AlertTypes, IAlert } from "../types/IAlert.model";

export const mockAlerts: IAlert[] = [
    { type: AlertTypes.Success, message: 'Operation completed successfully.' },
    { type: AlertTypes.Warning, message: 'This is a warning message.' },
    { type: AlertTypes.Danger, message: 'Error occurred during processing your request.' }
];