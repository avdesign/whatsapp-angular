
import { Injectable } from "@angular/core";
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProductInputListComponent } from "./product-input-list.component";

@Injectable({
    providedIn: 'root'
})
export class ProductInputCreateService{

    private _inputListComponent: ProductInputListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set inputListComponent(value: ProductInputListComponent){
        this._inputListComponent = value;
    }

    showModalCreate(){
        this._inputListComponent.inputCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Categoria cadastrada com sucesso!');
        this._inputListComponent.getInputs();
    }    
    
    onCreateError($event: HttpErrorResponse){
        //this.notifyMessage.error('Não foi possivel adicionar a categoria.');
        //console.log($event);
    }    
    
}