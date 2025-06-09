import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class TeamDto {
  @ApiPropertyOptional({
    description: 'ID do time (opcional, usado para atualizações)',
    minimum: 1,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  id?: number;

  @ApiProperty({ description: 'Nome do time', example: 'Time Pikachu' })
  @IsNotEmpty()
  @IsString()
  nomeDoTime: string;

  @ApiProperty({
    description: 'ID do treinador responsável pelo time',
    minimum: 1,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  treinadorId: number;
}
