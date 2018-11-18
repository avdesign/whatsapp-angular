import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../models';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input()
  user: User = {
    name: '',
    email: '',
    password: ''
  }

  constructor() { }

  ngOnInit() {
  }

}
