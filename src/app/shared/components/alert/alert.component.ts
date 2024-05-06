import { Component, OnInit } from '@angular/core';
import { IAlert } from '../../types/IAlert.model';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  public alert?: IAlert;
  private _timeoutId?: number;
  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.alertState$.subscribe((alert: IAlert) => {
      this.alert = alert;
      this.closeAlert();
    });
  }

  public closeAlert() {
    if (this._timeoutId) {
      window.clearTimeout(this._timeoutId);
    }
    this._timeoutId = window.setTimeout(() => {
      this.alert = undefined;
    }, 5000);
  }
}
