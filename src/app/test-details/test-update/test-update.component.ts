import { Component, Input, OnInit } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup,  Validators,} from '@angular/forms';
import { Tbltest } from '../../shared/tbltest.model';
import { TbltestService } from '../../shared/tbltest.service';

@Component({
  selector: 'app-test-update',
  templateUrl: './test-update.component.html',
  styleUrls: ['./test-update.component.css']
})
export class TestUpdateComponent implements OnInit {

  @Input() Rno: number;
  disabler: boolean = true;
regForm: FormGroup;
  
  /**
   *
   */
  constructor(public testService: TbltestService,
    private frmbuilder: FormBuilder) {
  }
  ngOnInit(): void {
     this.regForm = this.frmbuilder.group({
      rno: {value:this.testService.testData.rno, disabled: true}, 
      name: [this.testService.testData.name, [Validators.required, Validators.minLength(3)]],
      gender: [this.testService.testData.gender, Validators.required],
      dob: [this.testService.testData.dob, Validators.required],
      branch: [this.testService.testData.branch, Validators.required],
      stadd: new FormControl(this.testService.testData.stadd),
    });
  }
  onSubmit() {
   
    const data: Tbltest = this.regForm.value as Tbltest;
    data.rno = this.Rno;

    console.log(data);

    this.testService.setter(data);

    this.testService.updateTest().subscribe();

  }
}
