import './App.css';
<<<<<<< HEAD
import MainHead from './MainHead/MainHead';
import Room from './Room/Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
const socket = io("http://localhost:9000");
>>>>>>> 48b86d6a67ea053a3221dc9c76f94fc34989f701

function App() {
  return(
    <>

     <BrowserRouter>
     <Routes>
      <Route path='/' element={<MainHead></MainHead>}></Route>
      <Route path='/room' element={<Room></Room>}></Route>
     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App;
