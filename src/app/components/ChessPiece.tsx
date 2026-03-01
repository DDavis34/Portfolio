interface ChessPieceProps {
  type: string;
  color: 'w' | 'b';
  isDragging?: boolean;
}

const pieceSymbols: Record<string, string> = {
  'p': '♟\uFE0E', 'P': '♟\uFE0E',
  'n': '♞\uFE0E', 'N': '♞\uFE0E',
  'b': '♝\uFE0E', 'B': '♝\uFE0E',
  'r': '♜\uFE0E', 'R': '♜\uFE0E',
  'q': '♛\uFE0E', 'Q': '♛\uFE0E',
  'k': '♚\uFE0E', 'K': '♚\uFE0E'
};

export function ChessPiece({ type, color, isDragging }: ChessPieceProps) {
  const isWhite = color === 'w';
  const isBlack = color === 'b';
  
  return (
    <div
      className={`select-none pointer-events-none ${isDragging ? 'opacity-50' : 'opacity-100'}`}
      style={{
        fontSize: '44px',
        lineHeight: '1',
        color: isWhite ? '#ffffff' : '#000000',
        textShadow: isWhite 
          ? '1px 1px 3px rgba(0, 0, 0, 0.7)' 
          : isBlack 
            ? '1px 1px 3px rgba(255, 255, 255, 0.7)'
            : 'none',
      }}
    >
      {pieceSymbols[type.toLowerCase()]}
    </div>
  );
}
