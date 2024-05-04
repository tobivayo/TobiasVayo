import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoImgComponent } from './logo-img.component';

describe('LogoImgComponent', () => {
  let component: LogoImgComponent;
  let fixture: ComponentFixture<LogoImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoImgComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
