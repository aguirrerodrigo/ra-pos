import { formatCurrency } from '@angular/common';

export function formatPhpCurrency(n: number): string {
	return formatCurrency(n, 'en-PH', 'P ', 'PHP', '1.2-2');
}

export function isNullOrWhiteSpace(s: string): boolean {
	return s == null || s.trim().length === 0;
}
