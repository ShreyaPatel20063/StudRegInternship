import { Component, Input } from '@angular/core';
import { TblstudService } from '../../shared/tblstud.service';
import { Tblstud } from 'src/app/shared/tblstud.model';

@Component({
  selector: 'app-stud-display',
  templateUrl: './stud-display.component.html',
  styleUrls: ['./stud-display.component.css']
})
export class StudDisplayComponent {
//  @Input() Sid : number ;
 /**
  *
  */
 constructor(public service : TblstudService) { }

 s = this.service.getStudData();
 c = this.service.getcourseData();


}
