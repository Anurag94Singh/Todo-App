import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddtaskComponent } from '../addtask/addtask.component';
import { GlobalConstants } from '../common';

declare var $: any;

@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.component.html',
  styleUrls: ['./adminuser.component.css']
})

export class AdminuserComponent implements OnInit,AfterViewInit {

  tasksList=[]
  approvalList=[]
  students=[]
  tileWidth:any;

  constructor(private http: HttpClient,private matDialog: MatDialog) { }

  ngOnInit() {
    this.getTasks()
    this.getStudents()
  }

  ngAfterViewInit() {
    this.tileWidth = $('#rightTilesContainer').innerWidth()/7;
  }

  getStudents(){
    this.http.get<any>('http://localhost:8000/students/').subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              this.students = data;
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }


  getTasks(){
    this.approvalList = []
    this.tasksList = []
    let params = new HttpParams().set('createdby',GlobalConstants.userId)
    this.http.get<any>('http://localhost:8000/GetTeacherTasksList/',{params:params}).subscribe({
            // this.totalAngularPackages = data.total;
            //console.log(JSON.stringify(data))
            next: data => {
              console.log(JSON.stringify(data))
              //this.approvalList = data;
              let arr = [];
              data.forEach(tsk => {
                if(!arr.includes(tsk.task.id)){
                  this.tasksList.push(tsk.task);
                  arr.push(tsk.task.id)
                }

                if(tsk.status == "Done"){
                  this.approvalList.push(tsk);
                }
                
              })

              


              // this.router.navigateByUrl('adminuser')
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig['data'] = this.students
    this.matDialog.open(AddtaskComponent, dialogConfig);
  }

  updateTaskStatus(studentid,taskid,status,id){
    this.http.post<any>('http://localhost:8000/UpdateTaskStatus/',{"createdby": studentid,"status": status, "taskid" : taskid, "id" : id}).subscribe({
            next: data => {
              console.log(JSON.stringify(data))
              if(data.status == "ok"){
                this.getTasks()
              }
              else{
                console.log('error while status change')
              }
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }

}
