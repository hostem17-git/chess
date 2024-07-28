import {NavLink } from "react-router-dom";

function Landing() {
  return (
    <div>
<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    <div className=" h-dvh flex items-center justify-center">
        <img src="/chess.jpg" alt="chessboard" className="max-w-96" />
    </div>
    <div className="  h-dvh flex flex-col items-center justify-around" >
        <h1 className="text-4xl font-bold text-white">
            Play chess online
        </h1>


        <div className="mt-4">
            <NavLink to="/game">

            <button className="bg-green-500 outline-green-500 text-white cursor-pointer hover:outline hover:bg-white hover:text-green-500  font-bold py-4 px-12 rounded shadow-2xl shadow-white ">
                Play now!
            </button>
            </NavLink>

        </div>
    </div>
</div>

    </div>
  )
}

export default Landing