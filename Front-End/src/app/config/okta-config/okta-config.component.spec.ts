import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OktaConfigComponent } from './okta-config.component';

describe('OktaConfigComponent', () => {
  let component: OktaConfigComponent;
  let fixture: ComponentFixture<OktaConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OktaConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OktaConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
