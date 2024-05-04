import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITableColumn, ITableData } from '../../../types/ITable.model';

@Component({
  selector: 'app-table-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css'
})
export class TableRowComponent {
  @Input() row: ITableData = {};
  @Input() columns: ITableColumn[] = [];

  constructor() {}
}
