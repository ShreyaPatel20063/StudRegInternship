import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tbltest } from './tbltest.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TbltestService {

  constructor(private myhttp : HttpClient) { }
  testUrl: string = "https://localhost:7095/api/Tests"; // this is the url of the api

  listTest: Tbltest[] = []; // this is the array of objects of type Tbltest
  testData: Tbltest = new Tbltest(); // this is the object of type Tbltest

  public setter(test: any) {
    this.testData = test;
  } // this method is used to set the value of testData
  public getter() {
    return this.testData;
  } // this method is used to get the value of testData
  createTest() {
    console.log(this.testData);
    return this.myhttp.post(this.testUrl, this.testData);
  } // this method is used to create a new record in the database

  readTest() : Observable<Tbltest[]>{
    return this.myhttp.get<Tbltest[]>(this.testUrl);
  } // this method is used to read all the records from the database

  readTestRno(rno:number) : Observable<Tbltest[]>{
    return this.myhttp.get<Tbltest[]>(`${this.testUrl}/${rno}`); //, {params: {rno: rno.toString()}});
  } 

  updateTest() {
    return this.myhttp.put(`${this.testUrl}/${this.testData.rno}`, this.testData);
  } // this method is used to update a record in the database

  deleteTest() {
    return this.myhttp.delete(`${this.testUrl}/${this.testData.rno}`);
  } // this method is used to delete a record from the database
}
