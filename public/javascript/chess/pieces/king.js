var King = function(config) {
    this.type = 'king';
    this.constructor(config);
};

King.prototype = new Piece({});

King.prototype.isValid = function (targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = parseInt(targetPosition.row);
    let targetPiece = this.board.getPieceAt(targetPosition);

    if (Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0)) <= 1 && Math.abs(targetRow - currentRow) <= 1) {
        if (targetPiece && targetPiece.color === this.color) {
            return false;
        }

        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece);
        }

        return true;
    }

    return false;
};

King.prototype.moveTo = function(newPosition) {
    if (this.isValid(newPosition)) {
        this.position = newPosition.col + newPosition.row;
        this.render();
        this.board.switchPlayer();
    } else {
        this.board.invalidMove();
    }
};
