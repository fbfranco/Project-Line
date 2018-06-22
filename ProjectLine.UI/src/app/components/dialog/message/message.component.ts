import { Component, OnInit, Inject } from '@angular/core'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatTable} from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close('confirma');
  }
   onCloseCancel() {
     this.dialogRef.close('cancel');
   }

}
