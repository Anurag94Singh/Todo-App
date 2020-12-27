import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GlobalConstants } from 'src/app/common';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {

  createdList=[];
  progressList=[];
  doneList=[];
  approvedList=[]

  constructor(private http: HttpClient) { }

  board = {
    'CREATED': this.createdList,
    'progress': this.progressList,
    'Done': this.progressList,
    'Approved/Disapproved': this.doneList
  };

  taskList = [
    {name : 'todo',data : this.createdList},
    {name : 'Progress',data : this.progressList},
    {name : 'Done',data : this.doneList},
    {name : 'Approved/Disapproved',data : this.approvedList}
  ]

  ngOnInit() {
    this.getStudentData()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } 
    else if(event.previousContainer.id == "cdk-drop-list-3" && event.container.id != "cdk-drop-list-3"){

    }
    else if(event.container.id == "cdk-drop-list-3"){
      
    }
    else {
      let status = "Created"
      if(event.container.id == "cdk-drop-list-0"){
        status = "Created"
      }
      else if(event.container.id == "cdk-drop-list-1"){
        status = "Progress"
      }
      else if(event.container.id == "cdk-drop-list-2"){
        status = "Done"
      }
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
        this.updateTaskStatus(event.container.data[event.currentIndex]['studentid'],event.container.data[event.currentIndex]['taskid'],status,event.container.data[event.currentIndex]['id']);
    }
  }

  updateTaskStatus(studentid,taskid,status,id){
    this.http.post<any>('http://localhost:8000/UpdateTaskStatus/',{"createdby": studentid,"status": status, "taskid" : taskid, "id" : id}).subscribe({
            next: data => {
              console.log(JSON.stringify(data))
              if(data.status == "ok"){
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

  getStudentData(){
    this.taskList.forEach(x => {
      x.data = []
    })
    let params = new HttpParams().set('username',GlobalConstants.userName)
    this.http.get<any>('http://localhost:8000/GetStudentTasksList/',{params : params}).subscribe({
            next: data => {
              console.log(JSON.stringify(data))
              // this.approvalList = data;
              let arr = [];
              data.forEach(tsk => {
                if(tsk.status == "Created"){
                  this.taskList[0].data.push({
                    name : tsk.task.name,
                    description : tsk.task.description,
                    createdby : tsk.task.createdby.name,
                    studentid : tsk.student.id,
                    taskid : tsk.task.id,
                    id:tsk.id
                  })
                }
                else if(tsk.status == "Progress"){
                  this.taskList[1].data.push({
                    name : tsk.task.name,
                    description : tsk.task.description,
                    createdby : tsk.task.createdby.name,
                    studentid : tsk.student.id,
                    taskid : tsk.task.id,
                    id:tsk.id
                  })
                }
                else if(tsk.status == "Done"){
                  this.taskList[2].data.push({
                    name : tsk.task.name,
                    description : tsk.task.description,
                    createdby : tsk.task.createdby.name,
                    studentid : tsk.student.id,
                    taskid : tsk.task.id,
                    id:tsk.id
                  })
                }

                else if(tsk.status == "Approved" || tsk.status == "Disapproved"){
                  this.taskList[3].data.push({
                    name : tsk.task.name,
                    description : tsk.task.description,
                    createdby : tsk.task.createdby.name,
                    studentid : tsk.student.id,
                    taskid : tsk.task.id,
                    id:tsk.id,
                    status:tsk.status
                  })
                }

                
              })
          },
          error: error => {
              // this.errorMessage = error.message;
              console.error('There was an error!', error);
          }
    })
  }


}
