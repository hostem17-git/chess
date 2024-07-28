import './App.css'

import { BrowserRouter,Route,Routes } from "react-router-dom";
import Landing from './routes/Landing';
import Game from './routes/Game';

function App() {

  return (
    <div className='h-full bg-black'>
   <BrowserRouter >
      <Routes>
        <Route path="/" element={<Landing/>} />


        <Route path="/game" element={<Game/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
