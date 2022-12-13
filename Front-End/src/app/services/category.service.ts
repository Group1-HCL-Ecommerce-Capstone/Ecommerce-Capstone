import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string;

  constructor(private http: HttpClient) { 
    this.categoryUrl = 'https://ecommerce-capstone-be.azurewebsites.net/categories'
  }

  public findCategsUnderProduct(prdId: number){
    return this.http.get<any>(this.categoryUrl+"/product_categories/"+prdId);
  }


}
