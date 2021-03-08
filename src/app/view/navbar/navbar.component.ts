import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {InviteDialogComponent} from '../invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router,
              private authService: AuthService,
              private matDialog: MatDialog) {
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

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const modalDialog = this.matDialog.open(InviteDialogComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/edit-file-invite', result]);
      }
    });

  }

}
