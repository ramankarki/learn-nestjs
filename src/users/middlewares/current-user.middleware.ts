import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../users.entity';
import { UsersService } from '../users.service';

interface ExtendedRequest extends Request {
  session?: any;
  currentUser?: User;
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: ExtendedRequest, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findOne(+userId);
      req.currentUser = user;
    }

    next();
  }
}
