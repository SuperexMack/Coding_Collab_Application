import { useEffect, useState } from "react"
import MainPage from "../MainPage/MainPage"
import axios from "axios"
import io from "socket.io-client"

let socket 

function Room(){

    const [code,setCode] = useState("")
    const [output,setOutput] = useState("")
    const [rooms , setRooms] = useState("")
    const [isRoom,setIsRoom] = useState(false)
    const [allRooms, setAllRooms] = useState([]);


    useEffect(()=>{
        socket = io("http://localhost:5000");

        socket.on("RoomsUpdated" , (allRooms)=>{
           setAllRooms(allRooms)
        })


        socket.on("CodeArrived",(myoldcode)=>{
            setCode(myoldcode)
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
        if(rooms){
            setIsRoom(true);
            socket.emit("AllocateRoom" , rooms)
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
            <h1 className="text-6xl text-violet-700 relative left-[33%] top-[200px] w-[450px]">Room Allocation</h1>
            <input onChange={(e)=>setRooms(e.target.value)} placeholder="Enter the Room Name" className="w-[500px] h-[50px] rounded-xl relative left-[30%] p-2 top-[230px]"></input>
            <button onClick={createRoom} className="text-white text-[30px] relative top-[230px] left-[36%] bg-slate-600 p-2 rounded-xl">Create Room</button>

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
        </>
    )
}

export default Room