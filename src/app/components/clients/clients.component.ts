import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientService]
})
export class ClientsComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  ngOnInit() {
  }

}
