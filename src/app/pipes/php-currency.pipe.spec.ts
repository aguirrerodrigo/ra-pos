import { PhpCurrencyPipe } from './php-currency.pipe';

describe('PhpCurrencyPipe', () => {
	it('create an instance', () => {
		const pipe = new PhpCurrencyPipe();
		expect(pipe).toBeTruthy();
	});
});
