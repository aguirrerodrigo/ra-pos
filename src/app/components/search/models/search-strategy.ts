import { SearchResult } from './search-result';

export interface SearchStrategy {
	match(text: string, search: string): SearchResult;
}
