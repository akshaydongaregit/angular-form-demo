import { Group } from './group';
import { Question } from './question';

export class Template
{
    templateId:number;
    name:string;
    category:string;
    education:string;
    organizationName:string[];
    country:string[];
    state:string[];
    city:string[];
    address:string[];
    language:string;
    gender:string;
    time:number;
    totalQuestions:number;
    totalGroup:number;
    instruction:string;
    timestamp:string;
    isCompleted:boolean;
    groups:Group[];
    questions:Question[];
}