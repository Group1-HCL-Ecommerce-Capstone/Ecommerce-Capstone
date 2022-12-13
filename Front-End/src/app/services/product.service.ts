import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl: string;
  currentUser: any;
  isAdded: boolean = false;
  isEdited: boolean = false;
  errMessage: string = '';
  id: any;
  oneProduct:any;

  constructor(
    private http: HttpClient,
    private localStorage: LocalService) { 
    this.productsUrl = 'https://ecommerce-capstone-be.azurewebsites.net/products';
    this.currentUser = localStorage.getData();
  }

  public findAll(): Observable<any[]>{
    return this.http.get<any[]>(this.productsUrl + '/all');
  }

  public addProduct(product: Product){
    this.http.post<any>(this.productsUrl + "/add", product).subscribe((response) => {
      console.log(response);
      this.isAdded = true;
    },
      error => {
        this.isAdded = false;
        this.errMessage = error.error.message;
      });
  }

  public editProduct(prdId: number, product: Product){
    this.http.patch<any>(this.productsUrl+'/update/'+prdId, product).subscribe((response) => {
      console.log(response);
      this.isEdited = true;
    },
      error => {
        this.isEdited = false;
        this.errMessage = error.error.message;
      });
  }

  public findProduct(id: number){
    return this.http.get<any>(this.productsUrl+'/find/'+id);
  }

  public deleteProduct(id: number){
    return this.http.delete(this.productsUrl+'/delete/'+id);
  }

  public select(prdId: number){
    this.id = prdId;
    this.findProduct(this.id).subscribe(data=>{
      this.oneProduct = data;
    })
  }
}
