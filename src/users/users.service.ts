import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  find(options: unknown) {
    return this.repo.find({ where: options });
  }

  update(id: number, data: Partial<User>) {
    return this.repo.update({ id }, data);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
