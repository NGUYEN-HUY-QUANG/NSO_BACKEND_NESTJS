import { GioiTinh } from '../entities/player.entity';

export class CreateCharacterDto {
    accountId: number;
    name: string;
    gioiTinh: GioiTinh;
    kieuToc: string;
}
