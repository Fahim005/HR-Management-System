import { IsString, IsEmail, Matches, IsOptional } from "class-validator";

export class CreateEmployeeDTO{
    //@Matches(/^[A-Z][a-zA-Z\s]*$/, {message: "first character must be capital & only alphabets & spaces are allowed"})
    @IsString()
    Name: string;

    @IsEmail()
    Email: string;

    @IsString()
    Gender: string;
    
    DOB: Date;

    //@Matches(/^(\+880|0)(1[3-9]\d{8})$/, {message: "invalid Bangladeshi number"})
    @IsString()
    PhoneNum: string;

    @IsString()
    Password: string;

    @IsString()
    JobCategory: string;

    OrgID: number;
}