import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Tblcourse } from 'src/app/shared/tblcourse.model';
import { TblstudService } from 'src/app/shared/tblstud.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Tblstud } from 'src/app/shared/tblstud.model';

@Component({
  selector: 'app-stud-form',
  templateUrl: './stud-form.component.html',
  styleUrls: ['./stud-form.component.css'],
})
export class StudFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public service: TblstudService,
    private route: Router,
    private dp: DatePipe
  ) {}
  ngOnInit() {
    this.service.getCourse().subscribe((data) => {
      this.cidOptions = data;
    });
    this.service.getAllStud().subscribe((data) => {
      this.service.listStud = data;
    });
    this.studForm = this.fb.group({
      sid: [1, [Validators.required, Validators.min(1), Validators.max(1)]],
      name: ['', [Validators.minLength(3), Validators.required]],
      dob: [Date, [Validators.required]],
      gender: ['M', [Validators.required]],
      cid: [, [Validators.required, Validators.min(1)]],
      div: [1, [Validators.required]],
      sem: [1, [Validators.required]],
      rno: ['23011001'],
      per12: [
        0.0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      add: ['', [Validators.required]],
      cidNavigation: [null],
    });
  }

  // @Output() reload: EventEmitter<void> = new EventEmitter<void>();
  cidOptions: Tblcourse[];
  isDisable: boolean = true;
  stud: string[];

  public studForm: FormGroup;

  onSubmit() {
    if (this.studForm.valid && this.studForm.dirty && this.studForm.touched) {
      var f = this.studForm.value as any;
      // this.genRno(f.cid);
      this.genRno(f.cid, f.div).subscribe((data) => {
        // console.log(data);
        this.studForm.value.rno = data;
        this.studForm.value.sid = 1;
        this.studForm.value.cidNavigation = null;
        // console.log(this.studForm.value.rno);
        alert('Your Roll Number is : ' + this.studForm.value.rno);
        f = this.studForm.value;
        if (f != null) {
          console.log(f);
          this.service.setStudData(f);
          this.service.postStud().subscribe();
          // this.reload=true;

          this.onrefresh();
          this.route.navigate([this.route.url]);
        }
      });
    } else {
      this.onrefresh();
      this.route.navigate([this.route.url]);
      alert('Please fill all the details');
    }
  }

  genRno(cid: number, div: number): Observable<string> {
    const yr = (new Date().getFullYear() % 100).toString();
    var cou = cid;
    var rno = '';
    if (cou < 10) {
      rno = yr + '0' + cou + div;
    } else {
      rno = yr + cou + div;
    }

    return new Observable<string>((observer) => {
      this.service.getStudLikeRno(rno.toString()).subscribe((data) => {
        // this.stud = data;
        console.log(data);

        var id: number;
        if (data == null || data.length == 0) {
          id = 1;
          rno = rno + '00' + id;
          observer.next(rno); // Emit the generated rno
          observer.complete(); // Complete the observable
        } else {
          var ndata = data.map((x) => {
            return parseInt(x, 10);
          });
          id = ndata.reduce((a, b) => Math.max(a, b)) + 1;

          rno = id.toString();
          observer.next(rno); // Emit the generated rno
          observer.complete(); // Complete the observable
        }
      });
    });
  }

  onrefresh() {
    this.studForm.reset();
    this.ngOnInit();
    // this.reload.emit();
    // this.ngOnInit();
  }
}

// genRno(cid: number, div: number): string {
//   var rno = '';
//   const yr = (new Date().getFullYear() % 100).toString();
//   // this.service.setcourseDataById(cid);
//   var cou = cid;
//   if (cou < 10) {
//     rno = yr + '0' + cou + div;
//   } else {
//     rno = yr + cou + div;
//   }

//   var id: number;
//   rno = this.service.getStudLikeRno(rno.toString()).subscribe((data) => {
//     console.log(data);
//     if (data == null) id = 1;
//     else {
//       id = (data + 1) as number;
//     }

//     if (id == null) {
//       id = 1;
//     }
//     if (id < 10) {
//       return rno = rno +'00'+ id;
//     } else if (id < 100) {
//       return rno = rno +'0'+ id;
//     }

//   });

//   return rno;
// }

// genRno(cid: number, div: number): Observable<string> {
//   const yr = (new Date().getFullYear() % 100).toString();
//   var cou = cid;
//   var rno = '';
//   if (cou < 10) {
//     rno = yr + '0' + cou + div;
//   } else {
//     rno = yr + cou + div;
//   }

//   return new Observable<string>((observer) => {
//     this.service.getStudLikeRno(rno.toString()).subscribe((data) => {
//       console.log(data);
//       var id: number;
//       if (data == null) {
//         id = 1;
//       } else {
//         id = (data + 1) as number;
//       }

//       if (id == null) {
//         id = 1;
//       }

//       if (id < 10) {
//         id = 100 + id;
//       } else if (id < 100) {
//         id = 10 + id;
//       }

//       rno = rno + id.toString(); // Convert id to a string before concatenating
//       console.log(rno); // Log rno here to verify the value

//       observer.next(rno); // Emit the generated rno
//       observer.complete(); // Complete the observable
//     });
//   });
// }
