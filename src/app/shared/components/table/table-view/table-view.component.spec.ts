import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { TableViewComponent } from './table-view.component';
import { CommonModule } from '@angular/common';
import { ColumnType, productTableColumnsMock } from '../../../types/ITable.model';
import { By } from '@angular/platform-browser';
import { LogoImgComponent } from '../../logo-img/logo-img.component';
import { PaginatorComponent } from '../paginator/paginator.component';
import { productsMock } from '../../../mocks/Product.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableViewComponent, CommonModule, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    component.columns = productTableColumnsMock;
    component.data = productsMock;
    fixture.detectChanges();
  });

  it('should create and initialize with default values', () => {
    fixture.detectChanges(); 
    expect(component).toBeTruthy();
    expect(component.visibleData.length).toBe(2);
  });
  
  it('should update visible data when data input changes', () => {
    component.data = Array.from({ length: 15 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));
    component.ngOnChanges({
      data: new SimpleChange({}, { data: component.data }, true)
    });
    fixture.detectChanges();
    expect(component.visibleData.length).toBe(5);
  });

  it('should paginate data correctly when changing pages', () => {
    component.data = Array.from({ length: 50 }, (_, i) => ({ id: i, name: `Item ${i + 1}` }));
    fixture.detectChanges(); 
  
    component.changePage(2);
    fixture.detectChanges();
    expect(component.currentPage).toBe(2);
    expect(component.visibleData[0]['name']).toBe('Item 6');
    expect(component.visibleData.length).toBe(5);
  
    component.itemsPerPageChange(10);
    fixture.detectChanges();
    expect(component.itemsPerPage).toBe(10);
    expect(component.currentPage).toBe(1);
    expect(component.visibleData.length).toBe(10);
  });
  
  it('should display correct table headers', () => {
    const headerCells = fixture.debugElement.queryAll(By.css('th'));
    expect(headerCells.length).toEqual(component.columns.length);
    expect(headerCells[0].nativeElement.textContent).toContain('Logo');
    expect(headerCells[1].nativeElement.textContent).toContain('Name');
    expect(headerCells[2].nativeElement.textContent).toContain('Description');
    expect(headerCells[3].nativeElement.textContent).toContain('Date of Release');
    expect(headerCells[4].nativeElement.textContent).toContain('Date of Revision');
  });

  it('should render rows and format data correctly', () => {
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toEqual(2);
    const firstRowCells = rows[0].queryAll(By.css('td'));
    expect(firstRowCells[1].nativeElement.textContent).toContain('Product One');
    expect(firstRowCells[2].nativeElement.textContent).toContain('Description of product one.');

    const image = firstRowCells[0].query(By.directive(LogoImgComponent));
    expect(image.componentInstance.imgSrc).toBe('http://example.com/logo1.png');
  });
  
  it('should update visible data on page change via PaginatorComponent', () => {
    component.itemsPerPage = 1; 
    fixture.detectChanges();
    let paginator = fixture.debugElement.query(By.directive(PaginatorComponent)).componentInstance as PaginatorComponent;
    paginator.pageChanged.emit(2);
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(1); 
    expect(component.currentPage).toBe(2);
  });
  
});
