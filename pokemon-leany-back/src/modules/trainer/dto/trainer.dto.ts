import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class TrainerDto {
  @ApiProperty({
    description: 'ID do treinador',
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  id?: number;

  @ApiProperty({
    description: 'Username do treinador',
    example: 1,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Nome do treinador',
    example: 'Ash Ketchum',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiPropertyOptional({
    description: 'Cidade de origem do treinador',
    example: 'Pallet Town',
  })
  @IsOptional()
  @IsString()
  cidadeDeOrigem?: string;
}
