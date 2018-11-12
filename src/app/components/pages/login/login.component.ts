import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {
    email: 'admin@user.com',
    password: 'secret'
  };

  constructor(private authService: AuthService, private router: Router) { 

  }

  showMessageError = false;

  ngOnInit() { 
    
  }

  /**
   * Submit Form
   */
  submit(){
    this.authService.login(this.credentials)
      .subscribe((data) => {
        this.router.navigate(['products/list']);
      }, () => this.showMessageError = true);  
    return false;
  }

  

}

