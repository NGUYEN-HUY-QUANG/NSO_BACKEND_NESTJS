import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AccountService } from './account.service';
import { ChangePasswordDto } from './dto/change_password.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Put('change-password')
  changePassword(@Body() dto: ChangePasswordDto) {
    return this.accountService.changePassword(dto);
  }
}
