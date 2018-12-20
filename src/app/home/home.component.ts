import { AuthService } from './../_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authServ: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.authServ.doLogout().then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log('Logout error', error);
    });

  }

}
