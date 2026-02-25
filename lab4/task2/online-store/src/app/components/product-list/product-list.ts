import { Component, input, output } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = input.required<Product[]>();
  deleteProduct = output<number>();

  onDelete(id: number): void {
    this.deleteProduct.emit(id);
  }
}
