import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  setNameAuth(){
    return this.authService.me.name;
  }

  getPhotoAuth(){
    return this.authService.me.profile.photo_url;
  }

  logout(){
    this.authService.logout()
      .subscribe(() => this.router.navigate(['login']))
  }

}
