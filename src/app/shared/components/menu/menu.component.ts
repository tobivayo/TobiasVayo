import { Component, Input } from '@angular/core';
import { ActionType, IMenuItem } from '../../types/IMenu.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() items: IMenuItem[] = [];

  constructor(private _router: Router) { }

  onMenuItemClick(item: IMenuItem): void {
    console.log('item', item)
    if (item.type == ActionType.Navigate && item.route) {
      this._router.navigateByUrl(item.route);
    } else if (item.type == ActionType.Dialog && item.data) {
      console.log('item.data', item.data);
    } else {
      item.action();
    }
  }
}
