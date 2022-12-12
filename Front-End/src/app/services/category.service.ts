import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string;

  constructor(private http: HttpClient) { 
    this.categoryUrl = 'http://localhost:8181/categories'
  }

  public findCategsUnderProduct(prdId: number){
    return this.http.get<any>(this.categoryUrl+"/product_categories/"+prdId);
  }


}
