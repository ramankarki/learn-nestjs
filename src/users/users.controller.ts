import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  Delete,
  Session,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptors';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorators';
import { User } from './users.entity';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get()
  findAllUsers(@Query() query) {
    // eslint-disable-next-line
    const { page, limit, sort, ...options } = query;
    return this.usersService.find(options);
  }

  @Patch(':id')
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Post('signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('signout')
  async signout(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AuthGuard)
  @Get('/user/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Get('/session/set/:data')
  setSession(@Param('data') data: string, @Session() session: any) {
    session.data = data;
    return session.data;
  }

  @Get('/session/get')
  getSession(@Session() session: any) {
    console.log('check haneko', session);
    return session.data;
  }
}
