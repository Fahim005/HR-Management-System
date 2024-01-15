import { IsNumber, IsString } from "class-validator";

export class DocumentUploadDTO{
    @IsString()
    DocumentName: string;

    @IsNumber()
    userID: number;
}