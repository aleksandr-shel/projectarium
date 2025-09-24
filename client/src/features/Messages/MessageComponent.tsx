import * as React from 'react';
import { Message } from '../../app/models/Message';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const MessageDiv = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== "isUser"
})<{isUser: boolean}>`
    background-color: ${({isUser})=> (isUser ? '#EAEAEA':'#FAECE2')};
    border-radius: 20px;
    margin: 5px 0;
    padding: 5px 7px;
    white-space: pre-line;
    align-self: ${({isUser})=>(isUser ? 'flex-end':'flex-start')};
    max-width: 786px;
`;


interface Props{
    message:Message
}

export default observer(function MessageComponent({message}:Props) {
    function speak() {
        const text = message.text;
        const utterance = new SpeechSynthesisUtterance(text);
        
        // utterance.voice = window.speechSynthesis.getVoices()[2];
        utterance.lang = "en-US"; // you can set languages like "en-GB", "ru-RU", etc.
        utterance.rate = 1;       // speed (0.1–10, default 1)
        utterance.pitch = 1;      // pitch (0–2, default 1)
        utterance.volume = 1;     // volume (0–1)
        speechSynthesis.speak(utterance);
    }
    function stop() {
        speechSynthesis.cancel();
    }
    return ( 
        <MessageDiv isUser={message.isUser}>
            <div>
                {message.text}
            </div>
        </MessageDiv>
     );
})
