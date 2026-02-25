import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { CATEGORIES } from '../data/categories.data';
import { PRODUCTS } from '../data/products.data';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getCategories(): Category[] {
    return CATEGORIES;
  }

  getProducts(): Product[] {
    return [...PRODUCTS];
  }

  getProductsByCategoryId(categoryId: number): Product[] {
    return PRODUCTS.filter((p) => p.categoryId === categoryId);
  }
}
