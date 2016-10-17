class View {
  constructor(game, $el) {
    this.game = game;
    this.el = $el;
    this.setupBoard();
  }

  bindEvents() {
    let that = this
    $('li').click(function(e) {
      e.preventDefault();
      that.makeMove($(this));
    });
  }

  unBindEvents() {
    $('li').off();
  }

  makeMove($square) {
    let pos = $square.data('pos');
    if (this.game.board.isEmptyPos(pos)) {
      let mark = this.game.currentPlayer.toUpperCase();
      this.game.playMove(pos);
      $square.html(mark).addClass('played').addClass(mark);
    } else {
      alert('Invalid Move!');
    }

    if (this.game.isOver()) {
      this.unBindEvents();
      $('.game-over').show();
      if (this.game.winner()) {
        $('.game-over').html(`Congrats ${this.game.winner()}, you win!`);
        this.game.board.winningPieces.forEach( pos => {
          $('li').each(function(){
            let piecePos = $(this).data('pos');
            if( piecePos[0] === pos[0] && piecePos[1] === pos[1]) {
              $(this).addClass('green');
            }
          });
        });
      } else {
        $('.game-over').html('Sorry, you both lost!!!');
      }

    }
  }

  setupBoard() {
    let ul = $('<ul>');
    for (let i = 0; i < this.game.board.grid.length; i++) {
      for (let j = 0; j < this.game.board.grid[i].length; j++) {
        let li = $('<li>').data("pos", [i,j]);
        ul.append(li);
      }
    }
    this.el.append(ul);
    this.bindEvents();
  }
}

module.exports = View;
