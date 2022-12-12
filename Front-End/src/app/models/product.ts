import { Category } from "./category";

export class Product {
    id: number = 0;
    name: string = "";
    description: string = "";
    image: string = "";
    price: string = "";
    stock: number = 0;
    available: boolean = false;
    categories: any;
}
