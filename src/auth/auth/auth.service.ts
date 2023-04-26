import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users/users.service';
import { User } from 'src/users/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(mail: string, password: string) {
    const user: User = await this.userService.findOneByMail(mail);
    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      throw new UnauthorizedException();
    }

    const payload = { user: user.name, id: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
