import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { switchMap } from "rxjs/operators";

import { ProductService } from "../product.service";

import { Product } from "../models/product.interface";

@Component({
  selector: "product-detail",
  styleUrls: ["product-detail.component.css"],
  template: `
    <div class="container">
      <h3 class="display-5">Product Details</h3>
      <p><strong>Name</strong>: {{ product?.name }}</p>
      <p><strong>Quantity</strong>: {{ product?.quantity }}</p>
      <p><strong>Price</strong>: {{ product?.price }}</p>
      <p><strong>Created on</strong>: {{ product?.createdAt | date }}</p>
      <br />
      <div class="buttons">
        <button (click)="goBack()" class="btn btn-secondary">Go Back</button>
        <button *ngIf="product?.quantity === 0" (click)="deleteProduct()">
          <i class="fa fa-trash"></i> Delete
        </button>
      </div>
    </div>
  `
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.route.params
      .pipe(
        switchMap((data: Params) => {
          return this.productService.getProduct(data.id);
        })
      )
      .subscribe((data: Product) => {
        this.product = data;
      });
  }

  goBack() {
    this.location.back();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product).subscribe(message => {
      console.log(message);
      this.goBack();
    });
  }
}
