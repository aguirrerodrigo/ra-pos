import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemSearchComponent } from './add-item-search.component';

describe('AddItemSearchComponent', () => {
	let component: AddItemSearchComponent;
	let fixture: ComponentFixture<AddItemSearchComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddItemSearchComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddItemSearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
