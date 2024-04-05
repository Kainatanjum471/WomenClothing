import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductService } from '../services/web-product.service';
import { Product } from '../models/products';
import { OnChanges, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnChanges {
  @Input() selectedProduct: Product | null = null;
  productName: string = '';
  productDescription: string = '';
  productPrice: number = 0;

  constructor(private productService: ProductService, private cdr: ChangeDetectorRef) { }
  ngOnChanges() {
    if (this.selectedProduct) {
      this.productName = this.selectedProduct.name || '';
      this.productDescription = this.selectedProduct.description || '';
      this.productPrice = this.selectedProduct.price || 0;
      this.cdr.markForCheck();
    }
  }
  addProduct() {
    if (this.selectedProduct) {
      const newProduct = {
        id: this.selectedProduct.id,
        imageUrl: 'https://via.placeholder.com/150',
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice
      };

      this.productService.updateProduct(newProduct.id, newProduct).subscribe(
        (product) => {
          console.log('Product updated:', product);
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
    else {
      const newProduct = {
        id: 0,
        imageUrl: 'https://via.placeholder.com/150',
        name: this.productName,
        description: this.productDescription,
        price: this.productPrice
      };
      this.productService.addProduct(newProduct).subscribe(
        (product) => {
          console.log('Product added:', product);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
