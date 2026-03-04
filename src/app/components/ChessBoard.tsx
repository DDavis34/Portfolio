import { useState, useEffect, useRef } from 'react';
import { Chess, Square } from 'chess.js';
import { ChessPiece } from './ChessPiece';
import { RefreshCw } from 'lucide-react';

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'Speed' | 'Overthinker' | 'Stockfish';

const DIFFICULTY_SETTINGS: Record<Difficulty, { skill: number; depth: number; label: string }> = {
  beginner: { skill: 0, depth: 1, label: 'Beginner (~1000 Elo)' },
  easy: { skill: 5, depth: 5, label: 'Easy (~1500 Elo)' },
  medium: { skill: 10, depth: 10, label: 'Medium (~2000 Elo)' },
  hard: { skill: 20, depth: 15, label: 'Hard (~3000+ Elo)' },
  Speed: { skill: 20, depth: 1, label: 'Blitz' },
  Overthinker: { skill: 1, depth: 18, label: 'Overthinker' },
  Stockfish: { skill: 20, depth: 18, label: 'Stockfish' },
};

export function ChessBoard() {
  const [game, setGame] = useState(new Chess());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [validMoves, setValidMoves] = useState<Square[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('');
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [isThinking, setIsThinking] = useState(false);
  const [pendingPromotion, setPendingPromotion] = useState<{ from: Square; to: Square } | null>(null);
  
  const engineRef = useRef<Worker | null>(null);

  useEffect(() => {
    const workerCode = `
      importScripts('https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.0/stockfish.js');
      if (typeof STOCKFISH === 'function') {
        var engine = STOCKFISH();
        engine.onmessage = function(e) { postMessage(e); };
        onmessage = function(e) { engine.postMessage(e.data); };
      }
    `;
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));

    worker.onmessage = (event) => {
      const message = typeof event.data === 'string' ? event.data : event.data.data || '';
      
      if (message.startsWith('bestmove')) {
        const moveStr = message.split(' ')[1]; 
        
        if (moveStr && moveStr !== '(none)') {
          const from = moveStr.slice(0, 2) as Square;
          const to = moveStr.slice(2, 4) as Square;
          const promotion = moveStr.length > 4 ? moveStr[4] : undefined;

          setGame((prevGame) => {
            const newGame = new Chess(prevGame.fen());
            try {
              newGame.move({ from, to, promotion });
              setLastMove({ from, to });
            } catch (e) {
              console.error("Stockfish attempted invalid move", e);
            }
            setIsThinking(false);
            return newGame;
          });
        }
      }
    };

    engineRef.current = worker;
    worker.postMessage('uci'); 
    
    return () => worker.terminate();
  }, []);

  useEffect(() => {
    updateGameStatus();
  }, [game]);

  const updateGameStatus = () => {
    if (game.isCheckmate()) {
      setGameStatus(game.turn() === 'w' ? 'Black wins by checkmate!' : 'White wins by checkmate!');
    } else if (game.isDraw()) {
      setGameStatus('Draw!');
    } else if (game.isStalemate()) {
      setGameStatus('Stalemate!');
    } else if (game.isCheck()) {
      setGameStatus(game.turn() === 'w' ? 'White is in check!' : 'Black is in check!');
    } else {
      setGameStatus(game.turn() === 'w' ? 'White to move' : 'Black to move');
    }
  };

  useEffect(() => {
    if (game.turn() === 'b' && !game.isGameOver()) {
      setIsThinking(true);
      
      setTimeout(() => {
        if (engineRef.current) {
          const settings = DIFFICULTY_SETTINGS[difficulty];
          engineRef.current.postMessage(`setoption name Skill Level value ${settings.skill}`);
          engineRef.current.postMessage(`position fen ${game.fen()}`);
          engineRef.current.postMessage(`go depth ${settings.depth}`);
        }
      }, 200);
    }
  }, [game.fen(), difficulty]);

  const handlePromotion = (pieceType: 'q' | 'r' | 'b' | 'n') => {
    if (!pendingPromotion) return;

    try {
      const move = game.move({
        from: pendingPromotion.from,
        to: pendingPromotion.to,
        promotion: pieceType,
      });

      if (move) {
        const newGame = new Chess(game.fen());
        setGame(newGame);
        setLastMove({ from: pendingPromotion.from, to: pendingPromotion.to });
      }
    } catch (e) {}

    setPendingPromotion(null);
    setSelectedSquare(null);
    setValidMoves([]);
  };

  const handleSquareClick = (square: Square) => {
    if (game.turn() === 'b' || game.isGameOver() || isThinking || pendingPromotion) return;

    const piece = game.get(square);

    if (selectedSquare) {
      const pieceToMove = game.get(selectedSquare);
      const isPromotion = pieceToMove?.type === 'p' && (square[1] === '8' || square[1] === '1');

      if (isPromotion && validMoves.includes(square)) {
        setPendingPromotion({ from: selectedSquare, to: square });
        return;
      }

      try {
        const move = game.move({
          from: selectedSquare,
          to: square,
        });

        if (move) {
          const newGame = new Chess(game.fen());
          setGame(newGame);
          setLastMove({ from: selectedSquare, to: square });
        }
      } catch (e) {}
      
      setSelectedSquare(null);
      setValidMoves([]);
    } else {
      if (piece && piece.color === 'w') {
        setSelectedSquare(square);
        const moves = game.moves({ square, verbose: true });
        setValidMoves(moves.map(m => m.to));
      }
    }
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setIsThinking(false);
    setPendingPromotion(null);
  };

  const renderSquare = (row: number, col: number) => {
    const file = String.fromCharCode(97 + col);
    const rank = String(8 - row);
    const square = `${file}${rank}` as Square;
    const piece = game.get(square);
    const isLight = (row + col) % 2 === 0;
    const isSelected = selectedSquare === square;
    const isValidMove = validMoves.includes(square);
    const isLastMoveSquare = lastMove && (lastMove.from === square || lastMove.to === square);

    return (
      <button
        key={square}
        onClick={() => handleSquareClick(square)}
        className={`
          relative aspect-square flex items-center justify-center
          transition-colors duration-150
          ${isLight ? 'bg-[#3f3f46]' : 'bg-[#18181b]'} 
          ${isSelected ? 'brightness-150' : ''}
          ${isLastMoveSquare ? 'bg-purple-500/30' : ''}
          ${game.turn() === 'w' && !game.isGameOver() && !isThinking ? 'cursor-pointer hover:brightness-125' : 'cursor-default'}
        `}
      >
        {isValidMove && (
          <div className={`absolute ${piece ? 'inset-0 border-4 border-pink-500 rounded-full' : 'w-4 h-4 bg-pink-500 rounded-full opacity-60'}`} />
        )}

        {piece && <ChessPiece type={piece.type} color={piece.color} />}
      
        {col === 0 && (
          <div className="absolute left-1 top-1 text-[10px] sm:text-xs font-semibold" style={{ color: isLight ? '#18181b' : '#3f3f46' }}>
            {rank}
          </div>
        )}
        {row === 7 && (
          <div className="absolute right-1 bottom-1 text-[10px] sm:text-xs font-semibold" style={{ color: isLight ? '#18181b' : '#3f3f46' }}>
            {file}
          </div>
        )}
      </button>
    );
  };

  return (
    <div className="relative group w-full max-w-[480px] mx-auto mt-8 lg:mt-0 px-2 sm:px-0">
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300"></div>
      
      <div className="relative flex flex-col items-center gap-4 sm:gap-6 p-4 sm:p-8 bg-[#1f1f1f] rounded-3xl border border-gray-800">
        <div className="flex flex-wrap sm:flex-nowrap justify-between items-center w-full gap-3 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isThinking ? (
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            )}
            <p className="text-sm sm:text-lg font-semibold text-white truncate max-w-[140px] sm:max-w-none">{gameStatus}</p>
          </div>

          <div className="flex items-center min-w-0">
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
              disabled={game.history().length > 0}
              className="w-full px-2 py-1.5 border border-gray-700 rounded-lg bg-[#1a1a1a] text-white text-xs sm:text-sm focus:outline-none focus:border-pink-500 transition-colors disabled:opacity-50 cursor-pointer truncate"
            >
              {Object.entries(DIFFICULTY_SETTINGS).map(([key, setting]) => (
                <option key={key} value={key}>{setting.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="relative w-full aspect-square">
          <div className="grid grid-cols-8 gap-0 border-[3px] sm:border-4 border-[#111] rounded-sm overflow-hidden w-full h-full shadow-2xl">
            {Array.from({ length: 8 }, (_, row) =>
              Array.from({ length: 8 }, (_, col) => renderSquare(row, col))
            )}
          </div>

          {pendingPromotion && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
              <div className="bg-[#1a1a1a] p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-2xl text-center">
                <h3 className="text-white text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Promotion</h3>
                <div className="flex gap-2 sm:gap-4">
                  {(['q', 'r', 'b', 'n'] as const).map((piece) => (
                    <button
                      key={piece}
                      onClick={() => handlePromotion(piece)}
                      className="w-12 h-12 sm:w-16 sm:h-16 bg-[#2a2a2a] hover:bg-[#3a3a3a] rounded-xl flex items-center justify-center transition-all border border-gray-700 hover:border-pink-500 hover:scale-105"
                    >
                      <ChessPiece type={piece} color="w" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full">
          <button
            onClick={resetGame}
            className="flex items-center justify-center gap-2 w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
            Restart Match
          </button>
        </div>
      </div>
    </div>
  );
}