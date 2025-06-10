import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { Trainer } from '../trainer/trainer.entity';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
  ) {}

  async signIn(signInDto: AuthDto): Promise<any> {
    const trainer = await this.findByUsername(signInDto.username);

    if (trainer?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: trainer.id, username: trainer.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findByUsername(username: string): Promise<AuthDto> {
    const response = await this.trainerRepository.findOneBy({ username });

    if (!response) {
      throw new NotFoundException('Trainer not found.');
    }

    return plainToInstance(AuthDto, response);
  }
}
