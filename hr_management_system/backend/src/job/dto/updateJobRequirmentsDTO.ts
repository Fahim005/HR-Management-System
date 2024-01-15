import { IsDate, IsNumber, IsString } from "class-validator";

export class UpdateJobRequirmentsDTO{
    @IsString()
    Title?: string;

    @IsString()
    Description?: string;

    @IsNumber()
    JobId?: number;

    @IsDate()
    SubmissionDate?: Date;

    @IsDate()
    CloseDate?: Date;

    @IsString()
    Status?: string;
}