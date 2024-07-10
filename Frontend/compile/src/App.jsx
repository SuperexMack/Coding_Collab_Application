import './App.css';
import MainHead from './MainHead/MainHead';
import Room from './Room/Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
=======

>>>>>>> 5931ad3d99d23f49290ebbdeaa332e97e2903276

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
