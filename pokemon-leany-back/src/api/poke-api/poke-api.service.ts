import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokeApiService {
  constructor(private readonly http: HttpService) {}

  async getPokemon(name: string) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const res = await firstValueFrom(this.http.get(url));
    return res.data;
  }
}
