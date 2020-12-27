import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSelectModule} from '@angular/material/select'
import {MatMenuModule} from '@angular/material/menu'
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AdminuserComponent } from './adminuser/adminuser.component';
import { StudentComponent } from './student/student.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddtaskComponent } from './addtask/addtask.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainViewComponent } from './pages/main-view/main-view.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTabsModule} from '@angular/material/tabs';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    AdminuserComponent,
    StudentComponent,
    AddtaskComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatMenuModule,
    MatCardModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    DragDropModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddtaskComponent]

})
export class AppModule { }
