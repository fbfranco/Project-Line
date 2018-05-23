import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  ngOnInit() {
  }

}
