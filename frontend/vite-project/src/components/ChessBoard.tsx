import { Color, Square, PieceSymbol } from "chess.js";
import { useState } from "react";
import { MOVE } from "../routes/Game";

function Chessboard({
  chess,
  board,
  setBoard,
  socket,
  color,
}: {
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket | null;
  color: String;
  chess:any,
  setBoard:any,

}) {
  const [from, setFrom] = useState<String | null>(null);
  const [to, setTo] = useState<String | null>(null);

  return (
    <div
      className={`outline outline-white ${
        color === "black" ? "rotate-180" : ""
      }`}
    >
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            {row.map((square, j) => {
              const cellId = String.fromCharCode(97 + j) + (8 - i);
              return (
                <div
                  key={j}
                  className={`w-20 h-20 relative outline-white border-white hover:border-2
                  ${
                    square?.color.toLowerCase() === color[0]
                      ? "cursor-pointer"
                      : square
                      ? "cursor-not-allowed"
                      : ""
                  }
                  ${
                    from === cellId
                      ? "border-4 shadow-inner scale-110"
                      : "border-0"
                  } 
                  ${color === "black" ? "rotate-180" : ""}  
                  ${
                    (i + j) % 2 === 0
                      ? "bg-[rgba(238,200,131,1)]"
                      : "bg-[rgba(123,24,4,1)"
                  }`}
                  onClick={() => {
                    if (
                      !from &&
                      square &&
                      square?.color.toLowerCase() === color[0]
                    ) {
                      setFrom(cellId);
                    } else {
                      setTo(cellId);
                      try{
                        chess.move({
                          from,
                          to:cellId,
                        });
                        socket?.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: {
                              from,
                              to:cellId,
                            },
                          })
                        )
                      }catch(error){
                        console.log(error);
                      }
                      
                      setBoard(chess.board());
                      setTo(null);
                      setFrom(null);
                    }
                  }}
                >
                  <span className=" absolute bottom-0 left-0 font-bold text-sm text-white">
                    {String.fromCharCode(97 + j) + (8 - i)}
                  </span>
                  {square && (
                    <img src={`/${square?.color}${square?.type}.png`} alt="" />
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Chessboard;
