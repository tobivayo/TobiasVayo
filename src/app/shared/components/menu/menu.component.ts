import { Component, Input } from '@angular/core';
import { ActionType, IMenuItem } from '../../types/IMenu.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EndpointsService } from '../../services/endpoints.service';
import { AlertService } from '../../services/alert.service';
import { AlertTypes } from '../../types/IAlert.model';
import { GlobalStoreService } from '../../../core/store/global-store.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() items: IMenuItem[] = [];

  constructor(private _router: Router, private _endpoints: EndpointsService, private _alert: AlertService, private _store: GlobalStoreService) { }

  onMenuItemClick(item: IMenuItem): void {
    if (item.type == ActionType.Navigate && item.route) {
      this._router.navigateByUrl(item.route);
    } else if (item.type == ActionType.Dialog && item.data) {
      console.log('item.data', item.data);
    } else if (item.type == ActionType.Delete && item.data) {
      this._endpoints.deleteProduct(item.data['id']).subscribe({
        next: () => {
          this._store.removeProductById(item.data['id']);
          this._alert.showAlert({
            type: AlertTypes.Success,
            message: `Se eliminó el producto ${item.data['name']}`
          })
        },
        error: (err) => {
          console.log('error', err);
          this._alert.showAlert({
            type: AlertTypes.Danger,
            message: `Ocurrió un error al intentar eliminar el producto ${item.data['name']}`
          })
        }
      })
    } else {
      item.action();
    }
  }
}
