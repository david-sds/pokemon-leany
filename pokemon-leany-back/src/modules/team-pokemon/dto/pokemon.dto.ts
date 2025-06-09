import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PokemonDto {
  @ApiProperty({
    description: 'Nome do Pokémon a ser adicionado ou removido do time',
    example: 'charizard',
  })
  @IsNotEmpty()
  @IsString()
  nomePokemon: string;
}
