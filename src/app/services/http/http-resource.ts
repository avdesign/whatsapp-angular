import { Observable } from "rxjs";

export interface SearchParams {
    page?: number;
    all?: any;
}

/**
 * Params page or all  
 */
export class SearchParamsBuilder{

    constructor(private serarchParams: SearchParams){}

    makeObject(): SearchParams{
        const sParams: any = {
            page: this.serarchParams.page + ''
        };
    
        if (this.serarchParams.all) {
            sParams.all = '1';
            delete sParams.page;
        }
        return sParams;
    }
}

export interface HttpResource<T>{

    list(searchParams: SearchParams): Observable<{data: Array<T>, meta: any}>;


    get(id: number): Observable<T>;


    create(data: T): Observable<T>;
    
    
    update(id: number, data: T): Observable<T>;

    
    destroy(id: number): Observable<any>;

}