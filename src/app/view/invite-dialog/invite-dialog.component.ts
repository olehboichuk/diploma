import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss']
})
export class InviteDialogComponent {

  link = '';

  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>) {
  }

  closeModal(): void {
    this.dialogRef.close();
  }

}
