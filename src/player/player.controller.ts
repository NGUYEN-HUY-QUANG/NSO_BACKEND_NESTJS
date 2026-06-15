import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('create-character')
  createCharacter(@Body() dto: CreateCharacterDto) {
    return this.playerService.createCharacter(dto);
  }
}
