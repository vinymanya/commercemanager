import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { switchMap } from "rxjs/operators";

import { ProductService } from "../product.service";
import { Product } from "../models/product.interface";

@Component({
  selector: "product-edit",
  styleUrls: ["product-edit.component.css"],
  template: `
    <div>
      <h3>Update Product</h3>
      <pre>{{ updateForm.value | json }}</pre>
      <form
        #updateForm="ngForm"
        (ngSubmit)="onSubmit(updateForm.valid)"
        novalidate
      >
        <label
          >Name:
          <input
            type="text"
            name="name"
            [ngModel]="product?.name"
            #name="ngModel"
            required
            minlength="3"
          />
        </label>
        <p class="invalid" *ngIf="name.errors?.required && name.touched">
          Product name is required!
        </p>
        <p class="invalid" *ngIf="name.errors?.minlength && name.touched">
          Product name must be at least 3 characters!
        </p>
        <label
          >Quantity:
          <input
            type="number"
            name="quantity"
            [ngModel]="product?.quantity"
            #quantity="ngModel"
            required
            minlength="0"
          />
        </label>
        <p
          class="invalid"
          *ngIf="quantity.errors?.required && quantity.touched"
        >
          Quantity is required!
        </p>
        <p class="invalid" *ngIf="quantity.errors?.minlength">
          Quantity must be greater than or equal to zero!
        </p>
        <label
          >Price:
          <input
            type="number"
            name="price"
            [ngModel]="product?.price"
            required
            minlength="0"
            #price="ngModel"
          />
        </label>
        <p class="invalid" *ngIf="price.errors?.required && price.touched">
          Price is required!
        </p>
        <p class="invalid" *ngIf="price.errors?.minlength">
          Price must be greater than or equal to zero!
        </p>
        <button (click)="updateForm.resetForm({})">RESET</button>
        <button type="submit" [disabled]="updateForm.invalid">
          UPDATE
        </button>
      </form>
    </div>
  `
})
export class ProductEditComponent implements OnInit {
  product: Product;
  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getProduct();
  }

  getProduct(): void {
    this.route.params
      .pipe(
        switchMap(data => {
          return this.productService.getProduct(data.id);
        })
      )
      .subscribe((data: Product) => {
        this.product = data;
      });
  }

  onSubmit(isValid) {
    if (isValid) {
      this.productService.updateProduct(this.product).subscribe(product => {
        this.product = product;
        this.router.navigate([`/products/${this.product._id}`]);
      });
    }
  }
}
