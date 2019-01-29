import { Injectable } from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';
import { NotifyMessageService } from "../../../../services/notify-message.service";
import { ChatGroupLinkInvListComponent } from "./chat-group-link-inv-list.component";


@Injectable({
    providedIn: 'root'
})
export class ChatGroupLinkInvCreateService{

    private _linkInvListComponent: ChatGroupLinkInvListComponent

    constructor(private notifyMessage: NotifyMessageService){}

    set linkInvListComponent(value: ChatGroupLinkInvListComponent){
        this._linkInvListComponent = value;
    }

    showModalCreate(){
        this._linkInvListComponent.linkInvCreate.showModal();
    }

    onCreateSuccess($event: any){
        //console.log($event.status);
        this.notifyMessage.success('Link cadastrado com sucesso!');
        this._linkInvListComponent.getLinkInvitations();
    }  

    
    onCreateError($event: HttpErrorResponse){
        console.log($event);
        this.notifyMessage.error('Não foi possivel adicionar a categoria.');
    }    
    
}