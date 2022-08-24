import {v4} from 'uuid'
import {readDB, writeDB} from '../dbController.js'
const getUsers = () => readDB('users')
const messageRoute = [
    {
        method:'get',
        route:'/users',
        handler:(req,res)=>{
            const users = getUsers();
            res.send(users)
        }
    },
    {
        method:'get',
        route:'/users/:id',
        handler:({body,params:{id}},res)=>{
            try{
                const users = getUsers();
                const user = users[id]
                if(!user) throw Error("Not Founded")
                res.send(user)    
            }catch(e){
                res.status(404).send({error:e})
            }
        }
    }
]

export default messageRoute;