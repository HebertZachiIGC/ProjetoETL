import { IsString, IsEmail, Matches } from "class-validator";

export class CreateUserDTO {
  
  @IsString()
  @IsEmail()
  @Matches(/@igcp\.com\.br$/, { message: 'O email deve ter o domínio @igcp.com.br' })
  email: string;

  @IsString()
  password: string;
}