import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;
  const email = 'hello@gmail.com';
  const password = 'helloworld';
  const wrongPassword = '123';

  beforeEach(async () => {
    // create a fake copy of the users service
    const users: User[] = [];
    fakeUsersService = {
      find: ({ email }: { email: string }) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: fakeUsersService },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('create a new user with hashed password.', async () => {
    const user = await service.signup(email, password);
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  it('throws error if duplicate email', (done) => {
    service
      .signup(email, password)
      .then(() => service.signup(email, password).catch(() => done()));
  });

  it('throws error if wrong email', (done) => {
    service.signin(email, password).catch(() => done());
  });

  it('throws error if wrong password', (done) => {
    service
      .signup(email, password)
      .then(() => service.signin(email, wrongPassword).catch(() => done()));
  });

  it('returns a user if correct password', async () => {
    await service.signup(email, password);
    const user = await service.signin(email, password);
    expect(user).toBeDefined();
  });
});
