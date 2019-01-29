import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ChatGroupLinkInvListComponent } from './chat-group-link-inv-list.component';


@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvEditService{

    private _linkInvListComponent: ChatGroupLinkInvListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set linkInvListComponent(value: ChatGroupLinkInvListComponent){
        this._linkInvListComponent = value;
    }

    showModalEdit(linkInvId: number){
    this._linkInvListComponent.linkInvIdToEdit = linkInvId;
    this._linkInvListComponent.linkInvEdit.showModal();
    }

    onEditSuccess($event: any){
    this.notifyMessage.success('Link foi alterado com sucesso!');
    this._linkInvListComponent.getLinkInvitations();
    }    
    
    onEditError($event: HttpErrorResponse){
        //this.notifyMessage.error('Não foi possivel alterar o link.');
        console.log($event);

    }
            
    
}