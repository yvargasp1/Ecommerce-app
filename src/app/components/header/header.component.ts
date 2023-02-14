import { Component, Input, OnInit } from '@angular/core'
import { Cart, CartItem } from 'src/app/models/cart.model'
import { CartService } from 'src/app/services/cart.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: [] }
  itemsQuatity = 0

  @Input()
  get cart(): Cart {
  //  console.log(this._cart);
    return this._cart
  }

  set cart(cart: Cart) {
    this._cart = cart

    this.itemsQuatity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
