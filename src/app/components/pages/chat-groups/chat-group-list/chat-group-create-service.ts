import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ChatGroupListComponent } from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupCreateService{

    private _chatGroupListComponent: ChatGroupListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set chatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }

    showModalCreate(){
        this._chatGroupListComponent.chatGroupCreate.showModal();
    }

    onCreateSuccess($event: any){
        this.notifyMessage.success('Grupo cadastrado com sucesso!');
        this._chatGroupListComponent.getChatGroups();
    }    
    
    onCreateError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel adicionar o grupo.');
    }    
    
}