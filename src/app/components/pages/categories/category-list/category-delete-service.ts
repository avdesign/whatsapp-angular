import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { CategoryListComponent } from "./category-list.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryDeleteService{

    private _categoryListComponent: CategoryListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set categoryListComponent(value: CategoryListComponent){
        this._categoryListComponent = value;
    }  

    showModalDelete(categoryId: number){
        this._categoryListComponent.categoryId = categoryId;
        this._categoryListComponent.categoryDelete.showModal();
    }
    
    onDeleteSuccess($event: any){
        this.notifyMessage.success('Categoria excluida com sucesso!');
        this._categoryListComponent.getCategories();
    }
    
    onDeleteError($event: HttpErrorResponse){
        console.log($event.status);
        if ($event.status == 500) {
            this.notifyMessage.error(
                'Não foi possivel excluir a categoria,verifique se a mesma não esta relacionada com produtos'
            );
        } else {
            this.notifyMessage.error(`Erro: ${$event.status}, ${$event.statusText} `);
        }
    }
    
    
    
        

            
    
}