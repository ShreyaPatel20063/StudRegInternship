import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TblstudService } from 'src/app/shared/tblstud.service';

@Component({
  selector: 'app-stud-form',
  templateUrl: './stud-form.component.html',
  styleUrls: ['./stud-form.component.css'],
})
export class StudFormComponent implements OnInit {
  constructor(private fb: FormBuilder, public service: TblstudService) {}
  ngOnInit() {}
  maxSid = this.service.maxSid() as number;

  public studForm = this.fb.group({
    sid: [
      this.maxSid,
      [Validators.required, Validators.min(1), Validators.max(this.maxSid)],
    ],
    name: ['', [Validators.minLength(3), Validators.required]],
    dob: [Date, [Validators.required]],
    gender: ['M', [Validators.required]],
    cid: [, [Validators.required, Validators.min(1)]],
    rno: ['23CSE001'],
    div: [1, [Validators.required]],
    sem: [1, [Validators.required]],
    per12: [0.0, [Validators.required, Validators.min(0), Validators.max(100)]],
    add: ['', [Validators.required]],
    cidNavigation: [null],
  });

  onSubmit() {
    var f = this.studForm.value;
    if (f != null) {
      console.log(f);
      this.service.setStudData(f);
      this.service.postStud();
    }
  }
}
