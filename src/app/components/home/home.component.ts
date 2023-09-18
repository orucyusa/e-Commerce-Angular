import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/products.model';
import { BasketService } from 'src/app/services/basket.service';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  @ViewChild('exampleModal') exampleModal: any;


  api: string = environment.api;
  product: ProductModel = new ProductModel();
  products: ProductModel[] = [
  ]
  
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _basket: BasketService
  ) { }
  
  ngOnInit(): void {
    this.urunListesiGetir();
  }

  urunListesiGetir() {
    this._http.get<any>(this.api + "products").subscribe({
      next: (res) => this.products = res,
      error: (err) => console.log(err)
    })
  }

  urunEkle() {
    this._http.post<any>(this.api + "products" , this.product).subscribe({
      next: (res) => {
        this.urunListesiGetir();
        this.product = new ProductModel ();
        
      },
      error: (err) => console.log(err)
    })
    this.exampleModal.nativeElement.style.display = 'none'; // Modalı gizleme
    document.body.classList.remove('modal-open');
  }

  sepeteUrunEkle(model: ProductModel) {
    this._http.post<any>(this.api + "baskets", model).subscribe({
      next: () => {
        console.log("Sepete ürün eklendi")
        this.getBaskets();
      },
      error: (err) => console.log(err)
    })
  }

  getBaskets() {
    this._http.get<any>(this.api + "baskets").subscribe({
      next: (res) => this._basket.baskets = res,
      error: (err) => console.log(err)
      })
  }



}
