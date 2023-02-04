import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ModalLoginComponent } from 'src/app/components/modal-login/modal-login.component';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent {
	constructor(public dialog: MatDialog, private router: Router, private userService: UserService) {
		this.checkUser();
	}

	async checkUser() {
		await this.userService.checkUser().subscribe(async data => {
			if(data !== undefined){
				this.router.navigate(['home']);
			}
		}, error => {
			console.log(error);
			// this.redirectSwal.fire();
		});
	}

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

	redirectNewUser(){
		this.router.navigate(['new-user']);
	}
}