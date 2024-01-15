import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateJobRequirmentsDTO{
    @IsString()
    Title: string;

    @IsString()
    Description: string;

    @IsNumber()
    JobId: number;

    @IsDate()
    SubmissionDate: Date;

    @IsDate()
    CloseDate: Date;

    @IsString()
    Status: string;
}