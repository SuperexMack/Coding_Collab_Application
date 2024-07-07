import { useEffect, useState } from 'react'
import axios from "axios"
import io from "socket.io-client"
import './App.css'

const socket = io("http://localhost:9000")

function App() {

  const [mycode,setCode] = useState("")
  const [output,setOutput] = useState("")

  useEffect(()=>{
    socket.on("AlreadyAssignedCode" , (a)=>{
      setCode(a)
    })

    return ()=>{
      socket.off("AlreadyAssignedCode")
    }
  },[])


  const Emitter = (e)=>{
    let a = e.target.value
    setCode(a)
    socket.emit("CodeUpdated" , a)
  }

  const caller = async()=>{
   
      try{
        let response = await axios.post("http://localhost:9000/getCode" , {
        code : mycode
      })
      
       setOutput(response.data.output || response.data.err)

    }
      
      catch(error){
        console.log("something went wrong")
      }
      
    
  }

  

  return (
    <>
      <h1 className='w-[600px] relative top-[20px] text-5xl left-[30%] font-bold'>Coding Collab Application</h1>
      <div className='relative top-[60px] w-full flex flex-row  justify-around items-center flex-wrap'>
        <textarea value={mycode} placeholder='Write your code here' onChange={Emitter} className='text-red-600 font-medium p-8 h-[500px] w-[800px] border-2 border-black'></textarea>
        <textarea readOnly value={output}  className='p-6 h-[500px] w-[400px] border-2 border-black'>{output}</textarea>
      </div>
      <button onClick={caller} className='btn p-6 bg-slate-800 flex justify-center items-center text-3xl text-white rounded-[20px] h-[50px] w-[300px] relative top-[90px] left-[20%]'>Compile</button>
     
    </>
  )
}

export default App
