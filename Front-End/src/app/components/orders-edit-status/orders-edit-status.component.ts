import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-orders-edit-status',
  templateUrl: './orders-edit-status.component.html',
  styleUrls: ['./orders-edit-status.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersEditStatusComponent implements OnInit {
  orderDetails: any;
  oneOrder: any;
  id: number=0;
  isEdited: boolean | undefined;
  selectedStatus: string='';
  statuses: Status[] = [
    //{value: 'ordered', viewValue: 'Ordered'},
    {value: 'shipped', viewValue: 'Shipped'},
    {value: 'delivered', viewValue: 'Delivered'},
  ];

  constructor(
    private orderService: OrderService){
  }

  ngOnInit(): void {
    this.id = this.orderService.currentOrderId;
    this.oneOrder = this.orderService.oneOrder;
    setTimeout(()=>{
      console.log(this.oneOrder)
    },200)
    
  }

  onSubmit(value: any){
    this.orderDetails = value;
    console.log(this.orderDetails.value.status);
    console.log(this.id);
    this.orderService.updateStatus(this.id, this.orderDetails.value.status);
    setTimeout(()=>{
      this.isEdited = this.orderService.isEdited;
      console.log("editcomp "+this.isEdited)
    }, 1500);
  }

}
