import { Component } from '@angular/core';
import Package from '@root/package.json';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	version = Package.version;
	title = 'POS';
}
