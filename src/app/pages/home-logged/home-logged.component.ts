import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-home-logged',
	templateUrl: './home-logged.component.html',
	styleUrls: ['./home-logged.component.css']
})
export class HomeLoggedComponent implements OnInit {
	username: string = "Teste";
	file = {
		name: 'tete'
	};
	calendarOptions: CalendarOptions = {
		initialView: 'dayGridMonth',
		plugins: [dayGridPlugin]
	};

	@ViewChild('redirectSwal')
	public readonly redirectSwal!: SwalComponent;

	constructor(private userService: UserService, private el: ElementRef, private router: Router) {
		this.checkUser();
	}

	ngOnInit(): void {
		
	}

	async checkUser() {
		await this.userService.checkUser().subscribe(async data => {
			console.log(data);
		}, error => {
			console.log(error);
			this.redirectSwal.fire();
		});
	}

	redirectLogin() {
		this.router.navigate(['/']);
	}
}
