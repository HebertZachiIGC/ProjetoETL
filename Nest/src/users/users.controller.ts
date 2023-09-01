import { Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './create-user.dto';
import { get } from 'http';


@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/signup')
  getAll() {
    return this.usersService.getAll();
  } 

  @Get('/signup')
  getbyAtributes(@Query('email') email: string) {
    return this.usersService.getByAtribute(email);
  }

  @Get('/signup/:id')
  getById(@Param('id') id: string){
    return this.usersService.getOne(parseInt(id));
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDTO) {
    this.usersService.create(body.email, body.password);
  }

  @Put('/signup/:id')
  update(@Param('id') id: string, @Body() body: CreateUserDTO){
    return this.usersService.getOne(parseInt(id));
  }

  @Delete('/signup/:id')
  delete(@Param('id') id: string){
    return this.usersService.getOne(parseInt(id));
  }

}
