import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-component',
  templateUrl: './warning-component.component.html',
  styleUrls: ['./warning-component.component.sass'],
})
export class WarningComponentComponent {
  text: String | undefined;
  url: String | null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<WarningComponentComponent>,
    private router: Router
  ) {
    this.text = data.text;
    this.url = data.url;
  }

  navigateToLogin() {
    this.dialogRef.close();
    this.router.navigate([this.url]);
  }
}
