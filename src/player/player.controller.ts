import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreateCharacterDto } from './dto/create-character.dto';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('create-character')
  createCharacter(@Body() dto: CreateCharacterDto) {
    return this.playerService.createCharacter(dto);
  }

  @Get(':id')
  getPlayer(@Param('id', ParseIntPipe) id: number) {
    return this.playerService.getPlayer(id);
  }
}
