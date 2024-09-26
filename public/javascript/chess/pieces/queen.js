var Queen = function(config){
    this.type = 'queen';
    this.constructor(config);
};
Queen.prototype = new Piece({});
Queen.prototype.isValidPosition = function (newPosition) {
    let board = this.board;
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    
    let targetCol = newPosition.col;
    let targetRow = parseInt(newPosition.row);
    let rowDiff = Math.abs(targetRow - currentRow);
    let colDiff = Math.abs(targetCol.charCodeAt(0) - currentCol.charCodeAt(0));
    // Check if it's a valid queen move (diagonal, vertical, or horizontal)
    if (rowDiff === colDiff || rowDiff === 0 || colDiff === 0) {
        let rowStep = targetRow > currentRow ? 1 : (targetRow < currentRow ? -1 : 0);
        let colStep = targetCol.charCodeAt(0) > currentCol.charCodeAt(0) ? 1 : (targetCol.charCodeAt(0) < currentCol.charCodeAt(0) ? -1 : 0);
        // Check each square along the path
        let row = currentRow + rowStep;
        let col = String.fromCharCode(currentCol.charCodeAt(0) + colStep);
        while (row !== targetRow || col !== targetCol) {
            let cell = {
                col: col,
                row: row
            }
            if (board.getPieceAt(cell)) {
                console.warn("Invalid move for queen");
                return false;
            }
            row += rowStep;
            col = String.fromCharCode(col.charCodeAt(0) + colStep);
        }
        
        // Check if there is a piece at the target position
        let targetPiece = board.getPieceAt(newPosition);
        if (targetPiece && targetPiece.color !== this.color) {
            targetPiece.kill(targetPiece); // Capture the piece
        }
        return true; // Valid move
    }

    console.warn("Invalid move for queen");
    return false;
}

Queen.prototype.moveTo = function(targetPosition){    
    if (this.isValidPosition(targetPosition)) {
        this.position = targetPosition.col + targetPosition.row;
        this.render();
        this.board.switchTurn();
    }
}