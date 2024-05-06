import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IAlert } from '../types/IAlert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private _alertState = new Subject<IAlert>();
  public readonly alertState$ = this._alertState.asObservable();

  constructor() { }

  public showAlert(alert: IAlert) {
    this._alertState.next(alert);
  }
}
