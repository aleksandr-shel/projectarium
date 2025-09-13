import {makeAutoObservable } from "mobx"
import { Message } from "../models/Message"
import {v4 as uuid} from 'uuid'

export default class AnalyzerStore{

    messages:Message[] = []
    constructor(){
        // makeObservable(this, {
        //     messages : observable,
        //     sendMessage: action.bound,
        // })
        makeAutoObservable(this)
    }

    sendMessage = (text:string)=>{
        const message:Message = {
            id: uuid(),
            text,
            date: new Date(),
            count: null,
            isUser: Math.random() <= 0.5 ? false : true,
        }

        this.messages.push(message)
    }

    removeMessage(message:Message){
        this.messages = this.messages.filter((x)=>{
            return x.id !== message.id
        })
    }
}