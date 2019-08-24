import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { PokerService } from './poker.service';

@Controller('poker')
export class PokerController {
    constructor(private readonly pokerService: PokerService) {}

    @Post()
    init(@Body() dto) {
        const id = this.pokerService.init(dto.move);

        return id;
    }

    @Get('move')
    playerMove(@Req() req: Request) {
        return this.pokerService.playerMove(+req.query.id, +req.query.move);
    }

    @Get('get')
    getPokerMove(@Req() req: Request) {
        return this.pokerService.gameMove(+req.query.id, +req.query.move);
    }
}
