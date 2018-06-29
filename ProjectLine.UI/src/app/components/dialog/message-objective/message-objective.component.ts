import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-message-objective',
  templateUrl: './message-objective.component.html',
  styleUrls: ['./message-objective.component.scss']
})
export class MessageObjectiveComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageObjectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.dialogRef.close('confirm');
  }
  onCloseCancel() {
    this.dialogRef.close('cancel');
  }
}
