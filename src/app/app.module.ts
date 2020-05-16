import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
	FontAwesomeModule,
	FaIconLibrary
} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { OrderComponent } from './components/order/order.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { SearchComponent } from './components/search/search.component';
import { MenuSearchComponent } from './components/menu-search/menu-search.component';
import { AutoTypeDirective } from './directives/auto-type.directive';

@NgModule({
	declarations: [
		AppComponent,
		OrderComponent,
		OrderItemComponent,
		SearchComponent,
		MenuSearchComponent,
		AutoTypeDirective
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		NgbModule,
		FontAwesomeModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(faIconLibrary: FaIconLibrary) {
		faIconLibrary.addIconPacks(fab, far, fas);
	}
}