import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  HeaderColumns = ['Id','Title', 'Description', 'StartDate', 'EstimateDate','Edit','Status'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}

export interface PeriodicElement {
  Id:number;
  Title: string;
  Description: number;
  StartDate: string;
  EstimateDate: string;
  Edit: string;
  Status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Id: 1, Title: 'Hydrogen', Description: 1.0079, StartDate: 'H',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 2, Title: 'Helium', Description: 4.0026, StartDate: 'He',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 3, Title: 'Lithium', Description: 6.941, StartDate: 'Li',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 4, Title: 'Beryllium', Description: 9.0122, StartDate: 'Be',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 5, Title: 'Boron', Description: 10.811, StartDate: 'B',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 6, Title: 'Carbon', Description: 12.0107, StartDate: 'C',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 7, Title: 'Nitrogen', Description: 14.0067, StartDate: 'N',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 8, Title: 'Oxygen', Description: 15.9994, StartDate: 'O',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 9, Title: 'Fluorine', Description: 18.9984, StartDate: 'F',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
  {Id: 10, Title: 'Neon', Description: 20.1797, StartDate: 'Ne',EstimateDate:'06/13/2018',Edit:'O',Status:'X'},
];
