// Config
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
// Services
import { ClientService } from '../../../services/client.service';
// Models
import { Client } from '../../../models/client.model';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  constructor(public clientService: ClientService, private toastr: ToastrService) { }

  ngOnInit() {
    this.clientService.getClientList();
  }

  showForEdit(emp: Client) {
    this.clientService.selectedClient = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.clientService.deleteClient(id)
      .subscribe(x => {
        this.clientService.getClientList();
        this.toastr.warning('Deleted Successfully', 'Client Register');
      });
    }
  }
}
