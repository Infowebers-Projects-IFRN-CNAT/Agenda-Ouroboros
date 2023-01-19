import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog'; 
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-modal-login',
	templateUrl: './modal-login.component.html',
	styleUrls: ['./modal-login.component.css']
})
export class ModalLoginComponent implements OnInit {
	userForm!: FormGroup;
	emailRequired: boolean | null = null;
	isNotEmail: boolean | null = null;
	passwordRequired: boolean | null = null;
	loading: boolean = false;
	errorsAjax = [];
	errorHttp = '';

	constructor(private dialogRef: MatDialogRef<ModalLoginComponent>, private userService: UserService) {}

	ngOnInit(): void {
		this.userForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}

	async showErrors(formData: any){

		this.loading = true;

		if(formData.invalid){
			this.emailRequired = formData.controls.email.errors?.required !== undefined;
			this.isNotEmail = formData.controls.email.errors?.email !== undefined;
			this.passwordRequired = formData.controls.password.errors?.required !== undefined;

			this.loading = false;

			return;
		}

		const formDataObject = new FormData();

		formDataObject.append('email', formData.value.email);
		formDataObject.append('password', formData.value.password);

		await this.userService.login(formDataObject).subscribe(async result => {
			
			this.loading = false;
			this.dialogRef.close(result);

		}, error => {
			console.log(error);
			
			// tratamento de erro

			this.loading = false;

			// console.log(error.name);
			

			// if(error.name == "HttpErrorResponse"){
			// 	this.errorHttp = 'Servidor recusou a conexão ou está fora do ar.';
			// }
			
			// this.errorsAjax = error;
		});
	}
}
