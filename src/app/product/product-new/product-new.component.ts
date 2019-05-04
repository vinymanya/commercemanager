import { Component, OnInit } from "@angular/core";
import { Product } from "../models/product.interface";
import { Router } from "@angular/router";
import { ProductService } from "../product.service";

@Component({
  selector: "product-new",
  styleUrls: ["product-new.component.css"],
  template: `
    <div>
      <h3>Add A New Product</h3>
      <pre>{{ createForm.value | json }}</pre>
      <form
        #createForm="ngForm"
        (ngSubmit)="onSubmit(createForm.value, createForm.valid)"
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
        <p
          class="invalid"
          *ngIf="quantity.errors?.minlength && quantity.touched"
        >
          Quantity must be greater than or equal to zero
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
        <p class="invalid" *ngIf="price.errors?.minlength && price.touched">
          Price must be greater than or equal to zero
        </p>

        <button (click)="createForm.resetForm({})">RESET</button>
        <button type="submit" [disabled]="createForm.invalid">
          CREATE
        </button>
      </form>
    </div>
  `
})
export class ProductNewComponent implements OnInit {
  product: Product = {
    _id: "",
    name: "",
    quantity: 0,
    price: 0
  };
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  onSubmit(data, isValid) {
    if (isValid) {
      console.log(data);
      this.productService.addProduct(data).subscribe(product => {
        this.product = product;
        this.router.navigate([`/products/${product._id}`]);
      });
    }
  }
}
