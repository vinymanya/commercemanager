import { Component, Input, OnInit } from "@angular/core";

import { Product } from "../models/product.interface";

@Component({
  selector: "product-list",
  styleUrls: ["product-list.component.css"],
  template: `
    <div class="container">
      <div>
        <h3 class="display-5">Product List</h3>
        <a routerLink="new" class="btn-link">Add a new product</a>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <table
            datatable
            [dtOptions]="dtOptions"
            [dtTrigger]="dtTrigger"
            class="row-border hover"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let product of products">
                <td>{{ product._id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.quantity }}</td>
                <td>{{ product.price | currency: "USD" }}</td>
                <td>{{ product.createdAt | date }}</td>
                <td>
                  <a
                    class="btn btn-link"
                    routerLink="{{ product._id }}/edit"
                    queryParamsHandling
                    preserveFragment
                  >
                    <i class="fa fa-pencil" aria-hidden="true"></i> Edit
                  </a>
                  <a class="btn btn-link" routerLink="{{ product._id }}">
                    <i class="fa fa-pencil" aria-hidden="true"></i> Detail
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent implements OnInit {
  @Input()
  products: Array<Product>;

  constructor() {}

  ngOnInit() {}
}
