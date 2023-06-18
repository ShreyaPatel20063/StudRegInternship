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

@Component({
  selector: 'app-stud-update',
  templateUrl: './stud-update.component.html',
  styleUrls: ['./stud-update.component.css'],
})
export class StudUpdateComponent implements OnInit {
  @Input() studID: number;
  cidOptions: any;
  constructor(
    private fb: FormBuilder,
    public service: TblstudService,
    private route: Router
  ) {}
  ngOnInit(): void {

    this.service.getStudById(this.studID).subscribe((data) => {
      this.service.setStudData(data);
    });

    this.service.getCourseById(this.service.studData.cid).subscribe((data) => {
      this.service.setcourseData(data);
    });
  }

  


  

  public studForm = this.fb.group({
    sid: [this.service.studData.sid],
    name: [this.service.studData.name, [Validators.minLength(3), Validators.required]],
    dob: [this.service.studData.dob, [Validators.required]],
    gender: [this.service.studData.gender, [Validators.required]],
    per12: [this.service.studData.per12, [Validators.required, Validators.min(0), Validators.max(100)]],
    add: [this.service.studData.add, [Validators.required]],
    cid: [this.service.studData.cid, [Validators.required, Validators.min(1)]],
    div: [this.service.studData.div, [Validators.required]],
    sem: [this.service.studData.sem, [Validators.required]],
    rno: [this.service.studData.rno],
    cidNavigation: [null],
  });

  onSubmit() {
    var f = this.studForm.value as any;
    // this.genRno(f.cid);
    this.service.putStud(f.sid, f).subscribe((res) => {
      alert('Updated Successfully');
      this.route.navigate(['/details']);
    });
  }
}
