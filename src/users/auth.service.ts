import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const [user] = await this.usersService.find({ email });
    if (user) throw new BadRequestException('email already exists');

    const hashedPw = await bcrypt.hash(password, 10);
    return await this.usersService.create(email, hashedPw);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find({ email });

    if (!user) throw new NotFoundException('User not found');

    if (!(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Wrong password');

    return user;
  }
}
