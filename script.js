//Gameboard as an array inside of a Gameboard object
    //get board
    //handle selection of a square with its state
    //print board
//Players are also going to be stored in objects and select square
    //create two players
//Object to control the flow of the game itself.
    //declare the players
    //set active player
    //implemnt player switch
    //
    //checking of 3 in a row 
    //determine if three in a row is x or o and determine the winner from the players symbol

//Gameboard
const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i][j] = null;
        }
    }

    const getBoard = () => board;

    const setChoice = (row, column, token) => {
        if (board[row][column] === null) {
            board[row][column] = token;
            return true; //valid choices
        } 
        return false;
    };

    //prints board
    const printBoard = () => console.log(board);

    //resets board
    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                board[i][j] = null; // Reset each cell to null
            }
        }
    };

    //return the interface
    return { getBoard, setChoice, printBoard, resetBoard };
})();


//Player
function Player(name, token) {
    return {name, token}
}

//Game control
const gameControl= (function(){
    //Declare players
    const players= [
        Player("Player1", "X"),
        Player("Player2", "O")
    ];

    //Indiccate active game
    let gameActive= true;
    //Set active player, let as it changes
    let activePlayer= players[0];

    //Set switching
    const switchPlayer= () => {
    activePlayer= activePlayer === players[0] ? players[1] : players[0];
    }
    
    //Get active player
    const getActivePlayer= () => activePlayer;

    //Check winner
    function checkWinner(board) {
        //rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== null) {
                return board[i][0]; // Return the winning symbol 
            }
        }
        //columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== null) {
                return board[0][i];
            }
        }
        //diagnols
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== null) {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== null) {
            return board[0][2];
        }

        // No winner yet
        return null;
    }

    //check draw
    const checkDraw = (board) => {
        return board.flat().every(cell => cell !== null);
    };
    

    //Play round:
    const playRound= (row, column) => {
        //game active
        if (!gameActive) {
            console.log("The game is over. Please start a new game.");
            return;
        }
        
        //set player choice
        const validMove= Gameboard.setChoice(row, column, activePlayer.token);
        if (!validMove) {
            console.log("Invalid Move!!! Try Again ...");
            return;
        }
        //print updated board
        Gameboard.printBoard();

        //checks if winner on board
        const winner= checkWinner(Gameboard.getBoard());
        
        if (winner) {
            console.log(`${activePlayer.name} wins!`);
            Gameboard.printBoard();
            gameActive = false;
            return;
        } else if (checkDraw(Gameboard.getBoard())) {
            console.log("It's a draw!");
            Gameboard.printBoard();
            gameActive = false;
            return;
        }
        else {
            switchPlayer();
            console.log(`${activePlayer.name}'s turn`);
        };

    };

    //start game
    const startGame= () => {
        console.log("Game started! Player 1, GO!");
        gameActive= true;
        Gameboard.resetBoard();
        activePlayer= players[0];
    };

    return { playRound, getActivePlayer, startGame };

})();

gameControl.startGame();


gameControl.playRound(0, 0);  // Player 1 places X
gameControl.playRound(1, 1);  // Player 2 places O
gameControl.playRound(0, 1);  // Player 1 places X
gameControl.playRound(2, 2);  // Player 2 places O
gameControl.playRound(0, 2);  // Player 1 places X, Player 1 wins!
