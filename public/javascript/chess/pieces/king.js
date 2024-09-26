var King = function(config){
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValidPosition = function(newPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let targetCol = newPosition.col;
    let targetRow = parseInt(newPosition.row);

    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    let rowDiff = Math.abs(targetRow - currentRow);

    // King can move one square in any direction
    if (colDiff <= 1 && rowDiff <= 1) {
        let targetPiece = this.board.getPieceAt(newPosition);
        if (!targetPiece || targetPiece.color !== this.color) {
            return true;
        }
    }

    console.warn("Invalid move for king");
    return false;
};

King.prototype.moveTo = function(newPosition) {
    if (this.isValidPosition(newPosition)) {
        let targetPiece = this.board.getPieceAt(newPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            this.kill(targetPiece);
        }
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchTurn();
    }
};
