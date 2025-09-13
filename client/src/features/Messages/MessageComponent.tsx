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
`


interface Props{
    message:Message
}

function MessageComponent({message}:Props) {
    return ( 
        <MessageDiv isUser={message.isUser}>
            <div>
                {message.text}
            </div>
        </MessageDiv>
     );
}

export default observer(MessageComponent)