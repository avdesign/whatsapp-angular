import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'category-search',
  templateUrl: './category-search.component.html',
  styleUrls: ['./category-search.component.css']
})
export class CategorySearchComponent implements OnInit {

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