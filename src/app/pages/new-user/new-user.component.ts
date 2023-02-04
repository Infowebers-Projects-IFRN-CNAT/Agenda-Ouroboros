import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  loading: boolean = false;
  isNotEmail: boolean = false;
  emailRequired: boolean = false;
  passwordRequired: boolean = false;
  newUserForm!: FormGroup;
  nomeRequired: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  @ViewChild('redirectSwal')
	public readonly redirectSwal!: SwalComponent;

  ngOnInit(): void {
		this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required])
		});
	}

  async createUser(userForm: any){
    this.loading = true;

    if(userForm.invalid){
      this.nomeRequired = userForm.controls.name.errors?.required !== undefined;
			this.emailRequired = userForm.controls.email.errors?.required !== undefined;
			this.isNotEmail = userForm.controls.email.errors?.email !== undefined;
			this.passwordRequired = userForm.controls.password.errors?.required !== undefined;

			this.loading = false;

			return;
		}

    const formDataObject = new FormData();

		formDataObject.append('name', userForm.value.name);
		formDataObject.append('email', userForm.value.email);
		formDataObject.append('password', userForm.value.password);

    await this.userService.createUser(formDataObject).subscribe(async result => {
			
			this.loading = false;
      this.redirectSwal.fire();

		}, error => {
			console.log(error);

			this.loading = false;
		});
  }

  redirectLogin() {
		this.router.navigate(['/']);
	}
}
