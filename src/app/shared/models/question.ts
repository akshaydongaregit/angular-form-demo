export class Question
{
    questionId:number;
    templateId:number;
	templateQuestionNo:number;
	question:string;

    optionA:string;
    optionB:string;
    optionC:string;
    optionD:string;
    optionE:string;

    aValue:number;
    bValue:number;
    cValue:number;
    dValue:number;
    eValue:number;
    
    highestMarks:number;
    timestamp:Date;
    
    questionImage:string;
    optionImageA:string;
	optionImageB:string;
	optionImageC:string;
	optionImageD:string;
	optionImageE:string;
}