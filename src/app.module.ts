import { Module } from '@nestjs/common';
import { PokerController } from './poker/poker.controller';
import { PokerService } from './poker/poker.service';

@Module({
  imports: [],
  controllers: [PokerController],
  providers: [PokerService],
})
export class AppModule {}
