import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { UserListComponent } from "./user-list.component";

@Injectable({
    providedIn: 'root'
})
export class UserDeleteService{

    private _userListComponent: UserListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }  

    showModalDelete(userId: number){
        this._userListComponent.userId = userId;
        this._userListComponent.userDelete.showModal();
    }
    
    onDeleteSuccess($event: any){
        this.notifyMessage.success('Usuário excluido com sucesso!');
        this._userListComponent.getUsers();
    }
    
    onDeleteError($event: HttpErrorResponse){
        if ($event.status == 500) {
            this.notifyMessage.error(
                'Não foi possivel excluir o usuário,verifique se o mesmo não esta relacionado com outros modulos.'
            );
        } else {
            this.notifyMessage.error(`Erro: ${$event.status}, ${$event.statusText} `);
        }
    }
    
    
    
        

            
    
}