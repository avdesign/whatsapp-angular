import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {

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
