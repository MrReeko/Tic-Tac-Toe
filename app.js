
// stores the current players turn, starts with p1
var player1Turn = true;
var gameOver = false;
var h2 = document.querySelector('h2');
var button = document.querySelector('button');

// Each Cell
var cells = document.querySelectorAll('td');

// Get Board State in Array
function getBoard() {
  var board = [];
  var r1 = [];
  var r2 = [];
  var r3 = [];
  cells.forEach((node, i) => {
    if (i < 3) {
      r1.push(node.textContent);
    } else if (i < 6) {
      r2.push(node.textContent);
    } else {
      r3.push(node.textContent);
    }
  });
  board.push(r1, r2, r3);
  return board;
}

// Check for a Winner
function checkWinner(board) {
  // Check Horizontals
  for (var i = 0; i < board.length; i++) {
    var row = board[i];
    if (row[0] === row[1] && row[1] === row[2] && row[0] !== '') {
      return true;
    }
  }
  // Check Verticals
  for (var i = 0; i < board.length; i++) {
    var column = [board[0][i], board[1][i], board[2][i]]
    if (column[0] === column[1] && column[1] === column[2] && column[0] !== '') {
      return true;
    }
  }

  // Check Diagonals
  var diagonal1 = [board[0][0], board[1][1], board[2][2]];
  var diagonal2 = [board[0][2], board[1][1], board[2][0]];

  if ((diagonal1[0] === diagonal1[1] && diagonal1[1] === diagonal1[2] && diagonal1[0] !== '') || (diagonal2[0] === diagonal2[1] && diagonal2[1] === diagonal2[2] && diagonal2[0] !== '')) {
    return true;
  }
  return false;
}


// Check for Draw
function draw(board) {
  return !board[0].includes('') && !board[1].includes('') && !board[2].includes('');
}




// Add event listeners to the cells on the board that will change which piece is played
cells.forEach((node) => {
  node.addEventListener('click', (event) => {
    // If the cell is not empty or the game is over, do not do the move
    if (node.textContent !== '' || gameOver) {
      return;
    }
    // if it's p1s turn play an X, otherwise p2 will play an O
    var piece = player1Turn ? 'X' : 'O';
    node.textContent = piece;

    // Check For a Winner
    var board = getBoard();
    var hasWon = checkWinner(board);
    // If a player has won, end the game
    if (hasWon) {
      gameOver = true;
      if (player1Turn) {
        h2.textContent = 'Player One has Won';
      } else {
        h2.textContent = 'Player Two has Won';
      }
    }

    // If there is a draw end the game
    var isDraw = draw(board);
    if (isDraw && !gameOver) {
      gameOver = true;
      h2.textContent = 'It\'s a Draw!';
    }

    // Change Player's Turn
    player1Turn = !player1Turn;

    // Change Text Displayed to new player's Turn
    document.querySelector('h2 span').textContent = player1Turn ? 'One' : 'Two';
  });
});

button.addEventListener('click', () => {
  cells.forEach((cell) => {
    cell.textContent = '';
    player1Turn = true;
    gameOver = false;
    h2.innerHTML = "Player <span>One</span>'s Turn";
  });
});






