const View = require ('./ttt-view');
const Game = require('./game');// require appropriate file

$( () => {
  // Your code here
  let game = new Game();
  let view = new View(game, $('.ttt'));

});
