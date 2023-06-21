import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TblstudService } from '../shared/tblstud.service';
import { Tblstud } from '../shared/tblstud.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-stud-details',
  templateUrl: './stud-details.component.html',
  styleUrls: ['./stud-details.component.css'],
})
export class StudDetailsComponent implements OnInit {
  Display: boolean = false;
  editEvent: boolean = false;
  sid: number;
  filterString: string = '';

  constructor(public service: TblstudService, private route: Router, private cdr: ChangeDetectorRef, private loading : NgxSpinnerService) {}
  ngOnInit() {
    this.loading.show();
    this.service.getAllStud().subscribe((data) => {
      // console.log(data);
      this.service.listStud = data;
      // console.log(this.service.listStud);
      this.service.getCourse().subscribe((data) => {
        // console.log(data);
        this.service.listCourse = data;
        // console.log(this.service.listCourse);
        this.loading.hide();
      });
    });
    
    
  }

  onDelete(stud: Tblstud) {
    this.service.setStudData(stud);
    this.service.deleteStud(stud.sid).subscribe(() => {
      this.service.listStud = this.service.listStud.filter(
        (t) => t.sid !== stud.sid
      ); // this is used to delete the data from the list
    });
    this.service.getAllStud().subscribe((data) => {
      this.service.listStud = data;
    });

    this.onrefresh();
  }
  onEdit(sid: number) {
    this.sid = sid;
    this.editEvent = !this.editEvent;
  }

  onDisplay(stud: Tblstud) {
    this.service.setStudData(stud);
    this.service.setcourseDataById(stud.cid);
    this.Display = !this.Display;
  }
  onrefresh() {
    //refresh the page
    this.service.getAllStud().subscribe((data) => {
      // console.log(data);
      this.service.listStud = data;
      // console.log(this.service.listStud);
    });
    this.route.navigate([this.route.url]);
    // this.cdr.detectChanges();
  }
}
