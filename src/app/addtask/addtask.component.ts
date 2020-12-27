import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { GlobalConstants } from '../common';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddtaskComponent>,@Inject(MAT_DIALOG_DATA) public data: any,private http: HttpClient) { }

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  taskname;
  description;

  ngOnInit() {
    debugger
    this.data.forEach(dt => {
      this.dropdownList.push({
        'item_id' : dt.id,
        'item_text' : dt.name
      })
    })
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item)
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems = this.dropdownList
  }

  onItemDeSelect(items: any){
    let counter = 0;
    this.selectedItems.forEach(sel => {
      if(items.item_id == sel.item_id){
        this.selectedItems.splice(counter,1)
        return false;
      }
      counter++;
    })
  }

  onItemDeSelectAll(items: any){
    console.log(items);
    this.selectedItems = []
  }

  close() {
    this.dialogRef.close();
  }

  createTask(){
    const headers = { 'Authorization': 'Bearer my-token'}
    let studentListId = []
    this.selectedItems.forEach(sel => {
      studentListId.push(sel.item_id);
    })
    let params = {"createdby": GlobalConstants.userId,"name": this.taskname,"description":this.description,"list":studentListId}
    debugger
    this.http.post<any>('http://localhost:8000/SaveTaskList/',params).subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              this.close();
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

}
