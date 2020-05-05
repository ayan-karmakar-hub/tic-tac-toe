
(() => {
    let currentTurn = 1;
    let round = 1;
    let board = document.querySelector('#board');
    let turnDisplay = document.querySelector("#player-turn");
    
    // set up the initial 9x9 grid
    function _createBoard(){
        turnDisplay.innerText = `Player 1's turn`;
        for(let i = 0; i < 9; i++){
            let newSquare = document.createElement("div");
            newSquare.classList ="square";
            newSquare.id = `square${i}`;
            newSquare.innerText = "";
            newSquare.addEventListener('click',updateBoard);
            _addBorder(newSquare);
            board.appendChild(newSquare);
        } 
    }

    // added appropriate borders to mae the # shape
    function _addBorder(square){
        let cssText = "border: 3px solid black;";
        let squareID = +square.id.slice(square.id.length-1);
        switch(squareID){
            case 0:
                cssText += "border-left: none; border-top: none;";
                break;
            case 1:
                cssText += "border-top: none;";
                break;
            case 2:
                cssText += "border-right: none; border-top: none;";
                break;
            case 3:
                cssText += "border-left: none;";
                break;
            case 5:
                cssText += "border-right: none;";
                break;
            case 6:
                cssText += "border-left: none; border-bottom: none;";
            case 7: 
                cssText += "border-bottom: none;";
                break;
            case 8:
                cssText += "border-right: none; border-bottom: none;";
        }
        square.style.cssText = cssText;
    }

    
    // add respective token to cell selected by player
    // check for a win or tie
    function updateBoard(){
        if (this.innerText !== ""){
            return;
        }
        this.innerText = currentTurn === 1 ? "X" : "O";
        
        if(_checkForWin()){
            turnDisplay.innerText = `PLAYER ${currentTurn} WINS!!`;
            let squares = document.querySelectorAll(".square");
            squares.forEach((square) => square.removeEventListener('click',updateBoard));
        } else if(round == 9){
            turnDisplay.innerText = `IT'S A TIE!!`;
        } else {
            currentTurn = currentTurn === 1 ? 2 : 1;
            turnDisplay.innerText = `Player ${currentTurn}'s turn`;
            round++;
        }
    }

    // check all rows, columns, and diagonals
    // for 3-in-a-row
    function _checkForWin(){
        let currChar = currentTurn === 1 ? "X" : "O";
        let squares = Array.from(document.querySelectorAll(".square"));
        if(squares[4].innerText === currChar){
            if((squares[0].innerText === currChar &&  squares[8].innerText === currChar) ||
            (squares[1].innerText === currChar &&  squares[7].innerText === currChar) ||
            (squares[2].innerText === currChar &&  squares[6].innerText === currChar) ||
            (squares[3].innerText === currChar &&  squares[5].innerText === currChar)){
                return true;
            }
        } else if (squares[0].innerText === currChar){
            if((squares[1].innerText === currChar &&  squares[2].innerText === currChar) ||
            (squares[3].innerText === currChar &&  squares[6].innerText === currChar)){
                return true;
            }
        } else if(squares[8].innerText === currChar){
            if((squares[2].innerText === currChar &&  squares[5].innerText === currChar) ||
            (squares[6].innerText === currChar &&  squares[7].innerText === currChar)){
                return true;
            }
        }
        return false;
    }
    _createBoard();

})();

