export class Player {
    public balance: number;
    public betHistory: { bet: number, guess: 'higher' | 'lower', guessed: boolean, result: number }[];

    constructor(public name: string, initialBalance: number) {
        this.balance = initialBalance;
        this.betHistory = [];
    }

    public placeBet(amount: number, guess: 'higher' | 'lower'): void {
        if (amount > this.balance) {
            throw new Error('Insufficient balance');
        }
        this.balance -= amount;
        this.betHistory.push({ bet: amount, guess, guessed: false, result: 0 });
    }

    public updateBetResult(guessed: boolean, result: number): void {
        const lastBet = this.betHistory[this.betHistory.length - 1];
        lastBet.guessed = guessed;
        lastBet.result = result;
        if (guessed) {
            this.balance += result;
        }
    }
}