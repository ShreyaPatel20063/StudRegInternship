import { Component, OnInit } from '@angular/core';
import { TblstudService } from '../shared/tblstud.service';
import { Tblstud } from '../shared/tblstud.model';


@Component({
  selector: 'app-stud-details',
  templateUrl: './stud-details.component.html',
  styleUrls: ['./stud-details.component.css']
})
export class StudDetailsComponent implements OnInit{
  Display: boolean = false;
  constructor(public service: TblstudService) {}
  ngOnInit() {
    this.service.getAllStud().subscribe(data =>
      {
        // console.log(data);
        this.service.listStud=data;
        // console.log(this.service.listStud);
      });
      this.service.getCourse().subscribe(data =>
        {
          // console.log(data);
          this.service.listCourse=data;
          // console.log(this.service.listCourse);
        }
        );
  }

  onDelete(stud: Tblstud) {

    this.service.setStudData(stud);
    this.service.deleteStud(stud.sid).subscribe(() => {
      
      this.service.listStud = this.service.listStud.filter(
        (t) => t.sid !== stud.sid
      );  // this is used to delete the data from the list
      
    });
    this.service.getAllStud().subscribe(data =>
      {
        this.service.listStud=data;
      });
  }
  onEdit(sid: number) {
  }
  onDisplay(stud: Tblstud) {
    this.service.setStudData(stud);
    this.service.setcourseDataById(stud.cid);
    this.Display=!this.Display;
  }
}
