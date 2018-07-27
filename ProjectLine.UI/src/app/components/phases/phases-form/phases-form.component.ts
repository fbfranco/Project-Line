import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { PhaseService } from '../../../services/phase.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { HelperService } from '../../../services/helper.service';

const helpers = new HelperService();

@Component({
  selector: 'app-phases-form',
  templateUrl: './phases-form.component.html',
  styleUrls: ['./phases-form.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: helpers.formats }
  ]
})

export class PhasesFormComponent implements OnInit {

  demoVideo: any;
  fileName = '';
  dragAreaClass = 'dragarea';
  fileExt = 'mp4, ogg, mov';
  maxFiles = 1;
  maxSize = 10; // MB
  files: any;
  errors: Array<string> = [];

  phaseSelected = this.phaseService.phaseList;

  constructor(public dialogRef: MatDialogRef<PhasesFormComponent>, public phaseService: PhaseService) { }

  onFileChange(event) {
    this.files = event.target.files;
    this.fileName = this.files[0].name;
    this.saveFiles(this.files);
  }

  @HostListener('dragover', ['$event']) onDragOver(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragenter', ['$event']) onDragEnter(event) {
    this.dragAreaClass = 'droparea';
    event.preventDefault();
  }

  @HostListener('dragend', ['$event']) onDragEnd(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
  }

  @HostListener('drop', ['$event']) onDrop(event) {
    this.dragAreaClass = 'dragarea';
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer.files;
    console.log(files);
    this.fileName = files[0].name;
    this.saveFiles(files);
  }

  saveFiles(files) {
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
        return;
    }
    if (files.length > 0) {
      const formData: FormData = new FormData();
      for (let j = 0; j < files.length; j++) {
          formData.append('file[]', files[j], files[j].name);
      }
      this.phaseService.selectedPhase.DemoVideo = formData;
      // this.fileService.upload(formData, parameters)
      // .subscribe(
      // success => {
      //   this.uploadStatus.emit(true);
      //   console.log(success);
      // },
      // error => {
      //     this.uploadStatus.emit(true);
      //     this.errors.push(error.ExceptionMessage);
      // });
    }
  }

  private isValidFiles(files) {
    // Check Number of files
     if (files.length > this.maxFiles) {
         this.errors.push('Error: At a time you can upload only ' + this.maxFiles + ' files');
         return;
     }
     this.isValidFileExtension(files);
     return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    const extensions = (this.fileExt.split(',')).map(function (x) { return x.toLocaleUpperCase().trim(); });
    for (let i = 0; i < files.length; i++) {
        // Get file extension
        const ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
        // Check the extension exists
        const exists = extensions.includes(ext);
        if (!exists) {
            this.errors.push('Error (Extension): ' + files[i].name);
        }
        // Check file size
        this.isValidFileSize(files[i]);
    }
  }

  private isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push('File capacity exceeds 10 MB');
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePhase() {
    const indexPhase = this.phaseService.indexPhase;
    this.phaseService.phaseList.splice(indexPhase, 1, this.phaseService.selectedPhase);
    this.dialogRef.close();
    console.log(this.phaseService.selectedPhase);
  }


  removeChipVideo(): void {
    this.fileName = '';
    this.files = [];
    this.errors = [];
  }
}
