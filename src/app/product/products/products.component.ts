import { Component, OnInit } from "@angular/core";

import { Product } from "../models/product.interface";

import { ProductService } from "../product.service";

@Component({
  selector: "products",
  styleUrls: ["products.component.css"],
  template: `
    <div>
      <product-list [products]="products"></product-list>
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Array<Product>;
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService
      .getProducts()
      .subscribe((products: Product[]) => (this.products = products));
  }
}
