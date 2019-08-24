export enum Bonus {
    None = -1,
    Contra = -2,
    Recontra = -3,
    Pagat = -4,
}

export interface Poker {
    value: number;
    bonus: Bonus;
    pagat: boolean;
}

export class Arvinca {
    id: number;
    moves: {arvinca: Poker, other: Poker} = {
        arvinca: {value: 0, bonus: Bonus.None, pagat: false},
        other: {value: 0, bonus: Bonus.None, pagat: false},
    };

    iPlayFirst: boolean;

    constructor(id, iPlayFirst) {
        this.id = id;
        this.iPlayFirst = iPlayFirst;
    }

    getMove(move) {
        if (this.isGameOver()) {
            return false;
        }

        if (move > 0) {
            if (this.moves.other.value) {
                return false;
            } else {
                this.moves.other.value = move;

                return true;
            }
        } else {
            if (move === Bonus.Contra) {
                if (!this.moves.other.value ||
                    this.moves.other.bonus !== Bonus.None) {
                    return false;
                } else {
                    this.moves.other.bonus = Bonus.Contra;

                    return true;
                }
            }

            if (move === Bonus.Recontra) {
                if (!this.moves.other.value ||
                    this.moves.other.bonus !== Bonus.None ||
                    this.moves.arvinca.bonus !== Bonus.Contra) {
                    return false;
                } else {
                    this.moves.other.bonus = Bonus.Recontra;

                    return true;
                }
            }

            if (move === Bonus.Pagat) {
                if (this.moves.other.pagat) {
                    return false;
                } else {
                    this.moves.other.pagat = true;

                    return true;
                }
            }
        }
    }

    makeNextMove() {
        if (this.isGameOver()) {
            return false;
        }

        // my first move
        if (!this.moves.arvinca.value && !this.moves.other.value) {
            this.moves.arvinca.value = Math.floor(Math.random() * 10) + 1;

            return true;
        }

        // my responding move
        if (!this.moves.arvinca.value && this.moves.other.value) {
            this.moves.arvinca.value = this.moves.other.value + 1;

            return true;
        }

        // my first bonus move
        if (!this.iLead() && this.moves.arvinca.bonus === Bonus.None
            && this.moves.other.bonus === Bonus.None) {
            this.moves.arvinca.bonus = Bonus.Contra;

            return true;
        }

        // my counter bonus move
        if (!this.iLead() && this.moves.arvinca.bonus === Bonus.None
            && this.moves.other.bonus === Bonus.Contra) {
            this.moves.arvinca.bonus = Bonus.Recontra;

            return true;
        }
    }

    isGameOver() {
        // if last move is pagat
        if (this.moves.arvinca.pagat || this.moves.other.pagat) {
            return true;
        }

        if (this.isMyTurn() && this.iLead() && this.moves.arvinca.bonus !== Bonus.None) {
            return true;
        }

        if (!this.isMyTurn() && this.iTrail() && this.moves.arvinca.bonus !== Bonus.None) {
            return true;
        }

        return false;
    }

    isMyTurn() {
        return this.iPlayFirst && !this.moves.arvinca.value
            || !this.iPlayFirst && this.moves.other.value
            || this.moves.arvinca.value && !this.moves.arvinca.bonus && this.moves.other.value;
    }

    iLead() {
        const arvinca = this.getValue('arvinca');
        const other = this.getValue('other');
        return arvinca > other;
    }

    iTrail() {
        return this.getValue('arvinca') < this.getValue('other');
    }

    getValue(type) {
        const myMultiplier =
            this.moves[type].bonus === Bonus.Contra ? 2 :
            this.moves[type].bonus === Bonus.Recontra ? 4 : 1;

        return this.moves[type].value * myMultiplier;
    }

    getStatus() {
        return this.moves;
    }
}
