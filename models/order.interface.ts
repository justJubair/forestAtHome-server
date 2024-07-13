import { IProduct } from "./product.interface";

export interface IOrder {
  name: string;
  phone: string;
  address: string;
  products: IProduct[];
}
