import { Injectable } from '@angular/core';
import Info from '@root/src/assets/json/info.json';

@Injectable({
	providedIn: 'root'
})
export class InfoService {
	private info: string[] = Info;

	constructor() {}

	getRandomInfo(): string {
		return this.info[Math.floor(Math.random() * this.info.length)];
	}
}
