import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tblstud } from './tblstud.model';

@Injectable({
  providedIn: 'root'
})
export class TblstudService {

  constructor(private myhttp : HttpClient) { }
  studUrl: string = "https://localhost:7095/api/Api"; // this is the url of the api

  listStud: Tblstud[] = []; // this is the array of objects of type Tblstud
  studData: Tblstud = new Tblstud(); // this is the object of type Tblstud

  public setter(stud: any) {
    this.studData = stud;
  } // this method is used to set the value of studData

  public getter() {
    return this.studData;
  } // this method is used to get the value of studData

  getAllStud() {
    return this.myhttp.get<Tblstud> (this.studUrl);
  } // this method is used to get the value of studData

  getStudById(id: number) {
    return this.myhttp.get<Tblstud>(`${this.studUrl}/${id}`);
  } // this method is used to get the value of studData

  postStud(stud: Tblstud) {
    return this.myhttp.post(this.studUrl, stud);
  } // this method is used to create a new record in the database

  putStud(id: number, stud: Tblstud) {
    return this.myhttp.put(`${this.studUrl}/${id}`, stud);
  } // this method is used to update a record in the database

  deleteStud(id: number) {
    return this.myhttp.delete(`${this.studUrl}/${id}`);
  } // this method is used to delete a record from the database
  

}
