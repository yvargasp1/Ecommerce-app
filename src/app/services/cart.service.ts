import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { BehaviorSubject } from 'rxjs'
import { Cart, CartItem } from '../models/cart.model'

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] })

  constructor(private _snackBar: MatSnackBar) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemsInCart = items.find((_item) => _item.id === item.id)

    console.log(itemsInCart)

    if (itemsInCart) {
      itemsInCart.quantity += 1
    } else {
      items.push(item)
    }

    this.cart.next({ items })
    this._snackBar.open('Item añadido al carrito.', 'Ok', { duration: 3000 })

    console.log('Mi carro', this.cart)
  }

  removeToCart(item: CartItem): void {
    const items = [...this.cart.value.items]

    const itemsInCart = items.find((_item) => _item.id === item.id)

    console.log(itemsInCart)

    if (itemsInCart && itemsInCart.quantity != 0) {
      itemsInCart.quantity -= 1
      this.cart.next({ items })
      this._snackBar.open('Item eliminado del carrito.', 'Ok', {
        duration: 3000,
      })

      console.log('Mi carro', this.cart)
    } else {
       const filterItems = this.cart.value.items.filter(
         (_item) => _item.id !== item.id
       )

       this.cart.next({
         items: filterItems,
       })

         this._snackBar.open('Item eliminado del carrito.', 'Ok', {
           duration: 3000,
         })
    }
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0)
  }

  clearCart(): void {
    this.cart.next({
      items: [],
    })
    this._snackBar.open('Carro vacio', 'Ok', { duration: 3000 })
  }

  removeFromCart(item: CartItem): void {
    const filterItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    )

    this.cart.next({
      items: filterItems,
    })
    this._snackBar.open('Elemento eliminado', 'Ok', { duration: 3000 })
  }
}
