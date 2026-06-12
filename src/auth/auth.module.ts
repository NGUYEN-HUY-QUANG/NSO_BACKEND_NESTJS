import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Account } from 'src/account/entities/account.entity';
import { Player } from 'src/player/entities/player.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, Player])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
