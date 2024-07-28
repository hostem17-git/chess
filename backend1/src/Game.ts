import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./message";
export class Game{

    public player1:WebSocket;
    public player2:WebSocket;
    public board: Chess;
    private startTime:Date;

    constructor (player1: WebSocket,player2: WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board= new Chess();
        this.startTime = new Date();

        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"white"
            }
            
        }));

        
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            payload:{
                color:"black"
            }
            
        }))
    }

    makeMove(socket:WebSocket,move:{
        from:string,
        to:string
    }){
// validate type of move using zod
        if(this.board.turn() === "w" && socket !=this.player1){
            console.log("wrong turn")
            return
        }

        if(this.board.turn() === "b" && socket !=this.player2){
            console.log("wrong turn")

            return
        }

        console.log(move);
        try{
            this.board.move(move);
        }catch(e){
            console.log(e)
            return;
        }

        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === "w" ? "black":"white"
                }
            }))
        }

        if(this.board.moves().length % 2 === 0){
            this.player2.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }else{
            this.player1.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }

    }
}
