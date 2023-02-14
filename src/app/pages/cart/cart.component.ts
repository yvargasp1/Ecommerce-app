import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Cart, CartItem } from 'src/app/models/cart.model'
import { CartService } from 'src/app/services/cart.service'
import { loadStripe } from '@stripe/stripe-js'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Cart = {
    items: [],
  }

  dataSource: Array<CartItem> = []
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]
  constructor(private cartService: CartService, private http: HttpClient) {}

  ngOnInit(): void {
    //this.dataSource = this.cart.items
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart
      this.dataSource = this.cart.items
    })
    console.log(this.dataSource)
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void {
    this.cartService.clearCart()
  }

  onRemoveCart(item: CartItem): void {
    this.cartService.removeFromCart(item)
  }
  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item)
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeToCart(item)
  }

  onCheckout(): void {
    this.http
      .post(
        'http://localhost:4242/checkout',

        {
          items: this.cart.items,
        }
      )
      .subscribe(async (res: any) => {
        let stripe = await loadStripe(
          'pk_test_51MZh1tItAei3rdCSZYJebLzkJ8Ox6JZGDvWMVXLP9fAfRmEYd6kYAZDZWUuXCAXM9Kz6OtArjQjl0KigOFtHQs7m00WkzvXxv6'
        )

        stripe?.redirectToCheckout({
          sessionId: res.id,
        })
      })
  }
}
