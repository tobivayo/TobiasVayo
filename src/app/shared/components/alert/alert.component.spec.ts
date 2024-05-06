import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { AlertService } from '../../services/alert.service';
import { Subject } from 'rxjs';
import { AlertTypes, IAlert } from '../../types/IAlert.model';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;
  let alertServiceMock: jasmine.SpyObj<AlertService>;
  let alertState$: Subject<IAlert>;

  beforeEach(async () => {
    alertState$ = new Subject<IAlert>();
    alertServiceMock = jasmine.createSpyObj('AlertService', [], { alertState$: alertState$.asObservable() });

    await TestBed.configureTestingModule({
      imports: [AlertComponent],
      providers: [{ provide: AlertService, useValue: alertServiceMock }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize without an alert', () => {
    expect(component).toBeTruthy();
    expect(component.alert).toBeUndefined();
  });

  it('should display an alert when it is emitted by the service', () => {
    const testAlert: IAlert = { type: AlertTypes.Success, message: 'Test alert' };
    alertState$.next(testAlert);
    fixture.detectChanges();
  
    expect(component.alert).toEqual(testAlert);
  });
  
  it('should clear the alert after 5000 milliseconds', fakeAsync(() => {
    const testAlert: IAlert = { type: AlertTypes.Success, message: 'Test alert' };
    alertState$.next(testAlert);
    fixture.detectChanges();
  
    tick(5000);
    expect(component.alert).toBeUndefined();
  }));
  
});
