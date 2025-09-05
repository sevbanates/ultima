import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	templateUrl: './notfound.component.html',
	styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent {
	
	constructor(private location: Location) {}

	goBack(): void {
		this.location.back();
	}
}