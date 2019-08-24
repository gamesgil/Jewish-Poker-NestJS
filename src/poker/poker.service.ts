import { Injectable } from '@nestjs/common';
import { Arvinca } from './arvinca';

@Injectable()
export class PokerService {
    games: Arvinca[] = [];

    init(move) {
        const game = new Arvinca(this.games.length, !move);

        this.games.push(game);

        return game.id;
    }

    playerMove(id, move) {
        const game = this.getGame(id);
        const response = game.getMove(move);

        return game.getStatus();
    }

    gameMove(id, move) {
        const game = this.getGame(id);
        game.makeNextMove();

        return game.getStatus();
    }

    getGame(id) {
        const result = this.games.find(game => game.id === id);

        return result;
    }
}
