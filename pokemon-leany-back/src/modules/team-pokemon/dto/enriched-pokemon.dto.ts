import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class EnrichedPokemonDto {
  @ApiProperty({ description: 'Nome do Pokémon', example: 'pikachu' })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'URL do sprite (imagem) do Pokémon',
    example: 'https://raw.githubusercontent.com/...',
  })
  @IsString()
  sprite: string;

  @ApiProperty({
    description: 'URL do som (grito) do Pokémon',
    example: 'https://raw.githubusercontent.com/.../cry.ogg',
  })
  @IsString()
  cry: string;

  @ApiProperty({ description: 'Espécie do Pokémon', example: 'mouse-pokemon' })
  @IsString()
  species: string;

  @ApiProperty({ description: 'Altura do Pokémon em decímetros', example: 4 })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Peso do Pokémon em hectogramas', example: 60 })
  @IsNumber()
  weight: number;
}
