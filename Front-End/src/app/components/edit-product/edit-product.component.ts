import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
 
  categForm!: FormGroup;
  productForm!: FormGroup;
  product: Product;
  oneProduct: Product = new Product;
  id: number=0;
  isEdited: boolean | undefined;

  constructor(
    private productsService: ProductService,
    private fb: FormBuilder){
    this.product = new Product();
  }

  ngOnInit(): void {
    this.id = this.productsService.id;
    this.oneProduct = this.productsService.oneProduct;

    this.categForm = this.fb.group({
      categoryName: new FormControl(this.oneProduct.categories)
     });
    
    this.productForm = this.fb.group({
      id: new FormControl(this.oneProduct.id, [Validators.required]),
      name: new FormControl(this.oneProduct.name, [Validators.required]),
      description: new FormControl(this.oneProduct.description, [Validators.required]),
      image: new FormControl(this.oneProduct.image),
      price: new FormControl(this.oneProduct.price, [Validators.required]),
      stock: new FormControl(this.oneProduct.stock, [Validators.required]),
      categories: this.fb.array([])
      
     });
    setTimeout(()=>{
      console.log(this.oneProduct)
      console.log(this.oneProduct.categories.categoryName);
    },200)
    
  }

 get categories(){
  return this.productForm.controls["categories"] as FormArray;
 }

 addCategory(){
  this.categories.push(this.categForm);
 }

 deleteCategory(catIndex: number){
  this.categories.removeAt(catIndex);
 }

  onSubmit(value: any){
    this.product = value;
    this.productsService.editProduct(this.id, this.product);
    setTimeout(()=>{
      this.isEdited = this.productsService.isEdited;
    }, 200);
  }
}
