import MainPage from "../MainPage/MainPage"
import { useNavigate } from "react-router-dom"
function MainHead(){
    let navigate = useNavigate()

    const caller = ()=>{
       navigate("/room")
    }

    return(
        <>
        <MainPage></MainPage>
        <div className="h-[500px] w-full relative top-[150px] flex flex-col justify-center items-center">
          <h1 className="text-6xl text-violet-600">Welcome To The Colloboration Tool</h1>
          <h1 className="text-3xl text-slate-600 mt-5">Work Together And Create Something Great</h1>
          <button onClick={caller} className="bg-blue-600 text-3xl p-3 rounded-[3px] text-white w-[300px] mt-5">Let's Begin</button>
        </div>
        </>
    )
}

export default MainHead