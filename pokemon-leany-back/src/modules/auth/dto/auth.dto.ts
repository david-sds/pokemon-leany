import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    description: 'ID do treinador',
    example: 1,
  })
  @Exclude()
  @IsOptional()
  @IsNumber()
  @Min(1)
  id?: number;

  @ApiProperty({
    description: 'Username do treinador',
    example: 1,
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password do treinador',
    example: 1,
  })
  @IsString()
  password: string;
}
