import { Component, EventEmitter, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>()
  @Output() itemsCountChange = new EventEmitter<number>()
  @Output() sortCountChange = new EventEmitter<string>()

  sort = 'desc'
  itemsShowCount = 12
  constructor() {}
  ngOnInit(): void {}

  onSortUpdated(newSort: string): void {
    this.sort = newSort
    this.sortCountChange.emit(newSort)
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count
    this.itemsCountChange.emit(count)
  }

  onColumnsUpdate(colsNum: number): void {
    //console.log(colsNum)
    this.columnsCountChange.emit(colsNum)
  }
}
