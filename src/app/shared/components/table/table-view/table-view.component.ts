import { Component, Input } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { ITableColumn, ITableData } from '../../../types/ITable.model';
import { CommonModule } from '@angular/common';
import { LogoImgComponent } from '../../logo-img/logo-img.component';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, TableRowComponent, LogoImgComponent],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  @Input() columns: ITableColumn[] = [];
  @Input() data: ITableData[] = [];
}
