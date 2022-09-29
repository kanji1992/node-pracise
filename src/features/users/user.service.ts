import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; 

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /* User Create Function */
  async createUser(user) {
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email.toLowerCase(),
      password: await bcrypt.hash(user.password, 8),
    };
    return await this.usersRepository.save(newUser);
  }

  /* User Get Function */
  async getUser(where) {
    return await this.usersRepository.findOne({
      where: where,
    });
  }

  /* User Login Function */
  async loginUser(loginDetail, user) {
    if (await bcrypt.compare(loginDetail.password, user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = await this.jwtService.sign(payload);
      return {
        id: user.id,
        email: user.email,
        token: token,
      };
    } else {
      throw new UnauthorizedException('Credential mismatch');
    }
  }
}
