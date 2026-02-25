import { Component, signal } from '@angular/core';
import { ProductList } from './components/product-list/product-list';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  imports: [ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('online-store');

  protected selectedCategoryId = signal<number | null>(null);
  protected currentProducts = signal<Product[]>([]);
  protected categories: Category[];


  constructor(private readonly productService: ProductService) {
    this.categories = this.productService.getCategories();
    if (this.categories.length > 0) {
      this.selectCategory(this.categories[0].id);
    }
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId.set(categoryId);
    this.currentProducts.set(
      this.productService.getProductsByCategoryId(categoryId)
    );
  }

  onDeleteProduct(productId: number): void {
    this.currentProducts.update((list) =>
      list.filter((p) => p.id !== productId)
    );
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategoryId() === categoryId;
  }
}
