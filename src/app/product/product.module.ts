import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { DataTablesModule } from "angular-datatables";

// Smart Components
import { ProductsComponent } from "./products/products.component";
// Stateless Components
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductNewComponent } from "./product-new/product-new.component";

const routes: Routes = [
  {
    path: "products",
    children: [
      { path: "", component: ProductsComponent },
      { path: "new", component: ProductNewComponent },
      { path: ":id", component: ProductDetailComponent },
      { path: ":id/edit", component: ProductEditComponent }
    ]
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductEditComponent,
    ProductDetailComponent,
    ProductNewComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(routes)
  ],
  providers: [],
  entryComponents: [ProductDetailComponent] // for dynamic components
})
export class ProductModule {}
