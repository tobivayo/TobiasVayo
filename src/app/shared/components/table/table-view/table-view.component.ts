import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TableRowComponent } from '../table-row/table-row.component';
import { ITableColumn, ITableData } from '../../../types/ITable.model';
import { CommonModule } from '@angular/common';
import { LogoImgComponent } from '../../logo-img/logo-img.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { MenuComponent } from '../../menu/menu.component';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [CommonModule, TableRowComponent, LogoImgComponent, PaginatorComponent, MenuComponent],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.css'
})
export class TableViewComponent implements OnInit, OnChanges {
  @Input() columns: ITableColumn[] = [];
  @Input() data: ITableData[] = [];
  @Input() itemsPerPage: number = 5;
  public currentPage: number = 1;
  public visibleData: ITableData[] = [];

  ngOnInit(): void {
    this.setVisibleData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.setVisibleData();
    }
  }

  public changePage(page: number): void {
    this.currentPage = page;
    this.setVisibleData();
  }

  public itemsPerPageChange(items: number) {
    this.itemsPerPage = items;
    this.currentPage = 1;
    this.setVisibleData();
  }
  
  setVisibleData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleData = this.data.slice(startIndex, endIndex);
  }
}
