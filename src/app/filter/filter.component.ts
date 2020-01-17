import { Component, OnInit } from '@angular/core';
export interface filter
{
  value:string;
  viewValue:string;
}
@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  filter:filter[]=[
    {
    value:'1995-0',viewValue:'1995'
  },
  {value:'1996-1',viewValue:'1996'},
  {value:'1997-2',viewValue:'1997'}
]
  constructor() { }

  ngOnInit() {
  }

}