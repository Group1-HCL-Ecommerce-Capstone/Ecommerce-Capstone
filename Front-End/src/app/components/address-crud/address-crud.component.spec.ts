import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCrudComponent } from './address-crud.component';

describe('AddressCrudComponent', () => {
  let component: AddressCrudComponent;
  let fixture: ComponentFixture<AddressCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressCrudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
