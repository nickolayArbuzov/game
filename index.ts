import { Game } from './feature/game';
import { Player } from './feature/player';

const game = new Game();

const player1 = new Player('Alice', 100);
const player2 = new Player('Bob', 100);

game.addPlayer(player1);
game.addPlayer(player2);

game.placeBet('Alice', 10, 'higher');
game.placeBet('Bob', 20, 'lower');

game.startRound();