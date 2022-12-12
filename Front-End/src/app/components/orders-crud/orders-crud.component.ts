import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders-crud',
  templateUrl: './orders-crud.component.html',
  styleUrls: ['./orders-crud.component.css']
})
export class OrdersCrudComponent implements OnInit {

  currentUser: any;
  orderDetails: any;
  id: number = 0;
  oneOrder: any;

  constructor(
    private orderService: OrderService,
    private localStore: LocalService,
    private router: Router
  ) { 
    this.currentUser = this.localStore.getData();
  }

  ngOnInit(): void {
    this.orderService.findAllOrders().subscribe(data=>{
      setTimeout(()=>{
        this.orderDetails = data;

        console.log(this.orderDetails);
      },200)
    })
  }

  public editStatus(orderId: number){
    this.orderService.select(orderId);

    setTimeout(()=>{
      this.id = this.orderService.currentOrderId;
      this.oneOrder = this.orderService.oneOrder;
      console.log("orderid "+this.id);
      console.log(this.oneOrder);
      this.router.navigate(['manage/orders/status'])
    },200)
  }

}
