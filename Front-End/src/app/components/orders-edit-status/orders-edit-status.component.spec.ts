import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersEditStatusComponent } from './orders-edit-status.component';

describe('OrdersEditStatusComponent', () => {
  let component: OrdersEditStatusComponent;
  let fixture: ComponentFixture<OrdersEditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersEditStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersEditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
