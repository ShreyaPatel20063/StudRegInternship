import { Component, Input, OnInit } from '@angular/core';
import { StudFormComponent } from '../stud-form/stud-form.component';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { TblstudService } from 'src/app/shared/tblstud.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-stud-update',
  providers: [TblstudService],
  templateUrl: './stud-update.component.html',
  styleUrls: ['./stud-update.component.css'],
})
export class StudUpdateComponent implements OnInit {
  @Input() studID: number;
  cidOptions: any;
  public studForm1: FormGroup;

  constructor(
    private fb: FormBuilder,
    public service: TblstudService,
    private route: Router
  ) {}
  ngOnInit(): void {
    this.service.getStudById(this.studID).subscribe((data) => {
      this.service.setStudData(data);
      console.log(data);

      this.service.getCourseById(data.cid).subscribe((data1) => {
        this.service.setcourseData(data1);
        console.log(data1);

        if (data && data1) {
          this.studForm1 = this.fb.group({
            sid: [data.sid],
            name: [
              this.service.studData.name,
              [Validators.minLength(3), Validators.required],
            ],
            dob: [
              moment(this.service.studData.dob).format('YYYY-MM-DD'),
              [Validators.required],
            ],
            gender: [this.service.studData.gender, [Validators.required]],
            per12: [
              this.service.studData.per12,
              [Validators.required, Validators.min(0), Validators.max(100)],
            ],
            add: [this.service.studData.add, [Validators.required]],
            cid: [
              this.service.studData.cid,
              [Validators.required, Validators.min(1)],
            ],
            div: [this.service.studData.div, [Validators.required]],
            sem: [this.service.studData.sem, [Validators.required]],
            rno: [this.service.studData.rno],
            cidNavigation: [null],
          });
        } else {
          this.studForm1 = this.fb.group({
            sid: [null],
            name: [null, [Validators.minLength(3), Validators.required]],
            dob: [null, [Validators.required]],
            gender: [null, [Validators.required]],
            per12: [
              null,
              [Validators.required, Validators.min(0), Validators.max(100)],
            ],
            add: [null, [Validators.required]],
            cid: [null, [Validators.required, Validators.min(1)]],
            div: [null, [Validators.required]],
            sem: [null, [Validators.required]],
            rno: [null],
            cidNavigation: [null],
          });
        }
      });
    });
  }

  onSubmit() {
    console.log(this.studForm1.value);
    var f = this.studForm1.value as any;
    // this.genRno(f.cid);
    this.service.putStud(f.sid, f).subscribe((res) => {
      alert('Updated Successfully');
      this.route.navigate(['/details']);
    });
  }
}
