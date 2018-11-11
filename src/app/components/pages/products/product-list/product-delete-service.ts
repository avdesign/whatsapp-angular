import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ProductListComponent } from "./product-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductDeleteService{

    private _productListComponent: ProductListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set productListComponent(value: ProductListComponent){
        this._productListComponent = value;
    }  

    showModalDelete(productId: number){
        this._productListComponent.productId = productId;
        this._productListComponent.productDelete.showModal();
    }
    
    onDeleteSuccess($event: any){
        this.notifyMessage.success('Produto excluido com sucesso!');
        this._productListComponent.getProducts();
    }
    
    onDeleteError($event: HttpErrorResponse){
        if ($event.status == 500) {
            this.notifyMessage.error(
                'Não foi possivel excluir o produto,verifique se o mesmo não esta relacionado com os atributos'
            );
        } else {
            this.notifyMessage.error(`Erro: ${$event.status}, ${$event.statusText} `);
        }
    }
    
    
    
        

            
    
}