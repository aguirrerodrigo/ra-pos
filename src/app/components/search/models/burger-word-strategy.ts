import { SearchStrategy } from './search-strategy';
import { SearchResult } from './search-result';

export class BurgerWordStrategy implements SearchStrategy {

    match(text: string, search: string) {
        let result = new SearchResult();
        
        if('burger'.startsWith(search.toLowerCase())) {
            let burgerIndex = text.toLowerCase().indexOf('burger');

            if(burgerIndex >= 0) {
                let index = text.indexOf(search);
                if(burgerIndex == index) {
                    result.addMatch(index, search.length);
                }
            }
        }

        return result;
    }

}