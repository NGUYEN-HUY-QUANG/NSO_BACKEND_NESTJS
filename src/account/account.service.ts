import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change_password.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async changePassword(dto: ChangePasswordDto) {
    const account = await this.accountRepository.findOne({ where: { username: dto.username } });

    if (!account) {
      throw new NotFoundException('Tai khoan khong ton tai');
    }

    if (account.password !== dto.oldPassword) {
      throw new BadRequestException('Mat khau cu khong chinh xac');
    }

    if (dto.oldPassword === dto.newPassword) {
      throw new BadRequestException('Mat khau moi phai khac mat khau cu');
    }

    account.password = dto.newPassword;
    await this.accountRepository.save(account);

    return { message: 'Mat khau da duoc thay doi thanh cong' };
  }
}
