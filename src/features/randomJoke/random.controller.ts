import { Controller, Get, HttpStatus, HttpException } from '@nestjs/common';
import { RandomJokeService } from './randomJoke.service';

@Controller('random-joke')
export class RandomJokeController {
  constructor(private randomJokeService: RandomJokeService) {}

  /* Get random joke */
  @Get()
  async GetRandomJoke() {
    try {
      const joke = await this.randomJokeService.getJoke();
      return {
        status: HttpStatus.OK,
        message: 'Fetched random joke successfully',
        data: joke,
        error: {},
        meta: {},
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
}
