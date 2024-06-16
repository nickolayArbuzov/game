export class Deck {
    private cards: number[];

    constructor() {
        this.cards = this.generateDeck();
        this.shuffleDeck();
    }

    private generateDeck(): number[] {
        const deck: number[] = [];
        for (let i = 0; i < 6; i++) {
            for (let j = 1; j <= 13; j++) {
                deck.push(j);
            }
        }
        return deck;
    }

    private shuffleDeck(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    public drawCard(): number | null {
        return this.cards.length > 0 ? this.cards.pop() || null : null;
    }
}