import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum GioiTinh {
  NAM = 'nam',
  NU = 'nu',
}

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  account_id: number;

  @Column()
  x: number;

  @Column()
  y: number;

  @Column()
  mapId: string;

  @Column({nullable: true})
  aoId: string;

  @Column({nullable: true})
  quanId: string;

  @Column({nullable: true})
  thuCuoiId: string;

  @Column({ default: 0 })
  yen: number;

  @Column({ default: 0 })
  xu: number;

  @Column({ default: 0 })
  luong: number;

  @Column({ default: 1 })
  level: number;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: GioiTinh,
  })
  gioiTinh: GioiTinh;

  @Column()
  kieuToc: string;

  @Column({nullable: true})
  matNaId: string;
}