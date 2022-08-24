import { useEffect, useState } from "react"
import MsgItem from "./MsgItem"
import MsgInput from "./Msginput"




const MsgList = ()=>{
    const UserIds = ['roy','jay']
    const getRandomUserId = () => UserIds[Math.round(Math.random())]
    const [msgs,setMsgs] = useState([]);
    const [editingId, setEdtingId] = useState(null);
    useEffect(()=>{
        setMsgs(Array(50).fill(0).map((_,i)=>({
            id:50-i,
            userId:getRandomUserId(),
            timestamp: 1234567890123 + (50-i) * 1000 * 60,
            text:`${(50-i)} mock text`
        
        })))
        console.log(JSON.stringify(msgs));
    },[])
    

    const onCreate = text =>{
        const newMsg = {
            id:msgs.length,
            userId:getRandomUserId(),
            timestamp:Date.now(),
            text:`${msgs.length + 1} ${text}`
        }
        setMsgs([newMsg, ...msgs])
    }

    const onUpdate = (text,id) =>{
        setMsgs(msgs => {
            const targetIndex = msgs.findIndex(msg => msg.id === id)
            if(targetIndex < 0) return msgs;
            const newMsgs = [...msgs];
            newMsgs.splice(targetIndex, 1, {
                ...msgs[targetIndex],
                text
            })    
            return newMsgs
        })
        doneEdit();
    }

    const onDelete = (id)=>{
        setMsgs(msgs.filter(msg => msg.id !== id))
    }

    const doneEdit = () => setEdtingId("")

    useEffect(()=>{
        console.log(msgs)
    },[msgs])


    return (<> 
    <MsgInput mutate={onCreate}/>
    <ul className="messages">
        {msgs.map(x => <MsgItem key={x.id} {...x} onUpdate={onUpdate} onDelete={() => onDelete(x.id)} startEdit={()=>setEdtingId(x.id)} isEditing={editingId === x.id}/>)}
    </ul></>)
}

export default MsgList;