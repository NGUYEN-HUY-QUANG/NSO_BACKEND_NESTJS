import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    account_id: number;
}