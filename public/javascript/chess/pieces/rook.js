var Rook = function(config) {
    this.type = 'rook';
    this.constructor(config);
};

Rook.prototype = new Piece({});

Rook.prototype.isValidPosition = function(newPosition) {
    let board = this.board;
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));

    let targetCol = newPosition.col;
    let targetRow = parseInt(newPosition.row);

    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));

    if (rowDiff === 0 || colDiff === 0) {
        let rowStep = targetRow > currentRow ? 1 : (targetRow < currentRow ? -1 : 0);
        let colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : (targetCol.charCodeAt(0) < currentCol.charCodeAt(0) ? -1 : 0);

        let row = currentRow + rowStep;
        let col = String.fromCharCode(currentCol.charCodeAt(0) + colStep);

        while (row !== targetRow || col !== targetCol) {
            let cell = {
                col: col,
                row: row
            };
            if (board.getPieceAt(cell)) {
                return false; 
            }

            row += rowStep;
            col = String.fromCharCode(col.charCodeAt(0) + colStep);
        }

        return true;
    }

    console.warn("Invalid move for rook");
    return false;
};

Rook.prototype.moveTo = function(targetPosition) {
    if (this.isValidPosition(targetPosition)) {
        let piece = this.board.getPieceAt(targetPosition);
        if (piece && piece.color !== this.color) {
            this.kill(piece);
        } else if (piece && piece.color === this.color) {
            console.warn("Cannot capture own piece");
            return;
        }

        this.position = targetPosition.col + targetPosition.row;
        this.render(); 
        this.board.switchTurn(); 
    } else {
        console.warn("Invalid move for rook");
    }
};
