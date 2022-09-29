import {
  Injectable,
  NestMiddleware,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/features/users/user.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const user = this.jwtService.verify(
        req.headers.authorization?.split(' ')[1],
      );
      const where = { id: user.Id };
      const userDetails = await this.userService.getUser(where);

      if (userDetails) {
        next();
      } else {
        res.status(403).send({
          status: 403,
          message: 'Access denied',
          data: [],
          meta: {},
          error: {},
        });
      }
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        if (error.message === 'jwt must be provided') {
          throw new UnauthorizedException({
            status: 401,
            data: '',
            message: error.message,
            error: error.message,
            meta: {},
            info: '',
          });
        }

        if (
          error.message == 'invalid signature' ||
          error.message == 'jwt malformed'
        ) {
          throw new ForbiddenException({
            status: 403,
            data: '',
            message: 'Invalid token',
            error: 'Invalid token',
            meta: {},
            info: '',
          });
        }

        if (error instanceof jwt.TokenExpiredError) {
          throw new ForbiddenException({
            status: 403,
            data: '',
            message: 'Token expired',
            error: 'Token expired',
            meta: {},
            info: '',
          });
        }
      }

      throw new HttpException(
        {
          status: 403,
          data: [],
          message: error.message,
          error: error.message,
          meta: {},
          info: '',
        },
        403,
      );
    }
  }
}
