import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  products: Product[] = [];
  dataLoaded = false;
  filterText = "";


  constructor(private productService: ProductService,
    private activatedRoute: ActivatedRoute, private toastrService: ToastrService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["categoryId"]) {
        this.getProductsByCategory(params["categoryId"]);
      } else {
        this.getProducts()
      }
    })
    /*     this.getProducts();
        console.log("Init çalıştı") */

  }

  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  getProductsByCategory(categoryId: number) {
    this.productService.getProductsByCategory(categoryId).subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    })
  }

  addToCart(product: Product) {
    console.log(product);

    if (product.productId == 1) {
      this.toastrService.error("Sepete eklenemedi", product.productName)

    } else {
      this.cartService.addToCart(product);
      this.toastrService.success("Sepete eklendi", product.productName)

    }
  }

}
