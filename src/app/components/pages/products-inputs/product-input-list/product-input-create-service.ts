import { Injectable } from "@angular/core";
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductInputListComponent } from "./product-input-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductInputCreateService{

    private _productInputListComponent: ProductInputListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set productInputListComponent(value: ProductInputListComponent){
        this._productInputListComponent = value;
    }

    showModalCreate(){
        this._productInputListComponent.inputCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Entrada cadastrada com sucesso!');
        this._productInputListComponent.getInputs();
    }    
    
    onCreateError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel adicionar a entrada.');
        console.log($event.status);
    }    
    
}