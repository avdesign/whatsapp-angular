import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { CategoryListComponent } from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryCreateService{

    private _categoryListComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    showModalCreate(){
        this._categoryListComponent.categoryCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Categoria cadastrada com sucesso!');
        this._categoryListComponent.getCategories();
    }    
    
    onCreateError($event: HttpErrorResponse){
        //this.notifyMessage.error('Não foi possivel adicionar a categoria.');
        //console.log($event);
    }    
    
}