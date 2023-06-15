import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tblstud } from './tblstud.model';
import { Tblcourse } from './tblcourse.model';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TblstudService {
  constructor(private myhttp: HttpClient, private dp: DatePipe) {}
  //for tblstud
  studUrl: string = 'https://localhost:7095/api/Api'; // this is the url of the api
  listStud: Tblstud[] = []; // this is the array of objects of type Tblstud
  studData: Tblstud = new Tblstud(); // this is the object of type Tblstud
  rnoUrl: string = 'https://localhost:7095/api/Api/linq';
  //for tblcourse
  courseUrl: string = 'https://localhost:7095/api/Api/course'; // this is the url of the api
  listCourse: Tblcourse[] = []; // this is the array of objects of type Tblcourse
  courseData: Tblcourse = new Tblcourse(); // this is the object of type Tblcourse

  public setStudData(stud: Tblstud) {
    this.studData = stud;
  } // this method is used to set the value of studData

  public getStudData() {
    return this.studData;
  } // this method is used to get the value of studData

  public setListStud(stud: any) {
    this.listStud = stud;
    console.log(this.listStud);
  } // this method is used to set the value of studData
  public getListStud() {
    return this.listStud;
  } // this method is used to get the value of studData

  getAllStud(): Observable<Tblstud[]> {
    return this.myhttp.get<Tblstud[]>(this.studUrl);
  } // this method is used to get the value of studData

  getStudById(id: number) {
    return this.myhttp.get<Tblstud>(`${this.studUrl}/${id}`);
  } // this method is used to get the value of studData

  postStud() {
    return this.myhttp.post(this.studUrl, this.studData);
  } // this method is used to create a new record in the database

  putStud(id: number, stud: Tblstud) {
    return this.myhttp.put(`${this.studUrl}/${id}`, stud);
  } // this method is used to update a record in the database

  deleteStud(id: number) {
    return this.myhttp.delete(`${this.studUrl}/${id}`);
  } // this method is used to delete a record from the database

  getStudLikeRno(str : string){
    return this.myhttp.get(`${this.rnoUrl}/${str}`);
  }

  maxSid(): number {
    this.getAllStud().subscribe(data => {
      this.setListStud(data);
      // console.log(this.listStud);
    });
    //code to count from data
    var max = 0;
    console.log(this.getListStud().length);
    for (var i = 0; i < this.listStud.length; i++) {
      if (this.listStud[i].sid > max) {
        max = this.listStud[i].sid;
      }
    }
    return max+1;
  }

  genRno(cid: number): string {
    var rno = '';
    const yr = this.dp.transform(new Date(), 'yy');
    this.setcourseDataById(cid);
    var cou = this.courseData.cname;

    rno = yr + cou; //////////////////////////////////////////
    var id;
    this.getStudLikeRno(rno).subscribe(data => {
      id = data;
    });
    rno = rno + id;
    return rno;
  }

  public setcourseData(course: Tblcourse) {
    this.courseData = course;
  } // this method is used to set the value of courseData

  public setcourseDataById(cid: number) {
    const s = this.listCourse.find(function (i) {
      return i.cid == cid;
    });
    if (s != null) {
      this.courseData = s;
    } else {
      this.courseData = new Tblcourse();
    }
  } // get course from cid

  public getcourseData() {
    return this.courseData;
  } // this method is used to get the value of courseData

  public setListCourse(course: Tblcourse[]) {
    this.listCourse = course;
  } // this method is used to set the value of Listcourse
  public getListCourse() {
    return this.listCourse;
  } // this method is used to get the value of Listcourse

  getCourse(): Observable<Tblcourse[]> {
    return this.myhttp.get<Tblcourse[]>(this.courseUrl);
  } // this method is used to get the value of courseData

  getCourseById(id: number) {
    return this.myhttp.get<Tblcourse>(`${this.courseUrl}/${id}`);
  } // this method is used to get the value of courseData
}
