import './App.css';
import MainHead from './MainHead/MainHead';
import Room from './Room/Room';
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
