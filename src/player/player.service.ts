import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayerService {

constructor(
  @InjectRepository(Player)
  private readonly playerRepository: Repository<Player>,
) {}

  async createCharacter(dto: CreateCharacterDto) {
    const { accountId, name, gioiTinh, kieuToc } = dto;

    if (!accountId || !name) {
      throw new BadRequestException('Thieu thong tin can thiet');
    }

    const counter = await this.playerRepository.count({ where: { account_id: accountId } });

    if (counter >= 3) {
      throw new BadRequestException('Da dat gioi han nhan vat');
    }

    try {
      const player = this.playerRepository.create({
        account_id: accountId,
        name,
        x: 300,
        y: 400,
        mapId: 'Tone',
        level: 1,
        gioiTinh,
        kieuToc,
      });

      const savedPlayer = await this.playerRepository.save(player);

      const createdPlayer = await this.playerRepository.findOne({ 
        where: { 
          id: savedPlayer.id },
        select: {
          id: true,
          name: true,
          level: true,
          gioiTinh: true,
          kieuToc: true,
          aoId: true,
          quanId: true,
        }
      });

      return {
        success: true,
        message: 'Tao nhan vat thanh cong',
        data: createdPlayer,
       };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Ten nhan vat da ton tai');
      }
      throw new InternalServerErrorException('Co loi xay ra khi tao nhan vat');
    }
  }
}
