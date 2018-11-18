import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  search = '';

  @Output()
  onSearch: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }


  ngOnInit() {
  }

  submit(){
    this.onSearch.emit(this.search);
    return false;
  }

}
