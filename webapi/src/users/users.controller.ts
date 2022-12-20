import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDto, UserUpdateDto } from 'src/dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}
  @Get()
  getUsers() {
    return this.usersServices.getUsers();
  }
  @Get('/:id')
  getOneUser(@Param() params) {
    return this.usersServices.getOneUser(params.id);
  }
  @Post()
  addUser(@Body() body: UserDto) {
    return this.usersServices.addUser(body);
  }
  @Delete('/:id')
  deleteUser(@Param() params) {
    return this.usersServices.deleteUser(params.id);
  }
  @Patch('/:id')
  updateUser(@Param() params, @Body() body: UserUpdateDto) {
    return this.usersServices.updateUser(params.id, body);
  }
  @Post('search')
  search(@Query('key') key: string) {
    return this.usersServices.search(key);
  }
}
