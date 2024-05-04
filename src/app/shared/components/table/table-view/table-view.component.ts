import { Component, Input } from '@angular/core';
import { TableHeaderComponent } from '../table-header/table-header.component';
import { TableRowComponent } from '../table-row/table-row.component';
import { ITableColumn, ITableData } from '../../../types/ITable.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, TableHeaderComponent, TableRowComponent],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent {
  @Input() columns: ITableColumn[] = [];
  @Input() data: ITableData[] = [];

}
