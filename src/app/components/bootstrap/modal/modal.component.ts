import { Component, OnInit, ElementRef, EventEmitter, Output } from '@angular/core';

declare const $;

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Output()
  onHide: EventEmitter<Event> = new EventEmitter<Event>();

  constructor(private element: ElementRef) { 

  }

  ngOnInit() {
    const jqueryElement = this.getjQqueryElement();

    jqueryElement.find('[modal-title]').addClass('modal-title');
    jqueryElement.find('[modal-body]').addClass('modal-body');
    jqueryElement.find('[modal-footer]').addClass('modal-footer');

    jqueryElement.on('hidden.bs.modal', (e) => {
      //console.log(e);
      this.onHide.emit(e);
    })
  }


  show(){
    this.getjQqueryElement().modal('show');
  }

  hide(){
    this.getjQqueryElement().modal('hide');
  }

  private getjQqueryElement(){
    const nativeElement = this.element.nativeElement;
    return $(nativeElement.firstChild);
  }

  

}
