import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { AlertTypes, IAlert } from '../types/IAlert.model';
import { mockAlerts } from '../mocks/Alert.mock';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit an alert when showAlert is called', (done: DoneFn) => {
    const testAlert: IAlert = mockAlerts[0]

    service.alertState$.subscribe(alert => {
      expect(alert).toEqual(mockAlerts[0]);
      done();
    });

    service.showAlert(mockAlerts[0]);
  });

  it('should handle different types of alerts', (done: DoneFn) => {
    const testAlert: IAlert = mockAlerts[2]

    service.alertState$.subscribe(alert => {
      expect(alert.type).toBe(AlertTypes.Danger);
      expect(alert.message).toBe('Error occurred during processing your request.');
      done();
    });

    service.showAlert(testAlert);
  });
});
