import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";




export class signupBodyDto {

    @IsString()
    @MinLength(3, { message: "min length 3" })
    @MaxLength(50, { message: 'you exceeded the maximum num of chars' })
    name: string

    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, { message: "min length 6" })
    @MaxLength(50, { message: 'you exceeded the maximum num of chars' })
    password: string

}