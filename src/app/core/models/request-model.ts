import { SortDescriptor } from "./response-model";

export class PagedAndSortedInput {
    Page: number;
    Limit: number;
    SortExpression?: string;
}

export class PagedAndSortedSearchInput extends PagedAndSortedInput{
    Search: string;
}

