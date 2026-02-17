import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;

  currentImageIndex = 0;

  private readonly whatsAppNumber = '77478369037';

  get carouselImages(): string[] {
    if (this.product.images?.length) {
      return this.product.images;
    }
    return [this.product.image];
  }

  get currentImage(): string {
    return this.carouselImages[this.currentImageIndex] ?? this.product.image;
  }

  prevImage(): void {
    this.currentImageIndex =
      this.currentImageIndex <= 0
        ? this.carouselImages.length - 1
        : this.currentImageIndex - 1;
  }

  nextImage(): void {
    this.currentImageIndex =
      this.currentImageIndex >= this.carouselImages.length - 1
        ? 0
        : this.currentImageIndex + 1;
  }

  shareViaWhatsApp(): void {
    const text = `Check out this product: ${this.product.link}`;
    const url = `https://wa.me/${this.whatsAppNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  get fullStars(): number {
    return Math.floor(this.product.rating);
  }

  get hasHalfStar(): boolean {
    return this.product.rating % 1 >= 0.5;
  }

  get emptyStars(): number {
    return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
  }

  get fullStarsArray(): number[] {
    return Array.from({ length: this.fullStars }, (_, i) => i);
  }

  get emptyStarsArray(): number[] {
    return Array.from({ length: this.emptyStars }, (_, i) => i);
  }

  get formattedPrice(): string {
    return new Intl.NumberFormat('kk-KZ', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(this.product.price) + ' ₸';
  }
}
