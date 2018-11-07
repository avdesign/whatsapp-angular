import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) { 

  }

  showMesageError = false;

  ngOnInit() { 
    
  }

  /**
   * Submit Form
   */
  submit(){
    this.http.post<any>('http://whatsapp.test/api/login', this.credentials)
      .subscribe((data) => {
        this.router.navigate(['categories/list']);
        const token = data.token;
        window.localStorage.setItem('token', token);
        this.http.get('http://whatsapp.test/api/categories');
      }, () => this.showMesageError = true);  
    return false;
  }

}

