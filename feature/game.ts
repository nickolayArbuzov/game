import { Deck } from './deck';
import { Player } from './player';

interface BetResult {
    player: string;
    bet: number;
    guess: 'higher' | 'lower';
    result: number;
}

interface GameHistory {
    card: number;
    bets: BetResult[];
}

export class Game {
    private deck: Deck;
    private currentCard: number | null;
    private players: Player[];
    private gameHistory: GameHistory[];

    constructor() {
        this.deck = new Deck();
        this.currentCard = this.deck.drawCard();
        this.players = [];
        this.gameHistory = [];
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
    }

    public placeBet(playerName: string, amount: number, guess: 'higher' | 'lower'): void {
        const player = this.players.find(p => p.name === playerName);
        if (!player) {
            throw new Error('Player not found');
        }
        player.placeBet(amount, guess);
    }

    public startRound(): void {
        console.log(`Current card: ${this.currentCard}`);
        setTimeout(() => {
            const nextCard = this.deck.drawCard();
            if (nextCard === null) {
                console.log('Deck is empty. Ending game.');
                return;
            }

            console.log(`Next card: ${nextCard}`);
            this.processBets(nextCard);
            this.currentCard = nextCard;

            setTimeout(() => {
                this.startRound();
            }, 1000);
        }, 15000);
    }

    private processBets(nextCard: number): void {
        if (this.currentCard === null) {
            console.error('Current card is null, cannot process bets.');
            return;
        }

        const roundBets: BetResult[] = [];
        for (const player of this.players) {
            const lastBet = player.betHistory[player.betHistory.length - 1];
            if (!lastBet) continue;

            const guessed = (lastBet.guess === 'higher' && nextCard > this.currentCard) || (lastBet.guess === 'lower' && nextCard < this.currentCard);
            const result = guessed ? lastBet.bet * 1.7 : 0;
            player.updateBetResult(guessed, result);
            roundBets.push({ player: player.name, bet: lastBet.bet, guess: lastBet.guess, result });
        }
        this.gameHistory.push({ card: nextCard, bets: roundBets });
        console.log(`Round results: ${JSON.stringify(roundBets, null, 2)}`);
    }

    public getGameHistory(): void {
        console.log(JSON.stringify(this.gameHistory, null, 2));
    }
}