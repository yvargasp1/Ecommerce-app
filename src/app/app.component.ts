import { Component, OnInit } from '@angular/core'
import { Cart } from './models/cart.model'
import { CartService } from './services/cart.service'

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  cart: Cart = {
    items: [],
  }
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart
      console.log(this.cart);
    })
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  title = 'ecommerce'
}
