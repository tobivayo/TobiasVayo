import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';
import { ActionType } from '../../types/IMenu.model';
import { menuItemListMock } from '../../mocks/MenuItem.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      imports: [MenuComponent, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.items.length).toBe(0);
  });

  it('should navigate to the route when item action is Navigate', () => {
    const item = menuItemListMock[0];
    component.onMenuItemClick(item);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/edit/p1');
  });

  it('should log data when item action is Dialog', () => {
    const consoleSpy = spyOn(console, 'log');
    const item = menuItemListMock[1];
    component.onMenuItemClick(item);
    expect(consoleSpy).toHaveBeenCalledWith('item.data', item.data);
  });
  
  it('should execute custom action when item type is Custom', () => {
    const actionSpy = jasmine.createSpy('action');
    const item = { type: ActionType.Custom, label: 'custom', action: actionSpy };
    component.onMenuItemClick(item);
    expect(actionSpy).toHaveBeenCalled();
  });
  
});
