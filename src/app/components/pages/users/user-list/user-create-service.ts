import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { UserListComponent } from "./user-list.component";

@Injectable({
    providedIn: 'root'
})
export class UserCreateService{

    private _userListComponent: UserListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set userListComponent(value: UserListComponent){
        this._userListComponent = value;
    }

    showModalCreate(){
        this._userListComponent.userCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Usuário cadastrado com sucesso!');
        this._userListComponent.getUsers();
    }    
    
    onCreateError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel adicionar o usuário.');
    }    
    
}