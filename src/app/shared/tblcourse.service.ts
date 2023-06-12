import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tblcourse } from './tblcourse.model';

@Injectable({
  providedIn: 'root'
})
export class TblcourseService {

  constructor(private myhttp : HttpClient) { }
  courseUrl: string = "https://localhost:7095/api/Api/course"; // this is the url of the api

  listCourse: Tblcourse[] = []; // this is the array of objects of type Tblcourse
  courseData: Tblcourse = new Tblcourse(); // this is the object of type Tblcourse

  public setter(course: any) {
    this.courseData = course;
  } // this method is used to set the value of courseData
  public getter() {
    return this.courseData;
  } // this method is used to get the value of courseData

  getCourse() {
    return this.myhttp.get<Tblcourse[]>(this.courseUrl);
  } // this method is used to get the value of courseData

  getCourseById(id: number) {
    return this.myhttp.get<Tblcourse>(`${this.courseUrl}/${id}`);
  } // this method is used to get the value of courseData


}
