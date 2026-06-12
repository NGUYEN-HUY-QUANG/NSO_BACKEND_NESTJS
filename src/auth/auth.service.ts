import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Account } from 'src/account/entities/account.entity';
import { Player } from 'src/player/entities/player.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async login(dto: LoginDto) {
    const { username, password } = dto;

    if (!username || !password) {
      throw new BadRequestException(
        'Vui long dien day du thong tin',
      );
    }

    const account = await this.accountRepository.findOne({
      where: { username },
    });

    if (!account) {
      throw new BadRequestException(
        'Thong tin dang nhap khong chinh xac',
      );
    }

    if (account.password !== password) {
      throw new BadRequestException(
        'Thong tin dang nhap khong chinh xac',
      );
    }

    const players = await this.playerRepository.find({
      where: {
        account_id: account.id,
      },
    });

    return {
      accountId: account.id,
      username: account.username,
      characters: players.map(player => player.id),
    };
  }

  async register(dto: RegisterDto) {
    const { username, password } = dto;

    if (!username || !password) {
      throw new BadRequestException(
        'Vui long dien day du thong tin',
      );
    }

    const existingAccount = await this.accountRepository.findOne({
      where: { username },
    });

    if (existingAccount) {
      throw new BadRequestException(
        'Tai khoan da ton tai',
      );
    }

    const newAccount = this.accountRepository.create({
      username,
      password,
    });

    await this.accountRepository.save(newAccount);

    return {
      message: 'Dang ky thanh cong',
    };
  }
}