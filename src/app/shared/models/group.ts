import { Remark } from './remark';

export class Group
{
    groupId:number;
    name:string;
    templateId:number;
    /**
     * comma separated values of question numbers which belongs to perticular group.  
    */
    questionNo:string;
	timestamp:Date;
    remark:Remark;
}