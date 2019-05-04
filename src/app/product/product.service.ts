import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { tap, catchError, map } from "rxjs/operators";

// import { PRODUCTS } from "./mock-products";
import { Product } from "./models/product.interface";

// Create some http header options
const httpOptions = {
  headers: new HttpHeaders({ "Content-type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private baseUrl: string = `http://localhost:8000/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    // return of(PRODUCTS);
    return this.http.get<Product[]>(`${this.baseUrl}`).pipe(
      tap(_ => this.log("Fetched products")),
      catchError(this.handleError<Product[]>("getProducts", []))
    );
  }

  /** GET Product by id. Return `undefined` when id not found */
  getProductNo404<Data>(id: any): Observable<Product> {
    const url = `${this.baseUrl}/?id=${id}`;
    return this.http.get<Product[]>(url).pipe(
      map(products => products[0]), // returns a {0|1} element array
      tap(p => {
        const outcome = p ? `fetched` : `did not find`;
        this.log(`${outcome} product id=${id}`);
      }),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  /** GET product by id. Will 404 if id not found */
  getProduct(id: any): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      tap(_ => this.log(`Fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  // Update a product
  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put(`${this.baseUrl}/${product._id}`, product, httpOptions)
      .pipe(
        tap(_ => this.log(`updated product id=${product._id}`)),
        catchError(this.handleError<any>("updateProduct"))
      );
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${this.baseUrl}/new`, product, httpOptions)
      .pipe(
        tap((newProduct: Product) =>
          this.log(`added product w/ id=${newProduct._id}`)
        ),
        catchError(this.handleError<Product>("addProduct"))
      );
  }

  // Delete a product
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === "number" ? product : product._id;
    return this.http.delete<Product>(`${this.baseUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>("deleteProduct"))
    );
  }

  // Gracefully Handle error messages from the server
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    console.log(`ProductService: ${message}`);
  }
}
