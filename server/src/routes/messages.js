import {v4} from 'uuid'
import {readDB, writeDB} from '../dbController.js'
const getMsgs = () => readDB('messages')
const setMsgs = data => writeDB('messages',data)
const messageRoute = [
    {
        method:'get',
        route:'/messages',
        handler:(req,res)=>{
            const msgs = getMsgs();
            res.send(msgs)
        }
    },
    {
        method:'get',
        route:'/messages/:id',
        handler:({body,params:{id}},res)=>{
            try{
                const msgs = getMsgs();
                const msg = msgs.find(m => m.id === id)
                if(!msg) throw Error("Not Founded")
                res.send(msg)    
            }catch(e){
                res.status(404).send({error:e})
            }
        }
    },
    {
        method:'post',
        route:'/messages',
        handler:({body},res)=>{
            const msgs = getMsgs();
            const newMsg = {
                id : v4(),
                text:body.text,
                userId:body.userId,
                timestamp:DataTransfer.now()
            }
            msgs.unshift(newMsg);
            setMsgs(msgs)
            res.send(newMsg)
        }
    },
    {
        method:'put',
        route:'/messages/:id',
        handler:({body,params:{id}},res)=>{
            try{
                const msgs = getMsgs();
                const targetIndex = msgs.findIndex(msg => msg.id === id)
                if(targetIndex < 0) throw "메시지가 없습니다."
                if(msgs[targetIndex].userId !== body.userId) throw "사용자가 다릅니다."
                const newMsg = {...msgs[targetIndex], text:body.text}
                msgs.splice(targetIndex,1,newMsg)
                setMsgs(msgs)
                res.send(newMsg);
            res.send() 
            }catch(e){
                res.status(500).send({error:e})
            }
        }
    },
    {
        method:'delete',
        route:'/messages/:id',
        handler:({body,params:{id}},res)=>{
            try{
                const msgs = getMsgs();
                const targetIndex = msgs.findIndex(msg => msg.id === id)
                if(targetIndex < 0) throw "메시지가 없습니다."
                if(msgs[targetIndex].userId !== body.userId) throw "사용자가 다릅니다."
                const newMsg = {...msgs[targetIndex], text:body.text}
                msgs.splice(targetIndex,1)
                setMsgs(msgs)
                res.send(id);
            res.send() 
            }catch(e){
                res.status(500).send({error:e})
            }
        }
    },
]

export default messageRoute;