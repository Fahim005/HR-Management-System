import { IsNumber, IsString } from "class-validator";

export class CreateNoticeDTO{
    @IsString()
    Title: string;

    @IsString()
    Description: string;

    @IsNumber()
    SendToUserId: number

    @IsNumber()
    SendFromUserId?: number
}