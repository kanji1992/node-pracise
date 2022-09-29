import {
  Controller,
  Post,
  Get,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { LoginDto, SignUpDto } from 'src/dto/user.dto';
import { UserService } from './user.service';
import { GetUser } from 'src/decorators/getUser.decorator';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  /* User Registration */
  @Post('signup')
  async signup(@Body() userData: SignUpDto) {
    try {
      const where = { email: userData.email.toLowerCase() };
      const user = await this.userService.getUser(where);
      if (user) {
        return {
          status: HttpStatus.CONFLICT,
          message: 'User Already registered',
          data: {},
          error: {},
          meta: {},
          info: '',
        };
      }
      const created = await this.userService.createUser(userData);
      return {
        status: HttpStatus.CREATED,
        message: 'User successfully registered',
        data: created,
        error: {},
        meta: '',
        info: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.message,
          data: {},
          meta: {},
          info: '',
        },
        error.status,
      );
    }
  }

  /* User login */
  @Post('login')
  async login(@Body() loginData: LoginDto) {
    try {
      const where = { email: loginData.email.toLowerCase() };
      const user = await this.userService.getUser(where);
      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'User not registered',
          data: {},
          error: {},
          meta: {},
          info: '',
        };
      }
      const loginDetails = await this.userService.loginUser(loginData, user);
      return {
        status: HttpStatus.CREATED,
        message: 'User login successfully',
        data: loginDetails,
        error: {},
        meta: '',
        info: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.message,
          data: {},
          meta: {},
          info: '',
        },
        error.status,
      );
    }
  }

  /* User can view profile */
  @Get('me')
  async viewProfile(@GetUser() loggedInUser: number) {
    try {
      const where = { id: loggedInUser };
      const user = await this.userService.getUser(where);
      return {
        status: HttpStatus.OK,
        message: 'Fetched user details successfully',
        data: user,
        error: {},
        meta: '',
        info: '',
      };
    } catch (error) {
      throw new HttpException(
        {
          status: error.status,
          message: error.message,
          data: {},
          meta: {},
          info: '',
        },
        error.status,
      );
    }
  }

  /* User logout */
  @Post('logout')
  async logout() {
    return {
      status: HttpStatus.OK,
      message: 'Successfully logout.',
      data: {},
      error: {},
      meta: '',
      info: '',
    };
  }
}
