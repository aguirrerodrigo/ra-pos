import { SearchMatch } from './search-match';

export class SearchResult {
   success = false;
   matches: SearchMatch[] = [];

   addMatch(startIndex: number, length: number) {
      this.success = true;
      this.matches.push(new SearchMatch(startIndex, length));
   }
}
