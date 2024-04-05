import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MOCK_PRODUCTS } from './mock-products';
import { Product } from './models/products';
import { ProductService } from './services/web-product.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'women-clothing';
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  searchText: string = '';
  blogUrl: string = '';
  updateMode: boolean = false;
  selectedProduct: Product | null = null;
  productName: string = '';
  productDescription: string = '';
  productPrice: number = 0;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.totalPages = 5;
    this.loadProducts();
    this.blogUrl = this.productService.getBlogUrl();
  }
  loadProducts() {
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe(
      (data: Product[]) => {
        this.products = [...data];
        this.paginatedProducts = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.products = this.products.filter(product => product.id !== id);
      },
      error => {
        console.log('Error deleting product:', error);
      }
    );
  }
  enableUpdateMode(product: Product) {
    this.updateMode = true;
    this.selectedProduct = product;
  }

  updateProduct(product: Product) {
    this.selectedProduct = product;
    const modalElement = document.getElementById('productFormModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    } else {
      console.error('Element with id "productFormModal" not found.');
    }

  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.loadProducts();
  }

  search() {
    if (this.searchText.trim() === '') {
      this.loadProducts();
      return;
    }
    this.products = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.currentPage = 1;
  }

  getPaginationArray(totalPages: number): number[] {
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }
}
