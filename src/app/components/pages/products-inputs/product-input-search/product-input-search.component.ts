import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-input-search',
  templateUrl: './product-input-search.component.html',
  styleUrls: ['./product-input-search.component.css']
})
export class ProductInputSearchComponent implements OnInit {

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
