import { Tblstud} from './tblstud.model';
export class Tblcourse {
    cid: number;
    cname: string;
    cyears: number;
    tblstud: Tblstud[] = [];
}
