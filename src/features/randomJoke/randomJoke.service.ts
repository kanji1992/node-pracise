import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RandomJokeService {
  /* Get random joke Api call */
  async getJoke() {
    return new Promise((resolve, reject) => {
      axios
        .get('https://api.chucknorris.io/jokes/random')
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
