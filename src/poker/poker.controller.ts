import { Controller, Get, Req } from '@nestjs/common';
import { Arvinca } from './arvinca.service';
import { Request } from 'express';

@Controller('poker')
export class PokerController {
    games: Arvinca[] = [];

    @Get()
    init(@Req() req: Request) {
        this.games.push(new Arvinca(this.games.length, !req.params.move));

        return this.games[this.games.length - 1].id;
    }

    @Get('move')
    makeMove(@Req() req: Request) {
        const game = this.getGame(+req.query.id);
        const response = game.getMove(+req.query.move);

        return game.getStatus();
    }

    @Get('get')
    getMove(@Req() req: Request) {
        const game = this.getGame(+req.query.id);
        game.makeNextMove();

        return game.getStatus();
        
    }

    getGame(id) {
        const result = this.games.find(game => game.id === id);

        return result;
    }
}
