import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { ChatGroupListComponent } from './chat-group-list.component';
import { NotifyMessageService } from "../../../../services/notify-message.service";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupDeleteService {

    private _chatGroupListComponent: ChatGroupListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set chatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }  

    showModalDelete(chatGroupId: number){
        this._chatGroupListComponent.chatGroupId  = chatGroupId
        this._chatGroupListComponent.chatGropupDelete.showModal();
    }
    
    onDeleteSuccess($event: any){
        this.notifyMessage.success('Grupo excluido com sucesso!');
        this._chatGroupListComponent.getChatGroups();
    }
    
    onDeleteError($event: HttpErrorResponse){
        if ($event.status == 500) {
            this.notifyMessage.error(
                'Não foi possivel excluir o grupo.'
            );
        } else {
            this.notifyMessage.error(`Erro: ${$event.status}, ${$event.statusText} `);
        }
    }
    
    
    
        

            
    
}