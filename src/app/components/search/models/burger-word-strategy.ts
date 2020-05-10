import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class BurgerWordStrategy implements SearchStrategy {

    match(text: string, search: string) {
        let result = new SearchResult();
        
        if('burger'.startsWith(search.toLowerCase())) {
            let index = text.indexOf(search);
            if(index >= 0) {
                result.addMatch(index, search.length);
            }
        }

        return result;
    }

}