import { useEffect, useState } from "react";
import Chessboard from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";

// TODO: move together, not following DRY
export const INIT_GAME = "init__game";
export const MOVE = "move";
export const JOIN_GAME = "join__game";
export const GAME_OVER = "GAME_OVER";

function Game() {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [color,setColor] = useState("white");

  useEffect((()=>{
    setBoard(chess.board());
  }),[chess])

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);

      switch (message.type) {
        case INIT_GAME:
        //   setChess(new Chess());
          console.log(chess.board());
          console.log("Game initiated");
          setColor(message.payload.color)
          break;
        case MOVE:
          const move = message.payload;
          console.log("recieved move",move);
          chess.move(move);
          setBoard(chess.board());
          console.log("move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);

  if (!socket) return <div>Connecting...</div>;

  return (
    <div className="h-lvh w-full flex items-center justify-center">
      <div className="pt-8 pb-8 max-w-screen-lg w-full flex justify-around outline-white outline">
        <Chessboard chess={chess} board={board} setBoard ={setBoard} color={color} socket={socket} />
        <div className="  bg-green-200 flex items-start justify-center">
          <button
            className="mt-20 text-center py-1 px-10 rounded-sm bg-green-600 outline-green-600 text-white hover:text-green-600 hover:outline hover:bg-white font-semibold"
            onClick={() => {
              socket?.send(
                JSON.stringify({
                  type: INIT_GAME,
                })
              );
            }}
          >
            Play
          </button>
          <button onClick={()=>{
            console.log(chess);
            console.log("")
            console.log("")
            console.log("")
            console.log(chess.board());
          }}>CHess</button>
        </div>
      </div>
    </div>
  );
}

export default Game;
