import { Chess, Move, Square } from 'chess.js';

// Piece values for evaluation
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Position bonus tables for pieces
const PAWN_TABLE = [
  0, 0, 0, 0, 0, 0, 0, 0,
  50, 50, 50, 50, 50, 50, 50, 50,
  10, 10, 20, 30, 30, 20, 10, 10,
  5, 5, 10, 25, 25, 10, 5, 5,
  0, 0, 0, 20, 20, 0, 0, 0,
  5, -5, -10, 0, 0, -10, -5, 5,
  5, 10, 10, -20, -20, 10, 10, 5,
  0, 0, 0, 0, 0, 0, 0, 0,
];

const KNIGHT_TABLE = [
  -50, -40, -30, -30, -30, -30, -40, -50,
  -40, -20, 0, 0, 0, 0, -20, -40,
  -30, 0, 10, 15, 15, 10, 0, -30,
  -30, 5, 15, 20, 20, 15, 5, -30,
  -30, 0, 15, 20, 20, 15, 0, -30,
  -30, 5, 10, 15, 15, 10, 5, -30,
  -40, -20, 0, 5, 5, 0, -20, -40,
  -50, -40, -30, -30, -30, -30, -40, -50,
];

const BISHOP_TABLE = [
  -20, -10, -10, -10, -10, -10, -10, -20,
  -10, 0, 0, 0, 0, 0, 0, -10,
  -10, 0, 5, 10, 10, 5, 0, -10,
  -10, 5, 5, 10, 10, 5, 5, -10,
  -10, 0, 10, 10, 10, 10, 0, -10,
  -10, 10, 10, 10, 10, 10, 10, -10,
  -10, 5, 0, 0, 0, 0, 5, -10,
  -20, -10, -10, -10, -10, -10, -10, -20,
];

const KING_TABLE = [
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -30, -40, -40, -50, -50, -40, -40, -30,
  -20, -30, -30, -40, -40, -30, -30, -20,
  -10, -20, -20, -20, -20, -20, -20, -10,
  20, 20, 0, 0, 0, 0, 20, 20,
  20, 30, 10, 0, 0, 10, 30, 20,
];

function getPositionValue(piece: string, square: Square): number {
  const type = piece.toLowerCase();
  const isWhite = piece === piece.toUpperCase();
  
  const file = square.charCodeAt(0) - 97; // a-h to 0-7
  const rank = parseInt(square[1]) - 1; // 1-8 to 0-7
  
  // Flip the board for black pieces
  const index = isWhite ? (7 - rank) * 8 + file : rank * 8 + file;
  
  switch (type) {
    case 'p':
      return PAWN_TABLE[index];
    case 'n':
      return KNIGHT_TABLE[index];
    case 'b':
      return BISHOP_TABLE[index];
    case 'k':
      return KING_TABLE[index];
    default:
      return 0;
  }
}

function evaluateBoard(game: Chess): number {
  if (game.isCheckmate()) {
    return game.turn() === 'w' ? -100000 : 100000;
  }
  
  if (game.isDraw() || game.isStalemate() || game.isThreefoldRepetition()) {
    return 0;
  }
  
  let score = 0;
  const board = game.board();
  
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const square = `${String.fromCharCode(97 + j)}${8 - i}` as Square;
        const pieceValue = PIECE_VALUES[piece.type];
        const positionValue = getPositionValue(piece.type, square);
        
        if (piece.color === 'w') {
          score += pieceValue + positionValue;
        } else {
          score -= pieceValue + positionValue;
        }
      }
    }
  }
  
  return score;
}

function minimax(
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizing: boolean
): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluateBoard(game);
  }
  
  const moves = game.moves({ verbose: true });
  
  if (isMaximizing) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evaluation = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function getBestMove(game: Chess, difficulty: 'easy' | 'medium' | 'hard' = 'medium'): Move | null {
  const moves = game.moves({ verbose: true });
  
  if (moves.length === 0) return null;
  
  // Easy: Random move with slight preference for captures
  if (difficulty === 'easy') {
    const captures = moves.filter(m => m.captured);
    if (captures.length > 0 && Math.random() > 0.5) {
      return captures[Math.floor(Math.random() * captures.length)];
    }
    return moves[Math.floor(Math.random() * moves.length)];
  }
  
  // Medium and Hard: Use minimax
  const depth = difficulty === 'medium' ? 2 : 3;
  let bestMove = moves[0];
  let bestValue = -Infinity;
  
  for (const move of moves) {
    game.move(move);
    const value = minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();
    
    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }
  
  return bestMove;
}
