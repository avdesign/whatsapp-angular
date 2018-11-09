import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { CategoryListComponent } from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryEditService{

    private _categoryListComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }

    showModalEdit(categoryId: number){
    this._categoryListComponent.categoryId = categoryId;
    this._categoryListComponent.categoryEdit.showModal();
    }

    onEditSuccess($event: any){
    this.notifyMessage.success('Categoria foi alterada com sucesso!');
    this._categoryListComponent.getCategories();
    }    
    
    onEditError($event: HttpErrorResponse){
    this.notifyMessage.error('Não foi possivel alterar a categoria.');

    }
            
    
}