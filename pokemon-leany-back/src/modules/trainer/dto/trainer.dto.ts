import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
