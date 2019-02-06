import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  search = "";

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
