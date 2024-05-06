import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PaginatorComponent,
        CommonModule,
        FormsModule
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and default values be set', () => {
    expect(component).toBeTruthy();
    expect(component.totalItems).toBe(0);
    expect(component.itemsPerPage).toBe(5);
    expect(component.totalPages).toBe(0);
  });

  it('should navigate to the next page and emit the current page number', () => {
    component.totalItems = 50;
    fixture.detectChanges();
  
    spyOn(component.pageChanged, 'emit');
  
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  
    component.previousPage();
    expect(component.currentPage).toBe(1);
    expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
  });
  
  it('should not navigate beyond available pages', () => {
    component.totalItems = 15;
    component.currentPage = 3;
    fixture.detectChanges();
  
    spyOn(component.pageChanged, 'emit');
    component.nextPage();
    expect(component.currentPage).toBe(3);
    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('should reset to first page and emit items per page change', () => {
    spyOn(component.itemsPerPageChanged, 'emit');
    component.itemsPerPage = 10;
    component.onItemsPerPageChange();
  
    expect(component.currentPage).toBe(1);
    expect(component.itemsPerPageChanged.emit).toHaveBeenCalledWith(10);
  });  
});
