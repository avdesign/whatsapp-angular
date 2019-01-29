import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ChatGroupLinkInvListComponent } from "./chat-group-link-inv-list.component";

@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvDeleteService{

    private _linkInvListComponent: ChatGroupLinkInvListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set linkInvListComponent(value: ChatGroupLinkInvListComponent){
        this._linkInvListComponent = value;
    }  

    showModalDelete(linkInvId: number){
        this._linkInvListComponent.linkInvToDelete = linkInvId;
        this._linkInvListComponent.linkInvDelete.showModal();
    }
    
    onDeleteSuccess($event: any){
        this.notifyMessage.success('Link excluido com sucesso!');
        this._linkInvListComponent.getLinkInvitations();
    }
    
    onDeleteError($event: HttpErrorResponse){
        console.log($event.status);
    }
    
    
    
        

            
    
}