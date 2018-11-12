import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authServer: AuthService, private router: Router) { }

  ngOnInit() {
  }

  setNameAuth(){
    return this.authServer.me.name;
  }

  logout(){
    this.authServer.logout()
      .subscribe(() => this.router.navigate(['login']))
  }

}
