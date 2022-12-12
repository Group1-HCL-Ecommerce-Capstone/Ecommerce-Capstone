import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { LocalService } from 'src/app/services/local.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product;
  currentUser: any;
  isAdded: boolean | undefined;

  constructor(
    private productsService: ProductService,
    private router: Router,
    private localStorage: LocalService
  ){
    this.product = new Product();
    this.currentUser = this.localStorage.getData();
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){    
    this.productsService.addProduct(this.product)
    setTimeout(()=>{
      this.isAdded = this.productsService.isAdded;
    }, 200);
      
    //form.resetForm();
    //this.router.navigate(['manage/products'])
  }
  
}
