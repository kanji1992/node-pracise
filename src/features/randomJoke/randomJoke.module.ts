import { Module } from '@nestjs/common';
import { RandomJokeController } from './random.controller';
import { RandomJokeService } from './randomJoke.service';

@Module({
  controllers: [RandomJokeController],
  providers: [RandomJokeService],
})
export class RandomJokeModule {}
