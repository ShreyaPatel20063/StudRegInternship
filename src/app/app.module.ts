import { NgModule } from '@angular/core'; // it is used to make the class as a module
import { BrowserModule } from '@angular/platform-browser'; // it is used to make the application browser compatible
import {FormsModule, ReactiveFormsModule} from '@angular/forms'; // it is used to make two way binding between the html and ts file
import { AppRoutingModule } from './app-routing.module'; // it is used to make the application routing compatible
import { AppComponent } from './app.component'; // it is used to make the class as a component
import { NavbarComponent } from './navbar/navbar.component'; // it is used to make the class as a component
import {HttpClientModule} from '@angular/common/http'; // it is used to make http request to the server and get the response from the server for making calls to api
import { TestDetailsComponent } from './test-details/test-details.component'; // it is used to make the class as a component
import { TestFormComponent } from './test-details/test-form/test-form.component'; // it is used to make the class as a component
import { DatePipe } from '@angular/common';   // it is used to format the date
import { TestUpdateComponent } from './test-details/test-update/test-update.component';
import { StudDetailsComponent } from './stud-details/stud-details.component';
import { StudDisplayComponent } from './stud-details/stud-display/stud-display.component';
import { StudFormComponent } from './stud-details/stud-form/stud-form.component';
import { StudUpdateComponent } from './stud-details/stud-update/stud-update.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FilterPipe } from './pipes/filter.pipe'; // it is used to make the class as a component
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TestDetailsComponent,
    TestFormComponent,
    TestUpdateComponent,
    StudDetailsComponent,
    StudDisplayComponent,
    StudFormComponent,
    StudUpdateComponent,
    HomepageComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule, // it is used to make two way binding between the html and ts file
    HttpClientModule  // it is used to make http request to the server and get the response from the server for making calls to api 
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
