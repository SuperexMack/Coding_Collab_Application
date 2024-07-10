import { useEffect, useState } from "react"
import MainPage from "../MainPage/MainPage"
import axios from "axios"
import io from "socket.io-client"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let socket 

function Room(){

    const [code,setCode] = useState("")
    const [output,setOutput] = useState("")
    const [rooms , setRooms] = useState("")
    const [isRoom,setIsRoom] = useState(false)
    const [allRooms, setAllRooms] = useState([]);
    const [mypassword ,  setMyPassword] = useState("")


    useEffect(()=>{
        socket = io("http://localhost:5000");

        socket.on("RoomsUpdated" , (allRooms)=>{
           setAllRooms(allRooms)
        })


        socket.on("CodeArrived",(myoldcode)=>{
            setCode(myoldcode)
        })

        socket.on("roomJoined",(status)=>{
            if(status === "success"){
               toast.success("Room joined successfully!");
                setIsRoom(true); 
            }
            else if(status ==="Wrong_Password"){
                toast.error("No such room exists! or password is wrong");
            }
        })


        return(()=>{
            socket.disconnect()
        })
   
    },[])

    const settingCode = (e)=>{

      let newCode = e.target.value
      setCode(newCode)
      socket.emit("CodeUpdated" , {roomName:rooms , code:newCode})
   }

     const createRoom = ()=>{
        if(rooms && mypassword){
            socket.emit("AllocateRoom" , {MyallRooms:rooms,mypassword:mypassword})
        }
        else{
            toast.error("Please enter both room name and password!");
        }
        
     }

      useEffect(()=>{
       axios.get("http://localhost:5000/getRooms")
      .then((response)=>{
        setAllRooms(response.data.AllRoomsAllocation)
      })
      .catch((error)=>{
        console.log("Some error while making rooms" + error)
      })
      },[])
      
   

   const CallerFunction = async ()=>{
    let response = await axios.post("http://localhost:5000/getCode" , {
      code : code
    })

    try{
    setOutput(response.data.output || response.data.allerr) 
    console.log("done")
    }

    catch(error){
        setOutput("something went wrong")
        console.log("something went wrong")
    }

   }


    return(
        <>
        <MainPage></MainPage>

        {!isRoom ? (

        <div>
            <h1 className="text-6xl text-violet-700 relative left-[33%] top-[200px] w-[450px]  mt-5">Room Allocation</h1>
            <div className="h-[200px] relative w-full top-[200px] flex flex-col justify-center items-center flex-wrap">

            <div className="flex flex-row justify-around w-[1000px] items-center h-[100px] flex-wrap">
            <input  onChange={(e)=>setRooms(e.target.value)} placeholder="Enter the Room Name" className="w-[500px] h-[50px] rounded-xl p-2"></input>
            <button onClick={createRoom} className="text-white text-[20px] w-[300px] h-[50px]  bg-slate-600 p-2 rounded-xl">Create Room</button>
            </div>
            
            <input onChange={(e)=>setMyPassword(e.target.value)}  placeholder="Enter the Password of the room" className="w-[500px] h-[50px] rounded-xl p-2"></input>
            </div>

            <div className="h-auto w-full flex flex-row flex-wrap relative top-[300px] justify-center items-center">
                {allRooms.map((giveMeRooms,index)=>(
                    <div className="text-4xl bg-purple-700 ml-[100px] p-6 mt-5 flex justify-center items-center w-auto rounded-xl h-[50px] text-white" key={index}>{giveMeRooms}</div>
                ))}
                </div>
           

        </div>


        ) : (

            <div>
          
           <div className="flex flex-row flex-wrap justify-between items-center h-[500px] w-full relative top-[200px]">
           
           <div>
            <textarea value={code} onChange={settingCode}  placeholder="Enter your code here" className="p-5 text-[20px] rounded-[10px] text-white overflow-auto bg-blue-950 h-[500px] w-[700px] relative left-10"></textarea>
           </div>
              
            <div>
                <textarea readOnly placeholder={output} className="h-[500px] w-[400px] text-white text-xl p-5 overflow-auto bg-blue-950 relative right-[100px] rounded-[10px]"></textarea>
            </div>
            

        </div>

        <button onClick={CallerFunction} className="relative top-[280px] text-white text-4xl left-[160px] bg-black p-5 rounded-xl w-[400px]">Compile</button>
        </div>
        )
  
    }
    <ToastContainer />
        </>
    )
}

export default Room