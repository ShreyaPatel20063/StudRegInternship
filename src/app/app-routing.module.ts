import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { StudDetailsComponent } from './stud-details/stud-details.component';
import { StudDisplayComponent } from './stud-details/stud-display/stud-display.component';
import { StudFormComponent } from './stud-details/stud-form/stud-form.component';
import { StudUpdateComponent } from './stud-details/stud-update/stud-update.component';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [

  {
    path: '', // this is the default path
    component: HomepageComponent, // this is the component which will be loaded when the path is empty
  },

  {
    path: 'details/:id', // this is the path for the details component
    component: StudDisplayComponent // this is the component which will be loaded when the path is details
  },

  {
    path: 'details', // this is the path for the details component
    component: StudDetailsComponent // this is the component which will be loaded when the path is details
  },

  {
    path: 'form/:id', // this is the path for the details
    component: StudUpdateComponent // this is the component which will be loaded when the path is form
  },

  {
    path: 'form', // this is the path for the details 
    component: StudFormComponent // this is the component which will be loaded when the path is form
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
