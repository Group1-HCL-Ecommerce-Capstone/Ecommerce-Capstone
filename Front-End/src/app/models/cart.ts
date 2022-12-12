import { Product } from "./product";

export class Cart {
    id: number = 0;
    quantity: number = 0;
    price: number = 0;
    product!: Product;
}

