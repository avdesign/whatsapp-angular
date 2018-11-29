import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ChatGroupListComponent } from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupEditService {

    private _chatGroupListComponent: ChatGroupListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set chatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }


    showModalEdit(chatGroupId: number, chatGroupPhotoUrl: string | null){

        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupPhotoUrl = chatGroupPhotoUrl;        
        this._chatGroupListComponent.chatGropupEdit.showModal();
    }

    onEditSuccess($event: any){
        this.notifyMessage.success('Grupo foi alterado com sucesso!');
        this._chatGroupListComponent.getChatGroups();
    }    

    onEditError($event: HttpErrorResponse){
        this.notifyMessage.error('Não foi possivel alterar o grupo.');

    }
            
}