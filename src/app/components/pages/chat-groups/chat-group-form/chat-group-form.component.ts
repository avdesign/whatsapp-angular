import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import fieldsOptions from '../../chat-groups/chat-group-form/chat-group-fields-options';

@Component({
  selector: 'chat-group-form',
  templateUrl: './chat-group-form.component.html',
  styleUrls: ['./chat-group-form.component.css']
})
export class ChatGroupFormComponent implements OnInit {

  @Input()
  form: FormGroup;

  constructor(private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.changeRef.detectChanges();
  }

  get fieldsOptions(): any{
    return fieldsOptions;
  }

  choosePhoto(files: FileList){

    console.log(files);
    if (!files.length) {
      return;
    }

    this.form.get('photo').setValue(files[0]);
  }

}
