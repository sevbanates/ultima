export interface ResponseModel<T> {
    Token: string;
    IsSuccess:boolean;
    ReturnMessage:Array<string>;
    Entity:T;
    EntityList:Array<T>;
}

export class PagedAndSortedResponse<T> {
    IsSuccess: boolean;
    ReturnMessage: Array<string>;
    TotalCount: number;
    Token: string;
    EntityList: Array<any>;

}


export interface SortDescriptor {
    field: string;
    dir?: 'asc' | 'desc';
}