import { IsNumber, IsString } from "class-validator";

export class UpdateNoticeDTO{
    @IsString()
    Title?: string;

    @IsString()
    Description?: string;

    @IsNumber()
    SendFromUserId?: number;

    @IsNumber()
    SendToUserId?: number

    @IsString()
    Status: string
}