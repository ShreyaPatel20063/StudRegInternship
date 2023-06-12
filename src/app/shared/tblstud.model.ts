import { Tblcourse } from "./tblcourse.model";
export class Tblstud {
    Sid : number;
    Name : string | undefined;
    Dob: Date;
    Gender: string;
    Cid: number;
    Rno: string;
    Div: number;
    Sem: number;
    Per12: number;
    Add: string;
    CidNavigation : Tblcourse;

}
