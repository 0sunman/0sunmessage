import { useEffect, useState } from "react"
import MsgItem from "./MsgItem"
import MsgInput from "./Msginput"




const MsgList = ()=>{
    const UserIds = ['roy','jay']
    const getRandomUserId = () => UserIds[Math.round(Math.random())]
    const [msgs,setMsgs] = useState([]);
    useEffect(()=>{
        setMsgs(Array(50).fill(0).map((_,i)=>({
            id:50-i,
            userId:getRandomUserId(),
            timestamp: 1234567890123 + (50-i) * 1000 * 60,
            text:`${(50-i)} mock text`
        
        })))
    },[])
    

    const onCreate = text =>{
        const newMsg = {
            i:msgs.length,
            userId:getRandomUserId(),
            timestamp:Date.now(),
            text:`${msg.length} ${text}`
        }
        msgs.unshift(new)
    }


    return (<>
    <MsgInput mutate={onCreate}/>
    <ul className="messages">
        {msgs.map(x => <MsgItem key={x.id} {...x}/>)}
    </ul></>)
}

export default MsgList;