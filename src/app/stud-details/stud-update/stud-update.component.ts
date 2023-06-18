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
import { Tblstud } from 'src/app/shared/tblstud.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-stud-update',
  providers: [TblstudService],
  templateUrl: './stud-update.component.html',
  styleUrls: ['./stud-update.component.css'],
})
export class StudUpdateComponent implements OnInit {
  @Input() studID: number;
  cidOptions: any;
  public studForm: FormGroup;

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
          this.studForm = this.fb.group({
            sid: [this.service.studData.sid],
            name: [
              { value: this.service.studData.name.toString() },
              [Validators.minLength(3), Validators.required],
            ],
            dob: [
              new Date(this.service.studData.dob).toISOString().split('T')[0],
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
          this.studForm = this.fb.group({
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
    var f = this.studForm.value as any;
    // this.genRno(f.cid);
    this.service.putStud(f.sid, f).subscribe((res) => {
      alert('Updated Successfully');
      this.route.navigate(['/details']);
    });
  }
}
