import { Component, Input, OnInit } from '@angular/core';
import { TbltestService } from 'src/app/shared/tbltest.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Tbltest } from 'src/app/shared/tbltest.model';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css'],
})
export class TestFormComponent implements OnInit {
  // @Input() lastRno : number;

  public regForm = this.frmbuilder.group({
    rno: [1, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    gender: ['', Validators.required],
    dob: [new Date(), Validators.required],
    branch: ['', Validators.required],
    stadd: new FormControl(''),
  });
  

  constructor(
    public testService: TbltestService,
    private frmbuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    // this method is used to initialize the component
    }
  onSubmit() {
    if (this.regForm.value != null) {
      console.log(this.regForm.value);
      this.testService.setter(this.regForm.value);
      const data: Tbltest = this.regForm.value as Tbltest;
      this.testService.createTest().subscribe(() => {
        // this.testService.testData = data;
      });
    }

    // throw new Error('Function not implemented.');
  }
}
