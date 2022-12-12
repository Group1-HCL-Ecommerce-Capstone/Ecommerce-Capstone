import { Component, OnInit } from '@angular/core';
import { LocalService } from 'src/app/services/local.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  currentUser: any;
  orderDetails: any;
  id: number = 0;
  constructor(
    private orderService: OrderService,
    private localStore: LocalService
  ) { 
    this.currentUser = this.localStore.getData();
  }

  ngOnInit(): void {
    this.orderService.findCurrentUserOrders().subscribe(data=>{
      setTimeout(()=>{
        this.orderDetails = data;

        console.log(this.orderDetails);
      },200)
    })
  }

}
