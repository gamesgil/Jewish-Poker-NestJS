import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GilController } from './gil/gil.controller';
import { PokerController } from './poker/poker.controller';

@Module({
  imports: [],
  controllers: [AppController, GilController, PokerController],
  providers: [AppService],
})
export class AppModule {}
