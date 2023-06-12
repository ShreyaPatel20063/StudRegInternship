import { Component, Input, OnInit, Output } from '@angular/core';
import { TbltestService } from '../shared/tbltest.service';
// import { TestFormComponent } from './test-form/test-form.component';
import { TestUpdateComponent } from './test-update/test-update.component';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit{
  
 RnoOut : number =0;
// @Output() updateform : TestUpdateComponent;
  constructor( public testService : TbltestService) {}
  ngOnInit(){
    this.testService.readTest().subscribe(data=> {
      this.testService.listTest = data;
    }); // subscribe is used to get the data from the api and is used when we use observable
  }
  onEdit(rno : number) {
    console.log( "Edit: " +rno);
    this.testService.readTestRno(rno).subscribe(data=> {
     // add the data to the form
      this.testService.setter(data);
      this.RnoOut = rno;
      // this.disabler = true;
      // this.updateform.regForm.controls.rno = data.rno;
      // this.updateform.regForm.controls.name = data.name;
      // this.updateform.regForm.controls.gender = data.gender;
      // this.updateform.regForm.controls.dob = data.dob;
      // this.updateform.regForm.controls.branch = data.branch;
      // this.updateform.regForm.controls.stadd = data.stadd;

      console.log("ON Edit func complete ");
    } 
    );

  }
  onDelete(test : any) {
    this.testService.setter(test);
    this.testService.deleteTest().subscribe(() => {
      this.testService.listTest = this.testService.listTest.filter(
        (t) => t.rno !== test.rno
      );
    });
  }


}
