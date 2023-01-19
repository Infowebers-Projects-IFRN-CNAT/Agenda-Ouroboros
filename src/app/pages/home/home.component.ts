import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ModalLoginComponent } from 'src/app/components/modal-login/modal-login.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(public dialog: MatDialog, private router: Router) { }

	openDialog() {
		const dialogRef = this.dialog.open(ModalLoginComponent, {
			width: '600px'
		});

		dialogRef.afterClosed().subscribe(async result => {
			if(result)
				this.router.navigate(['home']);
			
			return;
		});
	}
}