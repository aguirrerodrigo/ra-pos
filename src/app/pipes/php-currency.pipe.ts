import { Pipe, PipeTransform } from '@angular/core';
import { formatPhpCurrency } from '@app/utils';

@Pipe({
	name: 'php'
})
export class PhpCurrencyPipe implements PipeTransform {
	transform(value: number): string {
		return formatPhpCurrency(value);
	}
}
