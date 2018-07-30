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

  demoVideo = '';
  fileName = '';
  dragAreaClass = 'dragarea';
  fileExt = 'mp4, ogg, mov';
  maxFiles = 1;
  maxSize = 10; // MB
  files: FileList;
  errors: Array<string> = [];

  phaseSelected = this.phaseService.phaseList;

  constructor(public dialogRef: MatDialogRef<PhasesFormComponent>, public phaseService: PhaseService) { }

  onFileChange(event) {
    this.files = event.target.files;
    this.addFiles(this.files);
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
    this.files = event.dataTransfer.files;
    this.addFiles(this.files);
  }

  getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.demoVideo = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
 }

  addFiles(files: FileList) {
    this.errors = [];
    if (files.length > 0 && (this.isValidFiles(files))) {
      this.fileName = files[0].name;
      this.getBase64(files[0]);
    } else {
      this.demoVideo = this.phaseService.selectedPhase.DemoVideo;
    }
  }

  private isValidFiles(files) {
    if (files.length > this.maxFiles) {
        this.errors.push(`Error: At a time you can upload only ${this.maxFiles} files`);
        return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  isValidFileExtension(files) {
    const extensions = (this.fileExt.split(',')).map(ex => ex.toLocaleUpperCase().trim());
    const ext = files[0].name.toUpperCase().split('.').pop() || files[0].name;
    const exists = extensions.includes(ext);
    if (!exists) {
        this.errors.push('Error (Extension): ' + files[0].name);
    }
    this.isValidFileSize(files[0]);
  }

  isValidFileSize(file) {
    const fileSizeinMB = file.size / (1024 * 1000);
    const size = Math.round(fileSizeinMB * 100) / 100;
    if (size > this.maxSize) {
      this.errors.push(`File capacity exceeds ${this.maxSize} MB`);
    }
  }

  ngOnInit() {
    this.fileName = this.phaseService.selectedPhase.DemoName === undefined || this.phaseService.selectedPhase.DemoName === null
    ? '' : this.phaseService.selectedPhase.DemoName;
    this.demoVideo = this.phaseService.selectedPhase.DemoVideo === undefined || this.phaseService.selectedPhase.DemoVideo === null
    ? '' : this.phaseService.selectedPhase.DemoVideo;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePhase() {
    const indexPhase = this.phaseService.indexPhase;
    this.phaseService.selectedPhase.DemoVideo = this.demoVideo === null ? this.phaseService.selectedPhase.DemoVideo :
                                                                          this.demoVideo.split(',').pop();
    this.phaseService.selectedPhase.DemoName = this.fileName;
    this.phaseService.phaseList.splice(indexPhase, 1, this.phaseService.selectedPhase);
    this.dialogRef.close();
  }


  removeChipVideo(): void {
    this.fileName = '';
    this.files = null;
    this.errors = [];
  }
}
