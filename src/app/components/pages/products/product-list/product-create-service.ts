import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ProductListComponent } from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductCreateService{

    private _productListComponent: ProductListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }

    showModalCreate(){
        this._productListComponent.productCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Produto cadastrado com sucesso!');
        this._productListComponent.getProducts();
    }    
    
    onCreateError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel adicionar o produto.');
    }    
    
}