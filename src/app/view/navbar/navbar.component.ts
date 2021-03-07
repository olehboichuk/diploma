import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService) {
  }

  userName: string;

  ngOnInit(): void {
    this.userName = localStorage.getItem('login').toLocaleUpperCase();
  }

  logout(): void {
    this.authService.logout().subscribe(res => {
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}
