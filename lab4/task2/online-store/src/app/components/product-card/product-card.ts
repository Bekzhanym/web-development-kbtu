import { Component, input, output, signal, computed } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();
  deleteProduct = output<number>();

  private readonly whatsAppNumber = '77478369037';

  likesCount = signal(0);

  displayedLikes = computed(() => {
    const p = this.product();
    return p.likes + this.likesCount();
  });

  get carouselImages(): string[] {
    const p = this.product();
    if (p.images?.length) {
      return p.images;
    }
    return [p.image];
  }

  get currentImage(): string {
    return this.carouselImages[this.currentImageIndex] ?? this.product().image;
  }

  currentImageIndex = 0;

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

  like(): void {
    this.likesCount.update((n) => n + 1);
  }

  remove(): void {
    this.deleteProduct.emit(this.product().id);
  }

  shareViaWhatsApp(): void {
    const text = `Check out this product: ${this.product().link}`;
    const url = `https://wa.me/${this.whatsAppNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  shareViaTelegram(): void {
    const text = encodeURIComponent(`Check out this product: ${this.product().link}`);
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product().link)}&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  get fullStars(): number {
    return Math.floor(this.product().rating);
  }

  get hasHalfStar(): boolean {
    return this.product().rating % 1 >= 0.5;
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
    return (
      new Intl.NumberFormat('kk-KZ', {
        style: 'decimal',
        minimumFractionDigits: 0,
      }).format(this.product().price) + ' ₸'
    );
  }
}
