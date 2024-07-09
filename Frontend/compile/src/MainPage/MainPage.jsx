import myImg from "./Compiler.webp"
import { useNavigate } from "react-router-dom"
function MainPage(){

    let navigate = useNavigate()
    const caller = ()=>{
       navigate("/")
    }
    return(
        <>
        <div className="fixed z-40 top-0 flex flex-row items-center bg-slate-600 h-[130px] w-full backdrop-blur-md bg-opacity-20 cursor-pointer">
        
        <img src={myImg} className="h-[100px] w-[100px] absolute left-6"></img>

        <div className="flex flex-row justify-center items-center absolute right-32 text-3xl gap-7">

            <div onClick={caller} className="bg-blue-600 p-2 rounded-[3px] text-white">Home</div>
            <div className="bg-blue-600 p-2 rounded-[3px] text-white">About</div>
            <div className="bg-blue-600 p-2 rounded-[3px] text-white">Contact</div>

        </div>
            
        </div>

        </>
    )
}
export default MainPage