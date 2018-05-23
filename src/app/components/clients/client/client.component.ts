// Config
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// Service
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(public clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.clientService.selectedClient = {
      IdClient: null,
      Names: '',
      LastName: '',
      Telephone: '',
    };
  }

  onSubmit(form: NgForm) {
    if (form.value.IdClient == null) {
      form.value.IdClient = 0;
      this.clientService.postClient(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.clientService.getClientList();
          this.toastr.success('New Record Added Succcessfully', 'Client Register');
        });
    } else {
      this.clientService.putClient(form.value.IdClient, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.clientService.getClientList();
        this.toastr.info('Record Updated Successfully!', 'Client Register');
      });
    }
  }

}
